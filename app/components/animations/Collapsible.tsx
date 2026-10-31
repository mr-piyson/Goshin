
import React, {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";

import {
  motion,
  useReducedMotion,
  type Variants,
} from "motion/react";

const OUTER_DURATION = 280;
const CONTENT_DURATION = 180;
const EASE = [0.22, 1, 0.36, 1] as const;

export const COLLAPSIBLE_EXIT_DURATION =
  OUTER_DURATION + CONTENT_DURATION;

export function usePresence(
  open: boolean,
  duration = COLLAPSIBLE_EXIT_DURATION,
  enabled = true,
) {
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
  ready?: boolean;
}

interface AnimatedCollapsibleProps
  extends Omit<CollapsibleProps, "ready"> {
  initialOpen: boolean;
}

function AnimatedCollapsible({
  open,
  width,
  duration,
  className,
  children,
  initialOpen,
}: AnimatedCollapsibleProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const outerDuration = prefersReducedMotion ? 0 : duration / 1000;
  const contentDuration = prefersReducedMotion
    ? 0
    : CONTENT_DURATION / 1000;

  const containerVariants: Variants = {
    open: {
      width,
      transition: {
        // Expand first, then reveal content.
        when: "beforeChildren",
        width: {
          duration: outerDuration,
          ease: EASE,
        },
      },
    },

    closed: {
      width: 0,
      transition: {
        // Hide content first, then shrink the container.
        when: "afterChildren",
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
          ease: "easeOut",
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
          ease: "easeIn",
        },
        scale: {
          duration: contentDuration,
          ease: EASE,
        },
      },
    },
  };

  // Prevent keyboard interaction while the component is closed.
  useEffect(() => {
    if (rootRef.current) {
      rootRef.current.inert = !open;
    }
  }, [open]);

  return (
    <motion.div
      ref={rootRef}
      className={`collapse-x shrink-0 overflow-hidden ${className}`}
      variants={containerVariants}
      initial={false}
      animate={open ? "open" : "closed"}
      aria-hidden={!open}
      style={{
        minWidth: 0,
        flex: "0 0 auto",
      }}
    >
      <div
        className="collapse-x_inner"
        style={{
          width,
          minWidth: width,
          height: "100%",
        }}
      >
        <motion.div
          className="collapse-x_content"
          variants={contentVariants}
          initial={initialOpen ? "open" : "closed"}
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
  className = "",
  children,
}: CollapsibleProps) {
  // Do not render until persisted settings are loaded.
  if (!ready) return null;

  return (
    <AnimatedCollapsible
      open={open}
      width={width}
      duration={duration}
      className={className}
      initialOpen={open}
    >
      {children}
    </AnimatedCollapsible>
  );
}
