import React, { useEffect, useState } from "react"
import projectsData from "@/content/projects.json"
import { Card } from "@/components/ui/Card"
import { SectionHeading } from "@/components/ui/SectionHeading"
import { Tag } from "@/components/ui/Tag"

function ProjectCard({ project, index }) {
  return (
    <div
      className="opacity-0 translate-y-8 animate-fade-in-up"
      style={{ animationDelay: `${index * 100}ms`, animationFillMode: 'forwards' }}
    >
      <Card className="group flex flex-col overflow-hidden p-0 bg-white dark:bg-slate-900/50">
        {project.thumb && (
          <div className="overflow-hidden aspect-[16/10] bg-slate-50 dark:bg-slate-800 relative">
            <img
              src={project.thumb}
              alt={project.name || "Project"}
              className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 group-hover:scale-110 group-hover:rotate-1 transition-all duration-700"
              loading="lazy"
            />
            {/* Gradient overlay on hover */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </div>
        )}

        <div className="p-6 flex flex-col flex-1">
          <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-2">
            {project.name || "—"}
          </h3>

          {project.audio && (
            <div className="my-3">
              <audio
                controls
                src={project.audio}
                className="w-full max-h-10"
                preload="none"
                aria-label={project.audioDesc || `Audio description for ${project.name}`}
              />
              {project.audioDesc && (
                <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  {project.audioDesc}
                </div>
              )}
            </div>
          )}

          {project.outcome && (
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
              {project.outcome}
            </p>
          )}

          {/* Stack tags */}
          {project.stack && project.stack.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {project.stack.map((tech, i) => (
                <Tag key={i} variant="default">
                  {tech}
                </Tag>
              ))}
            </div>
          )}

          <div className="mt-auto pt-4 border-t border-slate-200 dark:border-slate-800">
            {project.url && (
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-medium text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 transition-colors group/link"
                aria-label={`View ${project.name} project`}
              >
                <span>View Project</span>
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
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
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

export default function Projects() {
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

  if (!projectsData.length) return null

  const visible = expanded || isDesktop ? projectsData : projectsData.slice(0, 2)

  const collapse = () => {
    setExpanded(false)
    const el = document.getElementById("projects")
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" })
  }

  return (
    <section id="projects" className="relative bg-gradient-to-br from-slate-50 via-white to-emerald-50/20 dark:from-slate-950 dark:via-slate-900 dark:to-slate-900 section-offset overflow-hidden">
      {/* Floating decorative elements */}
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-gradient-to-br from-emerald-400/10 to-teal-400/10 rounded-full blur-3xl animate-pulse pointer-events-none" />
      <div className="absolute bottom-12 left-12 w-64 h-64 bg-gradient-to-tr from-cyan-400/10 to-blue-400/10 rounded-full blur-3xl animate-pulse pointer-events-none" style={{ animationDelay: '1s' }} />

      <div className="relative max-w-6xl mx-auto px-6 py-20 md:py-32">
        <SectionHeading
          eyebrow="05 — Case Studies"
          title="Projects"
          sub="Eight Treehouse projects demonstrating front-end fundamentals: responsive layouts, forms, Sass, galleries, games, dashboards, APIs, and modals."
          gradient
        />

        <div className="mt-16 grid md:grid-cols-2 gap-8">
          {visible.map((project, i) => (
            <ProjectCard key={project.name || i} project={project} index={i} />
          ))}
        </div>

        {/* Show more / Show less on mobile */}
        {!isDesktop && projectsData.length > 2 && (
          <div className="mt-12 text-center">
            <button
              onClick={() => (expanded ? collapse() : setExpanded(true))}
              className="inline-flex items-center gap-2 px-6 py-3 text-sm font-medium text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 border-2 border-emerald-600 dark:border-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 transition-all duration-200 rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2"
              aria-label={expanded ? "Show fewer projects" : "Show all projects"}
            >
              {expanded ? "Show Less" : `Show All ${projectsData.length} Projects`}
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
