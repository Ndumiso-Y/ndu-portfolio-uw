import React, { useState } from 'react'
import websitesData from '@/content/websites.json'
import { trackWebProjectClick } from '../../lib/analytics'

function WebsiteCard({ website, index }) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div
      className="group card-modern overflow-hidden cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image only */}
      <div className="aspect-[4/3] overflow-hidden relative">
        <img
          src={website.thumb}
          alt={website.name}
          className={`w-full h-full object-cover transition-transform duration-700 ${
            isHovered ? 'scale-110' : 'scale-100'
          }`}
        />
        <div className="absolute inset-0 bg-[#41b3bc]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      </div>

      {/* Details below image */}
      <div className="p-6">
        {/* Tags - filter out React/Vite/Tailwind */}
        {website.stack && website.stack.filter(tech => !['React', 'Vite', 'Tailwind'].includes(tech)).length > 0 && (
          <div className="flex flex-wrap gap-2 mb-3">
            {website.stack
              .filter(tech => !['React', 'Vite', 'Tailwind'].includes(tech))
              .slice(0, 3)
              .map((tech, i) => (
                <span
                  key={i}
                  className="px-2 py-1 text-xs font-medium bg-glass rounded-full text-text-secondary"
                >
                  {tech}
                </span>
              ))}
          </div>
        )}

        {/* Title */}
        <h3 className="text-xl font-bold text-white mb-2">{website.name}</h3>

        {/* Description */}
        <p className="text-sm text-text-secondary mb-4 line-clamp-2">
          {website.outcome}
        </p>

        {/* Link */}
        <div className="flex items-center gap-2 text-[#41b3bc] font-medium text-sm">
          <span>View Website</span>
          <svg
            className={`w-4 h-4 transition-transform ${
              isHovered ? 'translate-x-2' : 'translate-x-0'
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17 8l4 4m0 0l-4 4m4-4H3"
            />
          </svg>
        </div>
      </div>
    </div>
  )
}

export default function WorkShowcase() {
  return (
    <section
      id="websites"
      className="relative py-24 px-6 md:px-12"
      style={{ background: 'linear-gradient(to bottom, #0a0a0a, #050505)' }}
    >
      <div className="max-w-[1400px] mx-auto">
        {/* Section header */}
        <div className="mb-16">
          <span className="inline-block px-4 py-2 glass rounded-full text-sm text-[#41b3bc] font-medium mb-6">
            Websites
          </span>
          <h2 className="text-title text-white mb-4">
            Websites That <span className="text-[#41b3bc]">Convert</span>
          </h2>
          <p className="text-lg text-text-secondary max-w-2xl">
            Modern, fast, and built for results. Each project combines clean design with
            performance optimization.
          </p>
        </div>

        {/* Grid Layout - 2 columns on desktop */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {websitesData.map((website, i) => (
            <a
              key={website.name}
              href={website.url}
              onClick={() => trackWebProjectClick(website.name)}
              target="_blank"
              rel="noopener noreferrer"
              className="reveal-up group"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <WebsiteCard
                website={website}
                index={i}
              />
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
