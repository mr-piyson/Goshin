
import React, {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';

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

export const COLLAPSIBLE_EXIT_DURATION = Math.max(
  OUTER_DURATION,
  CONTENT_DURATION
);

export function usePresence(
  open: boolean,
  duration = COLLAPSIBLE_EXIT_DURATION,
  enabled = true,
) {
  // Never mount before settings have finished loading.
  const [mounted, setMounted] = useState(false);

  const prefersReducedMotion = useReducedMotion();
  const exitDuration = prefersReducedMotion ? 0 : duration;

  useEffect(() => {
    if (!enabled) {
      setMounted(false);
      return;
    }

    if (open) {
      setMounted(true);
      return;
    }

    if (!mounted) return;

    const timer = window.setTimeout(() => {
      setMounted(false);
    }, exitDuration);

    return () => window.clearTimeout(timer);
  }, [open, enabled, exitDuration, mounted]);

  return mounted;
}

interface CollapsibleProps {
  open: boolean;
  width: number;
  duration?: number;
  className?: string;
  children: React.ReactNode;

  /** Set false until persisted settings have loaded. */
  ready?: boolean;
}

interface AnimatedCollapsibleProps extends Omit<CollapsibleProps, 'open' | 'ready'> {
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
  const contentDuration = prefersReducedMotion
    ? 0
    : CONTENT_DURATION / 1000;

  const containerVariants: Variants = {
    open: (targetWidth: number) => ({
      width: targetWidth,
      transition: {
        when: 'beforeChildren',
        width: {
          duration: outerDuration,
          ease: EASE,
        },
      },
    }),

    closed: {
      width: 0,
      transition: {
        width: {
          duration: outerDuration,
          ease: EASE,
        },
      },
    },
  };

  const contentVariants: Variants = {
    open: {
      opacity: 1,
      scale: 1,
      transition: {
        opacity: {
          duration: contentDuration,
          ease: 'easeOut',
        },
        scale: {
          duration: contentDuration,
          ease: EASE,
        },
      },
    },

    closed: {
      opacity: 0,
      scale: 0.82,
      transition: {
        opacity: {
          duration: contentDuration,
          ease: 'easeIn',
        },
        scale: {
          duration: contentDuration,
          ease: EASE,
        },
      },
    },
  };

  useEffect(() => {
    if (rootRef.current) {
      rootRef.current.inert = !isPresent;
    }
  }, [isPresent]);

  return (
    <motion.div
      ref={rootRef}
      className={`collapse-x ${className ?? ''}`}
      variants={containerVariants}
      custom={width}
      initial={false}
      animate="open"
      exit="closed"
      aria-hidden={!isPresent}
    >
      <div className="collapse-x_inner" style={{ width }}>
        <motion.div
          className="collapse-x_content"
          variants={contentVariants}
          initial={false}
        >
          {children}
        </motion.div>
      </div>
    </motion.div>
  );
}

export default function Collapsible({
  open,
  ready = true,
  width,
  duration = OUTER_DURATION,
  className = '',
  children,
}: CollapsibleProps) {
  // Wait for persisted settings before rendering.
  if (!ready) return null;

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
  ready?: boolean;
  duration?: number;
  className?: string;
  children: React.ReactNode;
}

export function ResponsiveCollapsible({
  open,
  ready = true,
  duration = OUTER_DURATION,
  className = '',
  children,
}: ResponsiveCollapsibleProps) {
  const measureRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState<number | null>(null);

  useLayoutEffect(() => {
    const element = measureRef.current;
    if (!element) return;

    const update = () => {
      const nextWidth = element.getBoundingClientRect().width;

      setWidth((previous) =>
        previous === nextWidth ? previous : nextWidth
      );
    };

    update();

    const observer = new ResizeObserver(update);
    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={measureRef} className={className}>
      {ready && width !== null && (
        <Collapsible
          open={open}
          ready={ready}
          width={width}
          duration={duration}
          className="ml-auto"
        >
          {children}
        </Collapsible>
      )}
    </div>
  );
}
