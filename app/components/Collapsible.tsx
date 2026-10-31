import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';

/** Keeps a node mounted long enough for its exit transition to finish. */
export function usePresence(open: boolean, duration = 300) {
  const [mounted, setMounted] = useState(open);

  useEffect(() => {
    if (open) {
      setMounted(true);
      return;
    }
    if (!mounted) return;
    const timer = window.setTimeout(() => setMounted(false), duration);
    return () => window.clearTimeout(timer);
  }, [open, duration, mounted]);

  return mounted;
}

function useExpanded(open: boolean, mounted: boolean) {
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    if (!mounted) return;
    if (open) {
      const frame = requestAnimationFrame(() => setExpanded(true));
      return () => cancelAnimationFrame(frame);
    }
    setExpanded(false);
  }, [open, mounted]);

  return expanded;
}

interface CollapsibleProps {
  open: boolean;
  /** Width in pixels when fully expanded. */
  width: number;
  duration?: number;
  className?: string;
  children: React.ReactNode;
}

/**
 * Collapses horizontally from left to right while its content scales down.
 * Opening runs the same transition in reverse.
 */
export default function Collapsible({
  open,
  width,
  duration = 300,
  className = '',
  children,
}: CollapsibleProps) {
  const mounted = usePresence(open, duration);
  const expanded = useExpanded(open, mounted);
  if (!mounted) return null;

  return (
    <div
      className={`collapse-x ${className}`}
      style={{ width: expanded ? width : 0, transitionDuration: `${duration}ms` }}
      aria-hidden={!open}
    >
      <div className="collapse-x_inner" style={{ width }}>
        <div className="collapse-x_content" data-open={expanded ? '' : undefined}>
          {children}
        </div>
      </div>
    </div>
  );
}

interface RevealProps {
  open: boolean;
  duration?: number;
  className?: string;
  children: React.ReactNode;
}

/**
 * Collapsible for blocks that size themselves to their container (e.g. a
 * centered quote). Measures the available width, then animates from that width
 * down to zero while the content scales down. Anchored right so the block
 * collapses from left to right.
 */
export function ResponsiveCollapsible({ open, duration = 300, className = '', children }: RevealProps) {
  const measureRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);

  useLayoutEffect(() => {
    const element = measureRef.current;
    if (!element) return;
    const update = () => setWidth(element.getBoundingClientRect().width);
    update();
    const observer = new ResizeObserver(update);
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={measureRef} className={className}>
      <Collapsible open={open} width={width} duration={duration} className="ml-auto">
        {children}
      </Collapsible>
    </div>
  );
}
