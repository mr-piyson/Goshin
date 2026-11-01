import React, { useEffect, useRef, useState } from "react";

import {
  motion,
  useReducedMotion,
  type Variants,
} from "motion/react";

/** Width expand/collapse duration (ms). */
const OUTER_DURATION = 280;

/** Content fade + scale duration (ms). */
const CONTENT_DURATION = 180;

/**
 * How far into the content's *exit* animation the width collapse starts.
 *
 *   1  -> old behaviour: content fully disappears, *then* the container
 *         collapses (strictly sequential, slow).
 *   0  -> both start at the same time.
 * 0.5  -> the container starts collapsing while the content is still
 *         fading/scaling out, which is what we want.
 */
const EXIT_OVERLAP = 0.5;

/** ms the width collapse is delayed while exiting. */
const CONTENT_EXIT_LEAD = CONTENT_DURATION * EXIT_OVERLAP; // 90ms

const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * Total time from `open: false` to fully collapsed (ms).
 * NOTE: this is *not* CONTENT + OUTER anymore, because the two
 * animations now overlap.
 */
export const COLLAPSIBLE_EXIT_DURATION = CONTENT_EXIT_LEAD + OUTER_DURATION;

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
  duration = OUTER_DURATION,
  className,
  children,
  initialOpen,
}: AnimatedCollapsibleProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

const outerDuration   = prefersReducedMotion ? 0 : duration / 1000;
const contentDuration = prefersReducedMotion ? 0 : CONTENT_DURATION / 1000;
const contentExitLead = contentDuration * EXIT_OVERLAP;   // 90 ms
const openContentLead = outerDuration;                    // wait for width to expand

const containerVariants: Variants = {
  open: {
    width,
    transition: { duration: outerDuration, ease: EASE },
  },
  closed: {
    width: 0,
    transition: {
      duration: outerDuration,
      ease: EASE,
      delay: contentExitLead,           // width waits 90 ms while content already exits
    },
  },
};

const contentVariants: Variants = {
  open: {
    opacity: 1,
    scale: 1,
    transition: {
      opacity: { duration: contentDuration, ease: "easeOut", delay: openContentLead },
      scale:   { duration: contentDuration, ease: EASE,     delay: openContentLead },
    },
  },
  closed: {
    opacity: 0,
    scale: 0.82,
    transition: {
      opacity: { duration: contentDuration, ease: "easeIn" },
      scale:   { duration: contentDuration, ease: EASE },
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
      className={`shrink-0 overflow-hidden ${className}`}
      variants={containerVariants}
      initial={false}
      animate={open ? "open" : "closed"}
      aria-hidden={!open}
      style={{
        minWidth: 0,
        flex: "0 0 auto",
        // Center the fixed-width inner box inside the shrinking window so
        // the content visually collapses towards the center from both
        // sides, instead of being clipped only on the right edge.
        display: "flex",
        justifyContent: "center",
        alignItems: "stretch",
        overflow: "hidden",
      }}
    >
      <div
        className="h-full"
        style={{
          width,
          minWidth: width,
          flex: "0 0 auto",
          height: "100%",
        }}
      >
        <motion.div
          className="h-full"
          variants={contentVariants}
          initial={initialOpen ? "open" : "closed"}
          animate={open ? "open" : "closed"}  
          style={{ transformOrigin: "center center" }}
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

  // Capture the initial value *once* and never update it.
  const [initialOpen] = useState(open);
  // Do not render until persisted settings are loaded.
  if (!ready) return null;

  return (
    <AnimatedCollapsible
      open={open}
      width={width}
      duration={duration}
      className={className}
      initialOpen={initialOpen}   // frozen → no more snap
    >
      {children}
    </AnimatedCollapsible>
  );
}