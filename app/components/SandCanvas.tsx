"use client";

import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  life: number;
  maxLife: number;
  spawned: boolean;
}

interface BurstParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  life: number;
  maxLife: number;
}

const ACCENT = { r: 201, g: 185, b: 154 };
const COUNT = 180;
const REPEL_RADIUS = 110;
const REPEL_STRENGTH = 0.45;
const GRAVITY = 0.018;
const DRIFT_X = 0.005;
const BURST_COUNT = 52;

export default function SandCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouse = useRef({ x: -9999, y: -9999 });
  const particles = useRef<Particle[]>([]);
  const burst = useRef<BurstParticle[]>([]);
  const frameRef = useRef<number>(0);
  const startTime = useRef<number>(Date.now());

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    function resize() {
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener("resize", resize);

    function spawnParticle(i: number): Particle {
      const elapsed = Date.now() - startTime.current;
      const delay = (i / COUNT) * 2000;
      const spawned = elapsed > delay;
      const cx = canvas!.width / 2;
      return {
        x: spawned ? cx + (Math.random() - 0.5) * canvas!.width * 0.85 : cx,
        y: spawned ? Math.random() * canvas!.height : -20,
        vx: (Math.random() - 0.5) * 0.3,
        vy: Math.random() * 0.6 + 0.2,
        size: Math.random() * 1.6 + 0.3,
        opacity: Math.random() * 0.38 + 0.08,
        life: Math.random() * 400 + 200,
        maxLife: Math.random() * 400 + 200,
        spawned,
      };
    }

    particles.current = Array.from({ length: COUNT }, (_, i) => spawnParticle(i));

    function resetParticle(p: Particle) {
      const cx = canvas!.width / 2;
      const elapsed = Date.now() - startTime.current;
      const isPourPhase = elapsed < 2000;
      p.x = isPourPhase
        ? cx + (Math.random() - 0.5) * 80
        : Math.random() * canvas!.width;
      p.y = isPourPhase ? -10 : -Math.random() * 60;
      p.vx = (Math.random() - 0.5) * (isPourPhase ? 0.5 : 0.3);
      p.vy = Math.random() * 0.7 + 0.15;
      p.size = Math.random() * 1.6 + 0.3;
      p.opacity = Math.random() * 0.38 + 0.08;
      p.life = Math.random() * 500 + 200;
      p.maxLife = p.life;
      p.spawned = true;
    }

    function spawnBurst(x: number, y: number) {
      for (let i = 0; i < BURST_COUNT; i++) {
        // Radial angle spread across full circle
        const angle = (i / BURST_COUNT) * Math.PI * 2 + (Math.random() - 0.5) * 0.4;
        // Vary speed so it fans out naturally
        const speed = Math.random() * 5.5 + 1.5;
        const life = Math.random() * 220 + 120;
        burst.current.push({
          x: x + (Math.random() - 0.5) * 6,
          y: y + (Math.random() - 0.5) * 6,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed - 1.5, // slight upward bias looks natural
          size: Math.random() * 2.2 + 0.5,
          opacity: Math.random() * 0.7 + 0.3,
          life,
          maxLife: life,
        });
      }
    }

    function draw() {
      if (!canvas || !ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const mx = mouse.current.x;
      const my = mouse.current.y;

      // --- Ambient particles ---
      for (const p of particles.current) {
        if (!p.spawned) {
          const elapsed = Date.now() - startTime.current;
          const idx = particles.current.indexOf(p);
          const delay = (idx / COUNT) * 2000;
          if (elapsed > delay) resetParticle(p);
          continue;
        }

        // Cursor repulsion
        const dx = p.x - mx;
        const dy = p.y - my;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < REPEL_RADIUS && dist > 0) {
          const force = (1 - dist / REPEL_RADIUS) * REPEL_STRENGTH;
          p.vx += (dx / dist) * force;
          p.vy += (dy / dist) * force;
        }

        p.vy += GRAVITY;
        p.vx += (Math.random() - 0.5) * DRIFT_X;
        p.vx *= 0.98;
        p.vy *= 0.99;
        p.x += p.vx;
        p.y += p.vy;
        p.life -= 1;

        const lifeFrac = p.life / p.maxLife;
        const fadeOpacity = p.opacity * Math.min(lifeFrac * 3, 1);

        if (p.life <= 0 || p.y > canvas.height + 20 || p.x < -20 || p.x > canvas.width + 20) {
          resetParticle(p);
          continue;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${ACCENT.r},${ACCENT.g},${ACCENT.b},${fadeOpacity})`;
        ctx.fill();
      }

      // --- Burst particles ---
      for (let i = burst.current.length - 1; i >= 0; i--) {
        const b = burst.current[i];

        // Same gravity + dampen as ambient
        b.vy += GRAVITY * 2.2; // burst falls a bit faster — more dramatic
        b.vx += (Math.random() - 0.5) * DRIFT_X * 3;
        b.vx *= 0.97;
        b.vy *= 0.98;
        b.x += b.vx;
        b.y += b.vy;
        b.life -= 1;

        const lifeFrac = b.life / b.maxLife;
        // Fade in quickly, then fade out
        const fadeOpacity = b.opacity * Math.min(lifeFrac * 4, 1) * Math.min((1 - lifeFrac) * 5, 1);

        if (b.life <= 0 || b.y > canvas.height + 30) {
          burst.current.splice(i, 1);
          continue;
        }

        ctx.beginPath();
        ctx.arc(b.x, b.y, b.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${ACCENT.r},${ACCENT.g},${ACCENT.b},${Math.max(0, fadeOpacity)})`;
        ctx.fill();
      }

      frameRef.current = requestAnimationFrame(draw);
    }

    draw();

    const onMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY };
    };
    const onLeave = () => {
      mouse.current = { x: -9999, y: -9999 };
    };
    const onClick = (e: MouseEvent) => {
      spawnBurst(e.clientX, e.clientY);
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseleave", onLeave);
    window.addEventListener("click", onClick);

    return () => {
      cancelAnimationFrame(frameRef.current);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseleave", onLeave);
      window.removeEventListener("click", onClick);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-0"
    />
  );
}
