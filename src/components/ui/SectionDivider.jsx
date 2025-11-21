import React from 'react'

export function SectionDivider({ variant = 'gradient' }) {
  if (variant === 'gradient') {
    return (
      <div className="relative h-32 overflow-hidden">
        {/* Gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-400 via-teal-400 to-cyan-400 opacity-10" />

        {/* Noise texture overlay */}
        <div className="absolute inset-0 opacity-30 mix-blend-overlay"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
            backgroundSize: '200px 200px'
          }}
        />

        {/* Floating blur orbs */}
        <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-emerald-400/20 rounded-full blur-3xl animate-pulse" />
        <div
          className="absolute top-1/2 right-1/4 w-80 h-80 bg-teal-400/20 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: '1s' }}
        />
        <div
          className="absolute bottom-0 left-1/2 w-72 h-72 bg-cyan-400/20 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: '2s' }}
        />
      </div>
    )
  }

  if (variant === 'line') {
    return (
      <div className="relative py-16">
        <div className="absolute inset-x-0 top-1/2 -translate-y-1/2">
          <div className="h-px bg-gradient-to-r from-transparent via-emerald-500 to-transparent" />
        </div>
      </div>
    )
  }

  if (variant === 'dots') {
    return (
      <div className="py-12 flex justify-center gap-2">
        <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
        <div className="w-2 h-2 rounded-full bg-teal-500 animate-pulse" style={{ animationDelay: '0.2s' }} />
        <div className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse" style={{ animationDelay: '0.4s' }} />
      </div>
    )
  }

  return null
}
