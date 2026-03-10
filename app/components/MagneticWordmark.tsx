"use client";

import { useRef, useState, useCallback, useEffect } from "react";

const MAGNETIC_RADIUS = 180;
const MAGNETIC_STRENGTH = 0.22;

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

interface MagneticLetterProps {
  char: string;
  className?: string;
  style?: React.CSSProperties;
  isAmpersand?: boolean;
}

function MagneticLetter({ char, className, style, isAmpersand }: MagneticLetterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const animRef = useRef<number>(0);
  const currentOffset = useRef({ x: 0, y: 0 });
  const targetOffset = useRef({ x: 0, y: 0 });

  const animate = useCallback(() => {
    const curr = currentOffset.current;
    const tgt = targetOffset.current;
    curr.x = lerp(curr.x, tgt.x, 0.08);
    curr.y = lerp(curr.y, tgt.y, 0.08);
    setOffset({ x: curr.x, y: curr.y });
    animRef.current = requestAnimationFrame(animate);
  }, []);

  useEffect(() => {
    animRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animRef.current);
  }, [animate]);

  const onMouseMove = useCallback((e: MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = e.clientX - cx;
    const dy = e.clientY - cy;
    const dist = Math.sqrt(dx * dx + dy * dy);
    if (dist < MAGNETIC_RADIUS) {
      const force = (1 - dist / MAGNETIC_RADIUS) * MAGNETIC_STRENGTH;
      targetOffset.current = {
        x: dx * force * 18,
        y: dy * force * 10,
      };
    } else {
      targetOffset.current = { x: 0, y: 0 };
    }
  }, []);

  const onMouseLeave = useCallback(() => {
    targetOffset.current = { x: 0, y: 0 };
  }, []);

  useEffect(() => {
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseleave", onMouseLeave);
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseleave", onMouseLeave);
    };
  }, [onMouseMove, onMouseLeave]);

  return (
    <span
      ref={ref}
      className={className}
      style={{
        ...style,
        display: "inline-block",
        transform: `translate(${offset.x}px, ${offset.y}px)`,
        willChange: "transform",
        color: isAmpersand ? "var(--accent)" : undefined,
      }}
    >
      {char}
    </span>
  );
}

interface MagneticWordmarkProps {
  className?: string;
}

const WORD1 = ["S", "T", "R", "A", "N", "D"];
const AMP = "&";
const WORD2 = ["S", "T", "O", "N", "E"];

export default function MagneticWordmark({ className }: MagneticWordmarkProps) {
  const letterClass = "font-display font-light leading-none text-foreground select-none";
  const letterStyle: React.CSSProperties = {
    fontSize: "clamp(3.5rem,10vw,9rem)",
    letterSpacing: "-0.02em",
  };

  return (
    <div className={className} style={{ display: "flex", alignItems: "baseline", gap: "0" }}>
      {WORD1.map((ch, i) => (
        <MagneticLetter
          key={`w1-${i}`}
          char={ch}
          className={letterClass}
          style={letterStyle}
        />
      ))}
      <MagneticLetter
        char={AMP}
        className={letterClass}
        style={letterStyle}
        isAmpersand
      />
      {WORD2.map((ch, i) => (
        <MagneticLetter
          key={`w2-${i}`}
          char={ch}
          className={letterClass}
          style={letterStyle}
        />
      ))}
    </div>
  );
}
