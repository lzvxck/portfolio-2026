"use client";

import { MotionConfig } from "framer-motion";

export const softEase = [0.22, 1, 0.36, 1] as const;

export function MotionProvider({ children }: { children: React.ReactNode }) {
  return (
    <MotionConfig reducedMotion="user" transition={{ duration: 0.5, ease: softEase }}>
      {children}
    </MotionConfig>
  );
}
