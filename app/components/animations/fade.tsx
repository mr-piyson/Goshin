import React, { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from 'motion/react';

interface FadeProps {
  open: boolean;
  openDuration?: number;
  closeDuration?: number;
  className?: string;
  children: React.ReactNode;
}

export default function Fade({
  open,
  openDuration = 200,
  closeDuration = 260,
  className = '',
  children,
}: FadeProps) {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const [ready, setReady] = useState(false);

  // Suppress the transition on first paint when `open` starts as true.
  useEffect(() => {
    const id = requestAnimationFrame(() => setReady(true));
    return () => cancelAnimationFrame(id);
  }, []);

  // Stay mounted — the children need to be in the DOM to fade themselves out.
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.inert = !open;
    el.setAttribute('aria-hidden', String(!open));
  }, [open]);

  return (
    <div
      ref={ref}
      className={className}
      data-fade-state={open ? 'open' : 'closed'}
      data-fade-ready={ready ? '' : undefined}
      data-fade-reduced={prefersReducedMotion ? '' : undefined}
      style={
        {
          '--fade-open': `${openDuration}ms`,
          '--fade-close': `${closeDuration}ms`,
        } as React.CSSProperties
      }
    >
      {children}
    </div>
  );
}