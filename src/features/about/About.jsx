import React, { useState, useEffect } from "react"
import aboutData from "@/content/about.json"
import {
  SiHtml5, SiCss3, SiJavascript, SiReact, SiTailwindcss,
  SiCanva, SiAdobephotoshop, SiAdobeillustrator, SiAdobeindesign
} from "react-icons/si"
import { TbCircleLetterC } from "react-icons/tb"
import { AiFillHeart } from "react-icons/ai"
import Button from "@/components/ui/Button"

// Map skill labels to icon + brand colors
function getSkillSpec(label = "") {
  const n = label.trim().toLowerCase()
  const spec = (C, bg, txt = "#fff") => ({ C, bg, txt })

  // Core web
  if (n === "html" || n === "html5") return spec(SiHtml5, "#E34F26")
  if (n === "css" || n === "css3") return spec(SiCss3, "#1572B6")
  if (n === "javascript" || n === "js") return spec(SiJavascript, "#F7DF1E", "#000")
  if (n === "react") return spec(SiReact, "#61DAFB", "#000")
  if (n === "tailwind" || n === "tailwind css") return spec(SiTailwindcss, "#38BDF8", "#000")

  // Design apps
  if (n === "canva") return spec(SiCanva, "#00C4CC")
  if (n === "adobe photoshop" || n === "photoshop" || n === "ps")
    return spec(SiAdobephotoshop, "#31A8FF")
  if (n === "adobe illustrator" || n === "illustrator" || n === "ai")
    return spec(SiAdobeillustrator, "#FF9A00")
  if (n === "adobe indesign" || n === "indesign" || n === "id")
    return spec(SiAdobeindesign, "#FF3366")

  // Extras
  if (n === "claude" || n === "claude.ai" || n === "claude code" || n === "anthropic")
    return spec(TbCircleLetterC, "#101010")
  if (n === "lovable" || n === "loveable") return spec(AiFillHeart, "#EC4899")

  return spec(null, "#0f172a")
}

function SkillPill({ skill, onMobileToggle, showMobileDescription, isMobile }) {
  const skillName = typeof skill === 'string' ? skill : skill.name
  const description = typeof skill === 'string' ? null : skill.description
  const { C, bg } = getSkillSpec(skillName)

  if (isMobile) {
    return (
      <div className="flex flex-col">
        <button
          onClick={() => onMobileToggle(skillName)}
          className="flex flex-col items-center justify-center gap-2 px-3 py-4 border border-slate-200/50 hover:border-slate-300 text-xs transition-all duration-300 aspect-square focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
          style={{ backgroundColor: 'transparent' }}
          aria-label={`${skillName} - Tap to learn more`}
          aria-expanded={showMobileDescription}
        >
          {C ? <C className="w-6 h-6" style={{ color: bg }} aria-hidden="true" /> : null}
          <span className="font-normal text-[10px] text-slate-600 text-center leading-tight">{skillName}</span>
        </button>

        {showMobileDescription && description && (
          <div className="mt-2 px-3 py-2 bg-white border border-slate-200 text-[10px] text-slate-600 font-light animate-fade-in-up">
            {description}
          </div>
        )}
      </div>
    )
  }

  // Desktop - Enhanced pill with pop animation
  return (
    <div className="relative group">
      <button
        className="relative w-full flex flex-col items-center justify-center gap-3 px-4 py-4 bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 rounded-xl transition-all duration-300 hover:border-emerald-500 dark:hover:border-emerald-400 hover:scale-110 hover:shadow-lg hover:shadow-emerald-500/20 hover:-rotate-2 cursor-help aspect-square"
        aria-label={`${skillName}: ${description || 'Technical skill'}`}
        tabIndex="0"
      >
        {C ? <C className="w-8 h-8 transition-all duration-300 group-hover:scale-125" style={{ color: bg }} aria-hidden="true" /> : null}
        <span className="font-medium text-xs text-slate-700 dark:text-slate-300 text-center leading-tight">{skillName}</span>

        {/* Glow effect */}
        <div className="absolute inset-0 rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" style={{ backgroundColor: `${bg}20` }} />
      </button>

      {/* Enhanced tooltip */}
      {description && (
        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-3 px-4 py-2 bg-slate-900 dark:bg-slate-800 text-white text-xs font-normal rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none whitespace-nowrap z-20 shadow-xl" role="tooltip">
          {description}
          {/* Tooltip arrow */}
          <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-slate-900 dark:border-t-slate-800" />
        </div>
      )}
    </div>
  )
}

