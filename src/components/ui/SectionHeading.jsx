import React from 'react'

export function SectionHeading({ eyebrow, title, sub, align = 'left', gradient = false }) {
  const alignClass = align === 'center' ? 'text-center' : ''

  return (
    <header className={`mb-12 ${alignClass}`}>
      {eyebrow && (
        <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-emerald-600 dark:text-emerald-400 font-bold mb-6 px-4 py-2 bg-emerald-50 dark:bg-emerald-900/20 rounded-full border border-emerald-200 dark:border-emerald-800">
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          {eyebrow}
        </div>
      )}
      <h2 className={`text-5xl md:text-6xl lg:text-7xl font-black tracking-tighter leading-[1.1] ${
        gradient
          ? 'bg-gradient-to-r from-slate-900 via-emerald-700 to-teal-700 dark:from-slate-100 dark:via-emerald-400 dark:to-teal-400 bg-clip-text text-transparent'
          : 'text-slate-900 dark:text-slate-100'
      }`}>
        {title}
      </h2>
      {sub && (
        <p className="text-xl md:text-2xl text-slate-500 dark:text-slate-400 font-light mt-6 max-w-2xl leading-relaxed">
          {sub}
        </p>
      )}
    </header>
  )
}
