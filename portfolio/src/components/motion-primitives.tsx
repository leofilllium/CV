"use client";
import { motion, useMotionValue, useSpring, useScroll, useTransform } from "motion/react";
import { useRef, type ReactNode } from "react";
import { useExperience } from "./experience-provider";

export function Reveal({ children, className = "", delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const { calm } = useExperience();
  return <motion.div className={className} initial={false} whileInView={calm ? {} : { y: [24, 0] }} viewport={{ once: true, amount: 0.12 }} transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}>{children}</motion.div>;
}
export function Magnetic({ children, className = "" }: { children: ReactNode; className?: string }) {
  const { calm } = useExperience();
  const x = useMotionValue(0), y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 220, damping: 19 }), springY = useSpring(y, { stiffness: 220, damping: 19 });
  return <motion.span className={`magnetic ${className}`} style={{ x: springX, y: springY }} onPointerMove={event => {
    if (calm || event.pointerType !== "mouse") return;
    const rect = event.currentTarget.getBoundingClientRect();
    x.set((event.clientX - rect.left - rect.width / 2) * 0.15);
    y.set((event.clientY - rect.top - rect.height / 2) * 0.2);
  }} onPointerLeave={() => { x.set(0); y.set(0); }}>{children}</motion.span>;
}
export function ReadingProgress() {
  const { scrollYProgress } = useScroll();
  return <motion.div className="reading-progress" style={{ scaleX: scrollYProgress }} aria-hidden="true" />;
}
export function Manifesto({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const { calm } = useExperience();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const x = useTransform(scrollYProgress, [0, 1], [70, -70]);
  return <div className="manifesto" ref={ref} aria-hidden="true"><motion.div style={{ x: calm ? 0 : x }}>{children}</motion.div></div>;
}
