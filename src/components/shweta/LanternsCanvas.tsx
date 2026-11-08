import React, { useEffect, useRef } from 'react';

interface Lantern {
  x: number;
  y: number;
  targetY?: number;
  width: number;
  height: number;
  vy: number;
  swaySpeed: number;
  swayAmount: number;
  swayPhase: number;
  alpha: number;
  glowRadius: number;
  isSpecial?: boolean;
  stopped?: boolean;
}

interface LanternsCanvasProps {
  mode: 'special_arrival' | 'thousand_lights';
  onSpecialLanternArrived?: () => void;
  onCenterLanternTap?: () => void;
  isBursting?: boolean;
}

export const LanternsCanvas: React.FC<LanternsCanvasProps> = ({
  mode,
  onSpecialLanternArrived,
  onCenterLanternTap,
  isBursting = false,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const specialLanternRef = useRef<Lantern | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    const lanterns: Lantern[] = [];
    let specialLantern: Lantern | null = null;
    let arrivedReported = false;

    // Helper to spawn a background lantern
    const spawnLantern = (startY?: number, customScale?: number): Lantern => {
      const scale = customScale !== undefined ? customScale : Math.random() * 0.7 + 0.35;
      const baseW = 28 * scale;
      const baseH = 38 * scale;
      return {
        x: Math.random() * (width - 40) + 20,
        y: startY !== undefined ? startY : height + 20 + Math.random() * 60,
        width: baseW,
        height: baseH,
        vy: -(Math.random() * 0.8 + 0.7) * (0.6 + scale * 0.4),
        swaySpeed: Math.random() * 0.02 + 0.015,
        swayAmount: Math.random() * 20 + 10,
        swayPhase: Math.random() * Math.PI * 2,
        alpha: Math.random() * 0.3 + 0.7,
        glowRadius: baseW * 2.2,
      };
    };

    // Pre-populate or start gradual spawn
    if (mode === 'thousand_lights') {
      // Spawn her primary wish lantern at bottom center
      specialLantern = {
        x: width / 2,
        y: height + 30,
        width: 44,
        height: 60,
        vy: -1.3,
        swaySpeed: 0.02,
        swayAmount: 14,
        swayPhase: 0,
        alpha: 1,
        glowRadius: 100,
        isSpecial: true,
      };
      specialLanternRef.current = specialLantern;

      // Create initial cluster and continuously add more
      for (let i = 0; i < 25; i++) {
        lanterns.push(spawnLantern(height * 0.2 + Math.random() * (height * 0.9)));
      }
    } else {
      // mode === 'special_arrival'
      // Initial gentle wave
      for (let i = 0; i < 15; i++) {
        lanterns.push(spawnLantern(height * 0.6 + Math.random() * (height * 0.5)));
      }

      // Schedule the special central lantern after ~2.8s
      setTimeout(() => {
        specialLantern = {
          x: width / 2,
          y: height + 50,
          targetY: height * 0.48, // Stops comfortably in center
          width: 58,
          height: 78,
          vy: -2.0,
          swaySpeed: 0.025,
          swayAmount: 12,
          swayPhase: 0,
          alpha: 1,
          glowRadius: 130,
          isSpecial: true,
          stopped: false,
        };
        specialLanternRef.current = specialLantern;
      }, 2500);
    }

    // Interval to keep spawning background lanterns
    const spawnTimer = setInterval(() => {
      const maxCount = mode === 'thousand_lights' ? 90 : 45;
      if (lanterns.length < maxCount) {
        lanterns.push(spawnLantern());
      }
    }, mode === 'thousand_lights' ? 180 : 350);

    const drawLantern = (l: Lantern, currentSwayX: number) => {
      const lx = l.x + currentSwayX;
      const ly = l.y;
      const w = l.width;
      const h = l.height;

      // 1. Ambient Warm Glow
      const glowGrad = ctx.createRadialGradient(lx, ly + h * 0.6, 0, lx, ly + h * 0.6, l.glowRadius);
      if (l.isSpecial) {
        glowGrad.addColorStop(0, 'rgba(254, 240, 138, 0.6)');
        glowGrad.addColorStop(0.35, 'rgba(245, 158, 11, 0.4)');
        glowGrad.addColorStop(0.7, 'rgba(217, 119, 6, 0.15)');
        glowGrad.addColorStop(1, 'rgba(217, 119, 6, 0)');
      } else {
        glowGrad.addColorStop(0, 'rgba(251, 191, 36, 0.4)');
        glowGrad.addColorStop(0.4, 'rgba(245, 158, 11, 0.2)');
        glowGrad.addColorStop(1, 'rgba(245, 158, 11, 0)');
      }
      ctx.fillStyle = glowGrad;
      ctx.beginPath();
      ctx.arc(lx, ly + h * 0.6, l.glowRadius, 0, Math.PI * 2);
      ctx.fill();

      // 2. Paper Lantern Trapezoid/Curved Silhouette
      ctx.save();
      ctx.beginPath();
      // top rim
      const topW = w * 0.72;
      const botW = w * 0.88;
      const midW = w;

      ctx.moveTo(lx - topW / 2, ly);
      ctx.quadraticCurveTo(lx - midW / 2, ly + h * 0.45, lx - botW / 2, ly + h);
      ctx.lineTo(lx + botW / 2, ly + h);
      ctx.quadraticCurveTo(lx + midW / 2, ly + h * 0.45, lx + topW / 2, ly);
      ctx.closePath();

      // Body Gradient
      const bodyGrad = ctx.createLinearGradient(lx, ly, lx, ly + h);
      if (l.isSpecial) {
        bodyGrad.addColorStop(0, 'rgba(254, 249, 195, 0.95)');
        bodyGrad.addColorStop(0.35, 'rgba(253, 224, 71, 0.92)');
        bodyGrad.addColorStop(0.75, 'rgba(245, 158, 11, 0.95)');
        bodyGrad.addColorStop(1, 'rgba(180, 83, 9, 0.98)');
      } else {
        bodyGrad.addColorStop(0, 'rgba(254, 240, 138, 0.88)');
        bodyGrad.addColorStop(0.4, 'rgba(245, 158, 11, 0.85)');
        bodyGrad.addColorStop(1, 'rgba(180, 83, 9, 0.9)');
      }
      ctx.fillStyle = bodyGrad;
      ctx.fill();

      // Delicate wooden / bamboo frame rib lines
      ctx.strokeStyle = 'rgba(120, 53, 15, 0.4)';
      ctx.lineWidth = 1;
      ctx.stroke();

      // Center vertical fold spine
      ctx.beginPath();
      ctx.moveTo(lx, ly + 2);
      ctx.lineTo(lx, ly + h - 2);
      ctx.strokeStyle = 'rgba(254, 240, 138, 0.35)';
      ctx.stroke();

      // 3. Inner Flickering Candle Flame at base
      const flameTime = performance.now() * 0.005;
      const flickerScale = 0.85 + Math.sin(flameTime * 4 + l.swayPhase) * 0.15;
      const flameH = (h * 0.28) * flickerScale;
      const flameW = (w * 0.22) * flickerScale;

      const flameGrad = ctx.createRadialGradient(lx, ly + h * 0.78, 0, lx, ly + h * 0.78, flameW * 1.5);
      flameGrad.addColorStop(0, '#ffffff');
      flameGrad.addColorStop(0.3, '#fef08a');
      flameGrad.addColorStop(0.7, '#f59e0b');
      flameGrad.addColorStop(1, 'rgba(245, 158, 11, 0)');

      ctx.fillStyle = flameGrad;
      ctx.beginPath();
      ctx.ellipse(lx, ly + h * 0.78, flameW, flameH, 0, 0, Math.PI * 2);
      ctx.fill();

      // 4. Base Opening Rim
      ctx.beginPath();
      ctx.ellipse(lx, ly + h, botW / 2, 3, 0, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(120, 53, 15, 0.8)';
      ctx.lineWidth = 1.5;
      ctx.stroke();

      ctx.restore();
    };

    let animationId: number;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Render background floating lanterns
      for (let i = lanterns.length - 1; i >= 0; i--) {
        const l = lanterns[i];
        l.swayPhase += l.swaySpeed;
        const currentSwayX = Math.sin(l.swayPhase) * l.swayAmount;
        l.y += l.vy;

        drawLantern(l, currentSwayX);

        // Remove lanterns that reached far off the top
        if (l.y < -120) {
          lanterns.splice(i, 1);
        }
      }

      // Render special central lantern if active
      if (specialLantern) {
        specialLantern.swayPhase += specialLantern.swaySpeed;
        const specialSwayX = Math.sin(specialLantern.swayPhase) * specialLantern.swayAmount;

        if (specialLantern.targetY !== undefined) {
          if (!specialLantern.stopped) {
            // Decelerate toward targetY
            const dist = specialLantern.y - specialLantern.targetY;
            if (dist > 2) {
              specialLantern.vy = -(dist * 0.04 + 0.35);
              specialLantern.y += specialLantern.vy;
            } else {
              specialLantern.y = specialLantern.targetY;
              specialLantern.stopped = true;
              specialLantern.vy = 0;
              if (!arrivedReported) {
                arrivedReported = true;
                if (onSpecialLanternArrived) {
                  onSpecialLanternArrived();
                }
              }
            }
          } else {
            // Gentle floating bob in place
            specialLantern.y = specialLantern.targetY + Math.sin(specialLantern.swayPhase * 0.7) * 6;
          }
        } else {
          // Continuous smooth ascent
          specialLantern.y += specialLantern.vy;
        }

        drawLantern(specialLantern, specialSwayX);
      }

      animationId = requestAnimationFrame(render);
    };

    animationId = requestAnimationFrame(render);

    // Click handler to detect tapping on the special lantern
    const handleTap = (clientX: number, clientY: number) => {
      if (!specialLantern || !specialLantern.stopped) return;
      const lx = specialLantern.x + Math.sin(specialLantern.swayPhase) * specialLantern.swayAmount;
      const ly = specialLantern.y;
      const hitRadius = specialLantern.width * 1.6;

      const dx = clientX - lx;
      const dy = clientY - (ly + specialLantern.height / 2);
      if (Math.sqrt(dx * dx + dy * dy) <= hitRadius) {
        if (onCenterLanternTap) {
          onCenterLanternTap();
        }
      }
    };

    const onPointerDown = (e: MouseEvent) => handleTap(e.clientX, e.clientY);
    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        handleTap(e.touches[0].clientX, e.touches[0].clientY);
      }
    };

    window.addEventListener('click', onPointerDown);
    window.addEventListener('touchstart', onTouchStart);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('click', onPointerDown);
      window.removeEventListener('touchstart', onTouchStart);
      clearInterval(spawnTimer);
      cancelAnimationFrame(animationId);
    };
  }, [mode, onCenterLanternTap, onSpecialLanternArrived]);

  return (
    <div className="fixed inset-0 pointer-events-none z-10">
      <canvas
        ref={canvasRef}
        className={`w-full h-full ${mode === 'special_arrival' ? 'pointer-events-auto cursor-pointer' : ''}`}
        aria-hidden="true"
      />
      {/* Light burst overlay during tap */}
      {isBursting && (
        <div 
          className="absolute inset-0 bg-gradient-to-t from-amber-400/90 via-amber-200/80 to-white pointer-events-none animate-ping opacity-95 duration-1000"
          style={{ animationDuration: '900ms' }}
        />
      )}
    </div>
  );
};
