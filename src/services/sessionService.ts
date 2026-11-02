import { db, doc, setDoc, getDocs, collection, deleteDoc, isFirebaseConfigured } from './firebase';

export interface ExperienceSession {
  sessionId: string;
  createdAt: string;
  updatedAt?: string;
  wishText?: string;
  wishSubmittedAt?: string;
  videoAssetId?: string;
  videoSecureUrl?: string;
  videoUploadedAt?: string;
  audioAssetId?: string;
  audioSecureUrl?: string;
  audioUploadedAt?: string;
  recordingStatus?: 'not_recorded' | 'recording' | 'uploading' | 'completed' | 'failed';
  wish?: { text: string; submittedAt?: string };
  videoReaction?: { assetId: string; secureUrl: string; submittedAt?: string };
  voiceNote?: { assetId: string; secureUrl: string; submittedAt?: string };
}

const LOCAL_STORAGE_KEY = 'tanisha_experience_sessions';
const CURRENT_SESSION_KEY = 'tanisha_current_session_id';

class SessionService {
  private currentSessionId: string;

  constructor() {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem(CURRENT_SESSION_KEY);
      if (stored) {
        this.currentSessionId = stored;
      } else {
        this.currentSessionId = 'sess_' + Date.now() + '_' + Math.random().toString(36).substring(2, 8);
        localStorage.setItem(CURRENT_SESSION_KEY, this.currentSessionId);
      }
    } else {
      this.currentSessionId = 'sess_default';
    }
  }

  public getSessionId(): string {
    return this.currentSessionId;
  }

  public resetSession() {
    if (typeof window !== 'undefined') {
      this.currentSessionId = 'sess_' + Date.now() + '_' + Math.random().toString(36).substring(2, 8);
      localStorage.setItem(CURRENT_SESSION_KEY, this.currentSessionId);
    }
  }

  public async setRecordingStatus(status: 'not_recorded' | 'recording' | 'uploading' | 'completed' | 'failed') {
    this.updateLocalSession((session) => {
      session.recordingStatus = status;
      session.updatedAt = new Date().toISOString();
    });

    if (isFirebaseConfigured) {
      try {
        const sessionRef = doc(db, 'experienceSessions', this.currentSessionId);
        await setDoc(sessionRef, {
          sessionId: this.currentSessionId,
          recordingStatus: status,
          updatedAt: new Date().toISOString(),
        }, { merge: true });
      } catch (err) {
        console.warn('Firestore update failed, saved to local:', err);
      }
    }
  }

  public async saveWish(wishText: string): Promise<void> {
    const timestamp = new Date().toISOString();

    // 1. Always save to local storage mirror
    this.updateLocalSession((session) => {
      session.wishText = wishText;
      session.wishSubmittedAt = timestamp;
      session.updatedAt = timestamp;
    });

    // 2. Save to Firestore if configured
    if (isFirebaseConfigured) {
      try {
        const sessionRef = doc(db, 'experienceSessions', this.currentSessionId);
        await setDoc(sessionRef, {
          sessionId: this.currentSessionId,
          wishText: wishText,
          wishSubmittedAt: timestamp,
          updatedAt: timestamp,
        }, { merge: true });
      } catch (err) {
        console.warn('Firestore wish save fallback to local:', err);
      }
    }
  }

  public async saveRecordingCompleted(assetId: string, secureUrl: string): Promise<void> {
    const timestamp = new Date().toISOString();

    this.updateLocalSession((session) => {
      session.videoAssetId = assetId;
      session.videoSecureUrl = secureUrl;
      session.videoUploadedAt = timestamp;
      session.recordingStatus = 'completed';
      session.updatedAt = timestamp;
    });

    if (isFirebaseConfigured) {
      try {
        const sessionRef = doc(db, 'experienceSessions', this.currentSessionId);
        await setDoc(sessionRef, {
          sessionId: this.currentSessionId,
          videoAssetId: assetId,
          videoSecureUrl: secureUrl,
          videoUploadedAt: timestamp,
          recordingStatus: 'completed',
          updatedAt: timestamp,
        }, { merge: true });
      } catch (err) {
        console.warn('Firestore recording metadata save fallback to local:', err);
      }
    }
  }

  public async saveVideoReaction(
    dataOrAssetId: string | { cloudinaryAssetId?: string; assetId?: string; secureUrl: string; duration?: number; submittedAt?: string },
    optionalSecureUrl?: string
  ): Promise<void> {
    const assetId = typeof dataOrAssetId === 'string' ? dataOrAssetId : (dataOrAssetId.cloudinaryAssetId || dataOrAssetId.assetId || '');
    const secureUrl = typeof dataOrAssetId === 'string' ? (optionalSecureUrl || '') : dataOrAssetId.secureUrl;
    return this.saveRecordingCompleted(assetId, secureUrl);
  }

  public async saveVoiceNote(
    dataOrAssetId: string | { cloudinaryAssetId?: string; assetId?: string; secureUrl: string; duration?: number; submittedAt?: string },
    optionalSecureUrl?: string
  ): Promise<void> {
    const assetId = typeof dataOrAssetId === 'string' ? dataOrAssetId : (dataOrAssetId.cloudinaryAssetId || dataOrAssetId.assetId || '');
    const secureUrl = typeof dataOrAssetId === 'string' ? (optionalSecureUrl || '') : dataOrAssetId.secureUrl;
    const timestamp = new Date().toISOString();
    this.updateLocalSession((session) => {
      session.audioAssetId = assetId;
      session.audioSecureUrl = secureUrl;
      session.audioUploadedAt = timestamp;
      session.updatedAt = timestamp;
    });

    if (isFirebaseConfigured) {
      try {
        const sessionRef = doc(db, 'experienceSessions', this.currentSessionId);
        await setDoc(sessionRef, {
          sessionId: this.currentSessionId,
          audioAssetId: assetId,
          audioSecureUrl: secureUrl,
          audioUploadedAt: timestamp,
          updatedAt: timestamp,
        }, { merge: true });
      } catch (err) {
        console.warn('Firestore audio save fallback to local:', err);
      }
    }
  }

  public async getAllSessions(): Promise<ExperienceSession[]> {
    const localList = this.getLocalSessions();

    if (isFirebaseConfigured) {
      try {
        const snapshot = await getDocs(collection(db, 'experienceSessions'));
        const remoteList: ExperienceSession[] = [];
        snapshot.forEach((d) => {
          remoteList.push(d.data() as ExperienceSession);
        });
        if (remoteList.length > 0) {
          return remoteList.sort((a, b) => (b.createdAt || '').localeCompare(a.createdAt || ''));
        }
      } catch (err) {
        console.warn('Firestore fetch failed, returning local storage sessions:', err);
      }
    }

    return Object.values(localList).sort((a, b) => (b.createdAt || '').localeCompare(a.createdAt || ''));
  }

  public async deleteSession(sessionId: string): Promise<void> {
    const local = this.getLocalSessions();
    delete local[sessionId];
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(local));

    if (isFirebaseConfigured) {
      try {
        await deleteDoc(doc(db, 'experienceSessions', sessionId));
      } catch (err) {
        console.warn('Firestore delete failed:', err);
      }
    }
  }

  private getLocalSessions(): Record<string, ExperienceSession> {
    if (typeof window === 'undefined') return {};
    try {
      const data = localStorage.getItem(LOCAL_STORAGE_KEY);
      return data ? JSON.parse(data) : {};
    } catch {
      return {};
    }
  }

  private updateLocalSession(mutator: (session: ExperienceSession) => void) {
    if (typeof window === 'undefined') return;
    try {
      const sessions = this.getLocalSessions();
      if (!sessions[this.currentSessionId]) {
        sessions[this.currentSessionId] = {
          sessionId: this.currentSessionId,
          createdAt: new Date().toISOString(),
          recordingStatus: 'not_recorded',
        };
      }
      mutator(sessions[this.currentSessionId]);
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(sessions));
    } catch (err) {
      console.error('Error updating local session storage:', err);
    }
  }
}

export const sessionService = new SessionService();
