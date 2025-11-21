import React, { useEffect, useState } from "react"
import websitesData from "@/content/websites.json"
import { Card } from "@/components/ui/Card"
import { SectionHeading } from "@/components/ui/SectionHeading"
import { Tag } from "@/components/ui/Tag"

function WebsiteCard({ website, index }) {
  return (
    <div
      className="opacity-0 translate-y-8 animate-fade-in-up"
      style={{ animationDelay: `${index * 80}ms`, animationFillMode: 'forwards' }}
    >
      <Card className="group flex flex-col overflow-hidden p-0 bg-white dark:bg-slate-900/50">
        {website.thumb && (
          <div className="overflow-hidden aspect-[16/10] bg-slate-50 dark:bg-slate-800 relative">
            <img
              src={website.thumb}
              alt={website.name || "Website"}
              className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 group-hover:scale-110 group-hover:rotate-1 transition-all duration-700"
              loading="lazy"
              decoding="async"
            />
            {/* Gradient overlay on hover */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </div>
        )}

      <div className="p-6 flex flex-col flex-1">
        <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-2">
          {website.name || "—"}
        </h3>

        {website.outcome && (
          <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
            {website.outcome}
          </p>
        )}

        {/* Stack tags */}
        {website.stack && website.stack.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {website.stack.map((tech, i) => (
              <Tag key={i} variant="default">
                {tech}
              </Tag>
            ))}
          </div>
        )}

        <div className="mt-auto pt-4 border-t border-slate-200 dark:border-slate-800">
          {website.url && (
            <a
              href={website.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-medium text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 transition-colors group/link"
              aria-label={`Visit ${website.name} website`}
            >
              <span>Visit Site</span>
              <svg
                className="w-4 h-4 transform transition-transform group-hover/link:translate-x-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                />
              </svg>
            </a>
          )}
        </div>
      </div>
      </Card>
    </div>
  )
}

export default function Websites() {
  const [expanded, setExpanded] = useState(false)
  const [isDesktop, setIsDesktop] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)")
    const set = () => {
      setIsDesktop(mq.matches)
      setExpanded(mq.matches)
    }
    set()
    mq.addEventListener("change", set)
    return () => mq.removeEventListener("change", set)
  }, [])

  if (!websitesData.length) return null

  const visible = expanded || isDesktop ? websitesData : websitesData.slice(0, 3)

  const collapse = () => {
    setExpanded(false)
    const el = document.getElementById("websites")
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" })
  }

  return (
    <section id="websites" className="relative bg-white dark:bg-slate-950 section-offset overflow-hidden">
      {/* Floating decorative elements */}
      <div className="absolute top-1/4 -left-24 w-80 h-80 bg-gradient-to-br from-teal-400/10 to-emerald-400/10 rounded-full blur-3xl animate-pulse pointer-events-none" style={{ animationDelay: '0.5s' }} />

      <div className="relative max-w-6xl mx-auto px-6 py-20 md:py-32">
        <SectionHeading
          eyebrow="02 — Portfolio"
          title="Websites"
          sub="A selection of client and personal builds focused on clarity, speed, and conversion. Each site is built for accessibility and performance with simple, goal-driven UX."
          gradient
        />

        <div className="mt-16 grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {visible.map((website, i) => (
            <WebsiteCard key={website.name || i} website={website} index={i} />
          ))}
        </div>

        {/* Show more / Show less on mobile */}
        {!isDesktop && websitesData.length > 3 && (
          <div className="mt-12 text-center">
            <button
              onClick={() => (expanded ? collapse() : setExpanded(true))}
              className="inline-flex items-center gap-2 px-6 py-3 text-sm font-medium text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 border-2 border-emerald-600 dark:border-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 transition-all duration-200 rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2"
              aria-label={expanded ? "Show fewer websites" : "Show all websites"}
            >
              {expanded ? "Show Less" : `Show All ${websitesData.length} Websites`}
              <svg
                className={`w-4 h-4 transform transition-transform ${expanded ? "rotate-180" : ""}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
          </div>
        )}
      </div>
    </section>
  )
}
