type RecordingStateListener = (isRecording: boolean, duration: number) => void;

class RecordingManager {
  private stream: MediaStream | null = null;
  private mediaRecorder: MediaRecorder | null = null;
  private recordedChunks: Blob[] = [];
  private hasConsent: boolean = false;
  private isRecording: boolean = false;
  private durationSeconds: number = 0;
  private timer: number | null = null;
  private listeners: Set<RecordingStateListener> = new Set();

  public getConsent(): boolean {
    return this.hasConsent;
  }

  public isRecordingActive(): boolean {
    return this.isRecording;
  }

  public getStream(): MediaStream | null {
    return this.stream;
  }

  public getDuration(): number {
    return this.durationSeconds;
  }

  public subscribe(listener: RecordingStateListener): () => void {
    this.listeners.add(listener);
    listener(this.isRecording, this.durationSeconds);
    return () => {
      this.listeners.delete(listener);
    };
  }

  private notify() {
    this.listeners.forEach((fn) => fn(this.isRecording, this.durationSeconds));
  }

  /**
   * Request camera and microphone access with user-facing camera and start continuous recording.
   */
  public async grantConsentAndStart(): Promise<boolean> {
    if (typeof window === 'undefined' || !navigator.mediaDevices?.getUserMedia) {
      this.hasConsent = false;
      this.isRecording = false;
      return false;
    }

    try {
      // Prefer front-facing camera
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: 'user',
          width: { ideal: 720 },
          height: { ideal: 720 },
        },
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
        },
      });

      this.stream = stream;
      this.hasConsent = true;
      this.recordedChunks = [];
      this.durationSeconds = 0;

      // Select best supported MIME type
      let mimeType = 'video/webm;codecs=vp9,opus';
      if (!MediaRecorder.isTypeSupported(mimeType)) {
        mimeType = 'video/webm';
      }
      if (!MediaRecorder.isTypeSupported(mimeType)) {
        mimeType = 'video/mp4';
      }

      const recorder = new MediaRecorder(stream, {
        mimeType: MediaRecorder.isTypeSupported(mimeType) ? mimeType : undefined,
      });

      recorder.ondataavailable = (event) => {
        if (event.data && event.data.size > 0) {
          this.recordedChunks.push(event.data);
        }
      };

      recorder.onerror = (e) => {
        console.warn('MediaRecorder error:', e);
      };

      this.mediaRecorder = recorder;
      recorder.start(1000); // 1-second timeslices
      this.isRecording = true;

      if (this.timer) clearInterval(this.timer);
      this.timer = window.setInterval(() => {
        this.durationSeconds += 1;
        this.notify();
      }, 1000);

      this.notify();
      return true;
    } catch (err) {
      console.warn('Camera/Microphone permission denied or unavailable:', err);
      this.hasConsent = false;
      this.isRecording = false;
      this.releaseTracks();
      this.notify();
      return false;
    }
  }

  /**
   * User explicitly chose to continue without recording.
   */
  public continueWithoutRecording() {
    this.hasConsent = false;
    this.isRecording = false;
    this.releaseTracks();
    this.notify();
  }

  /**
   * Stops recording cleanly, finalizes media, and returns the recorded video/audio Blob.
   */
  public async stopAndFinalize(): Promise<Blob | null> {
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }

    if (!this.mediaRecorder || this.mediaRecorder.state === 'inactive') {
      this.releaseTracks();
      this.isRecording = false;
      this.notify();
      return null;
    }

    return new Promise((resolve) => {
      if (!this.mediaRecorder) {
        this.releaseTracks();
        this.isRecording = false;
        this.notify();
        resolve(null);
        return;
      }

      this.mediaRecorder.onstop = () => {
        const mimeType = this.mediaRecorder?.mimeType || 'video/webm';
        const finalBlob = new Blob(this.recordedChunks, { type: mimeType });
        this.releaseTracks();
        this.isRecording = false;
        this.notify();
        resolve(finalBlob.size > 0 ? finalBlob : null);
      };

      try {
        this.mediaRecorder.stop();
      } catch (err) {
        console.warn('Error stopping MediaRecorder:', err);
        this.releaseTracks();
        this.isRecording = false;
        this.notify();
        resolve(null);
      }
    });
  }

  /**
   * Release camera and microphone hardware tracks.
   */
  public releaseTracks() {
    if (this.stream) {
      try {
        this.stream.getTracks().forEach((track) => {
          track.stop();
        });
      } catch {
        // ignore
      }
      this.stream = null;
    }
    this.isRecording = false;
  }
}

export const recordingManager = new RecordingManager();
