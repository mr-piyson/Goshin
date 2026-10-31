import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import {
  AnimatePresence,
  motion,
  useIsPresent,
  useReducedMotion,
  type Variants,
} from 'motion/react';

const OUTER_DURATION = 280;
const CONTENT_DURATION = 180;
const EASE = [0.22, 1, 0.36, 1] as const;

export const COLLAPSIBLE_EXIT_DURATION = Math.max(OUTER_DURATION, CONTENT_DURATION);

/** Keeps a node mounted long enough for its exit animation to finish. */
export function usePresence(open: boolean, duration = COLLAPSIBLE_EXIT_DURATION) {
  const [mounted, setMounted] = useState(open);
  const prefersReducedMotion = useReducedMotion();
  const exitDuration = prefersReducedMotion ? 0 : duration;

  useEffect(() => {
    if (open) {
      setMounted(true);
      return;
    }
    if (!mounted) return;

    const timer = window.setTimeout(() => setMounted(false), exitDuration);
    return () => window.clearTimeout(timer);
  }, [open, exitDuration, mounted]);

  return mounted;
}

interface CollapsibleProps {
  open: boolean;
  /** Width in pixels when fully expanded. */
  width: number;
  duration?: number;
  className?: string;
  children: React.ReactNode;
}

interface AnimatedCollapsibleProps extends Omit<CollapsibleProps, 'open'> {
  duration: number;
}

function AnimatedCollapsible({
  width,
  duration,
  className,
  children,
}: AnimatedCollapsibleProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const isPresent = useIsPresent();
  const prefersReducedMotion = useReducedMotion();
  const outerDuration = prefersReducedMotion ? 0 : duration / 1000;
  const contentDuration = prefersReducedMotion ? 0 : CONTENT_DURATION / 1000;

  const containerVariants: Variants = {
    open: (targetWidth: number) => ({
      width: targetWidth,
      transition: {
        when: 'beforeChildren', // mount stays sequential: width → content
        width: { duration: outerDuration, ease: EASE },
      },
    }),
    closed: {
      width: 0,
      transition: {
        // no `when` ⇒ width + content run together on exit
        width: { duration: outerDuration, ease: EASE },
      },
    },
  };

  const contentVariants: Variants = {
    open: {
      opacity: 1,
      scale: 1,
      transition: {
        opacity: { duration: contentDuration, ease: 'easeOut' },
        scale: { duration: contentDuration, ease: EASE },
      },
    },
    closed: {
      opacity: 0,
      scale: 0.82,
      transition: {
        opacity: { duration: contentDuration, ease: 'easeIn' },
        scale: { duration: contentDuration, ease: EASE },
      },
    },
  };

  useEffect(() => {
    if (rootRef.current) rootRef.current.inert = !isPresent;
  }, [isPresent]);

  return (
    <motion.div
      ref={rootRef}
      className={`collapse-x ${className ?? ''}`}
      variants={containerVariants}
      custom={width}
      initial="closed"
      animate="open"
      exit="closed"
      aria-hidden={!isPresent}
    >
      <div className="collapse-x_inner" style={{ width }}>
        <motion.div className="collapse-x_content" variants={contentVariants}>
          {children}
        </motion.div>
      </div>
    </motion.div>
  );
}

export default function Collapsible({
  open,
  width,
  duration = OUTER_DURATION,
  className = '',
  children,
}: CollapsibleProps) {
  return (
    <AnimatePresence initial={false}>
      {open && (
        <AnimatedCollapsible
          key="collapsible"
          width={width}
          duration={duration}
          className={className}
        >
          {children}
        </AnimatedCollapsible>
      )}
    </AnimatePresence>
  );
}

interface ResponsiveCollapsibleProps {
  open: boolean;
  duration?: number;
  className?: string;
  children: React.ReactNode;
}

export function ResponsiveCollapsible({
  open,
  duration = OUTER_DURATION,
  className = '',
  children,
}: ResponsiveCollapsibleProps) {
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
      <Collapsible
        open={open}
        width={width}
        duration={duration}
        className="ml-auto"
      >
        {children}
      </Collapsible>
    </div>
  );
}