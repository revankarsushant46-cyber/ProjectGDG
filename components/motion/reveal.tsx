'use client'

import { motion, type HTMLMotionProps } from 'motion/react'

const EASE = [0.22, 1, 0.36, 1] as const

type RevealProps = HTMLMotionProps<'div'> & { delay?: number; y?: number }

export function Reveal({ delay = 0, y = 24, children, ...props }: RevealProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.7, delay, ease: EASE }}
      {...props}
    >
      {children}
    </motion.div>
  )
}

export function Stagger({ children, className, stagger = 0.08 }: { children: React.ReactNode; className?: string; stagger?: number }) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-60px' }}
      variants={{ hidden: {}, show: { transition: { staggerChildren: stagger } } }}
    >
      {children}
    </motion.div>
  )
}

export const staggerItem = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
}

export function StaggerItem({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.div className={className} variants={staggerItem}>
      {children}
    </motion.div>
  )
}

export function SectionLabel({ index, children }: { index: string; children: React.ReactNode }) {
  return (
    <p className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
      <span className="text-foreground">{index}</span>
      <span aria-hidden="true">/</span>
      <span>{children}</span>
    </p>
  )
}

export { EASE }