export default function About() {
  const [expandedSkill, setExpandedSkill] = useState(null)
  const [isMobile, setIsMobile] = useState(false)

  // Detect mobile on mount and resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const handleMobileToggle = (skillName) => {
    setExpandedSkill(expandedSkill === skillName ? null : skillName)
  }

  const scrollToProjects = () => {
    const projectsSection = document.getElementById('projects')
    if (projectsSection) {
      projectsSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const scrollToContact = () => {
    const contactSection = document.getElementById('contact')
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section id="about" className="relative bg-white section-offset overflow-hidden">
      {/* Minimal accent line */}
      <div className="absolute top-0 left-0 w-px h-32 bg-gradient-to-b from-emerald-600/40 to-transparent" aria-hidden="true" />

      <div className="relative max-w-6xl mx-auto px-6 py-20 md:py-32">
        {/* Heading */}
        <header className="max-w-4xl">
          <div className="text-xs uppercase tracking-[0.25em] text-slate-400 font-normal mb-8">
            01 — Introduction
          </div>
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold text-slate-900 dark:text-slate-100 leading-[1.1] tracking-tight mb-6">
            About
          </h2>
          <p className="text-base md:text-lg text-slate-600 dark:text-slate-300 font-normal max-w-2xl">
            {aboutData.title}
          </p>

          <div className="mt-8">
            <span className="text-lg md:text-xl text-slate-900 dark:text-slate-100 font-medium">
              {aboutData.name}
            </span>
          </div>
        </header>

        {/* Bio */}
        <div className="mt-16 space-y-4">
          <p className="text-sm md:text-base text-slate-700 dark:text-slate-300 max-w-2xl leading-relaxed">
            {aboutData.lead}
          </p>

          {/* Bullet points */}
          {aboutData.bullets && (
            <ul className="mt-6 space-y-3 max-w-2xl">
              {aboutData.bullets.map((bullet, i) => (
                <li key={i} className="flex gap-3 text-sm md:text-base text-slate-700 dark:text-slate-300">
                  <span className="text-emerald-600 dark:text-emerald-400 mt-1.5 flex-shrink-0">•</span>
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* CTAs */}
        <div className="mt-10 flex flex-wrap gap-4">
          <Button onClick={scrollToProjects} icon aria-label="View my work">
            {aboutData.ctaPrimary}
          </Button>
          <Button variant="outline" onClick={scrollToContact} aria-label="Start a project">
            {aboutData.ctaSecondary}
          </Button>
        </div>

        {/* Minimal divider */}
        <div className="relative mt-20 mb-16">
          <div className="w-full h-px bg-slate-200 dark:bg-slate-800" />
        </div>

        {/* Skills — minimalist grid */}
        {Array.isArray(aboutData.skills) && aboutData.skills.length > 0 && (
          <>
            <div className="flex items-baseline gap-4 mb-10">
              <h3 className="text-xs uppercase tracking-[0.15em] text-slate-500 dark:text-slate-400 font-semibold">
                Technical Skills
              </h3>
              {isMobile && (
                <span className="text-[10px] uppercase tracking-wider text-slate-400 font-normal">
                  Tap to learn more
                </span>
              )}
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 max-w-5xl">
              {aboutData.skills.map((skill, i) => {
                const skillName = typeof skill === 'string' ? skill : skill.name
                return (
                  <SkillPill
                    key={i}
                    skill={skill}
                    onMobileToggle={handleMobileToggle}
                    showMobileDescription={expandedSkill === skillName}
                    isMobile={isMobile}
                  />
                )
              })}
            </div>
          </>
        )}
      </div>
    </section>
  )
}
