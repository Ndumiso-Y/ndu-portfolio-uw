import React from 'react'
import { cn } from '@/lib/cn'

export default function Button({
  className = '',
  variant = 'primary',
  as = 'button',
  href,
  children,
  icon = false,
  ...props
}) {
  const base = 'group relative inline-flex items-center justify-center rounded-full px-8 py-4 text-base font-semibold transition-all duration-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden'

  const variants = {
    primary: 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white hover:from-emerald-500 hover:to-teal-500 hover:scale-105 hover:shadow-2xl hover:shadow-emerald-500/50 active:scale-[0.98] focus-visible:ring-emerald-500',
    ghost: 'bg-transparent text-slate-900 hover:bg-slate-100 dark:text-slate-100 dark:hover:bg-slate-800 focus-visible:ring-slate-400',
    outline: 'border-2 border-emerald-600 dark:border-emerald-400 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 hover:scale-105 focus-visible:ring-emerald-500'
  }

  const classes = cn(base, variants[variant], className)

  const content = (
    <>
      {/* Shine effect for primary button */}
      {variant === 'primary' && (
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700" />
      )}

      <span className="relative z-10 flex items-center gap-2">
        {children}
        {icon && (
          <svg className="w-5 h-5 transition-transform duration-500 group-hover:translate-x-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        )}
      </span>

      {/* Glow effect */}
      {variant === 'primary' && (
        <div className="absolute inset-0 rounded-full bg-emerald-400 blur-xl opacity-0 group-hover:opacity-50 transition-opacity duration-500 -z-10" />
      )}
    </>
  )

  if (as === 'a' && href) {
    return (
      <a className={classes} href={href} {...props}>
        {content}
      </a>
    )
  }

  return (
    <button className={classes} {...props}>
      {content}
    </button>
  )
}
