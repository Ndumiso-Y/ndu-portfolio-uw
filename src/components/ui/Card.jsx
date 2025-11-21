import React from 'react'
import { cn } from '@/lib/cn'

export function Card({ className = '', children, hover = true, glass = true, ...props }) {
  // Outer gradient border wrapper
  const wrapperClasses = glass
    ? 'group relative rounded-3xl p-[1px] bg-gradient-to-br from-emerald-400/20 via-transparent to-teal-400/20 hover:from-emerald-400/40 hover:to-teal-400/40 transition-all duration-500'
    : ''

  // Inner card with glassmorphism
  const baseClasses = cn(
    'relative rounded-3xl p-6 transition-all duration-500 will-change-transform',
    glass
      ? 'bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-white/20 dark:border-slate-700/20'
      : 'bg-white dark:bg-slate-900/50 border border-slate-200/60 dark:border-slate-800/80 shadow-sm'
  )

  const hoverClasses = hover
    ? 'group-hover:bg-white/90 dark:group-hover:bg-slate-900/90 group-hover:-translate-y-2 group-hover:shadow-2xl group-hover:shadow-emerald-500/10'
    : ''

  const cardContent = (
    <div className={cn(baseClasses, hoverClasses, className)} {...props}>
      {children}
    </div>
  )

  // Wrap in gradient border if glass effect is enabled
  return glass ? <div className={wrapperClasses}>{cardContent}</div> : cardContent
}
