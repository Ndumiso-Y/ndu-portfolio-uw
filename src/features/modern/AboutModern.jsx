import React, { useState } from 'react'
import aboutData from '@/content/about.json'
import { content } from '../../content'
import {
  SiHtml5, SiCss3, SiJavascript, SiReact, SiTailwindcss,
  SiCanva, SiAdobephotoshop, SiAdobeillustrator, SiAdobeindesign
} from 'react-icons/si'
import { TbCircleLetterC } from 'react-icons/tb'
import { AiFillHeart } from 'react-icons/ai'

function getSkillIcon(label) {
  const n = label.trim().toLowerCase()
  if (n === 'html' || n === 'html5') return { Icon: SiHtml5, color: '#E34F26' }
  if (n === 'css' || n === 'css3') return { Icon: SiCss3, color: '#1572B6' }
  if (n === 'javascript' || n === 'js') return { Icon: SiJavascript, color: '#F7DF1E' }
  if (n === 'react') return { Icon: SiReact, color: '#61DAFB' }
  if (n === 'tailwind' || n === 'tailwind css') return { Icon: SiTailwindcss, color: '#38BDF8' }
  if (n === 'canva') return { Icon: SiCanva, color: '#00C4CC' }
  if (n === 'adobe photoshop' || n === 'photoshop' || n === 'ps')
    return { Icon: SiAdobephotoshop, color: '#31A8FF' }
  if (n === 'adobe illustrator' || n === 'illustrator' || n === 'ai')
    return { Icon: SiAdobeillustrator, color: '#FF9A00' }
  if (n === 'adobe indesign' || n === 'indesign' || n === 'id')
    return { Icon: SiAdobeindesign, color: '#FF3366' }
  if (n === 'claude' || n === 'claude.ai' || n === 'claude code' || n === 'anthropic')
    return { Icon: TbCircleLetterC, color: '#41b3bc' }
  if (n === 'lovable' || n === 'loveable') return { Icon: AiFillHeart, color: '#EC4899' }
  return { Icon: null, color: '#41b3bc' }
}

export default function AboutModern() {
  const items = Array.isArray(content?.badges) ? content.badges : []
  const [modal, setModal] = useState({ open:false, idx:-1, mode:null, scale:1 })

  const openSnippet = (idx)=>setModal({ open:true, idx, mode:"snippet", scale:1 })
  const openZoom    = (idx)=>setModal({ open:true, idx, mode:"zoom",    scale:1 })
  const close       = ()=>setModal({ open:false, idx:-1, mode:null, scale:1 })
  const zoomIn = ()=>setModal(m=>({ ...m, scale: Math.min(3, +(m.scale+0.25).toFixed(2)) }))
  const zoomOut= ()=>setModal(m=>({ ...m, scale: Math.max(1, +(m.scale-0.25).toFixed(2)) }))
  const zoomReset=()=>setModal(m=>({ ...m, scale:1 }))

  const brand = content?.brandColor || "#41b3bc"

  return (
    <section
      id="about"
      className="relative py-24 px-6 md:px-12"
      style={{ background: 'linear-gradient(to bottom, #050505, #0a0a0a)' }}
    >
      <div className="max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* LEFT: Portrait (40%) */}
          <div className="lg:col-span-5">
            <div className="relative reveal-up">
              {/* Main portrait */}
              <div className="relative w-full max-w-md mx-auto">
                <div className="aspect-[3/4] rounded-3xl overflow-hidden bg-gradient-to-br from-[#41b3bc]/20 to-transparent p-1">
                  <img
                    src="/assets/Ndu_Blue Background.png"
                    alt={aboutData.name}
                    className="w-full h-full object-cover rounded-3xl"
                    style={{
                      filter: 'grayscale(20%) contrast(1.1)',
                    }}
                  />
                </div>

                {/* Floating badge */}
                <div className="absolute -bottom-6 -right-6 glass p-4 rounded-2xl">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-[#41b3bc] flex items-center justify-center">
                      <span className="text-2xl font-bold text-black">5+</span>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-white">Years</p>
                      <p className="text-xs text-text-secondary">Experience</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT: Content (60%) */}
          <div className="lg:col-span-7 space-y-8">
            {/* Badge */}
            <span className="inline-block px-4 py-2 glass rounded-full text-sm text-[#41b3bc] font-medium reveal-up">
              About Me
            </span>

            {/* Title */}
            <h2 className="text-title text-white reveal-up stagger-1">
              Building Digital Experiences That{' '}
              <span className="text-[#41b3bc]">Matter</span>
            </h2>

            {/* Bio */}
            <div className="space-y-4 text-lg text-text-secondary leading-relaxed reveal-up stagger-2">
              <p>{aboutData.lead}</p>
            </div>

            {/* Bullet points */}
            <ul className="space-y-3 reveal-up stagger-3">
              {aboutData.bullets.map((bullet, i) => (
                <li key={i} className="flex items-start gap-3">
                  <svg
                    className="w-6 h-6 text-[#41b3bc] flex-shrink-0 mt-0.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span className="text-text-secondary">{bullet}</span>
                </li>
              ))}
            </ul>

            {/* CTA */}
            <div className="flex flex-wrap gap-4 pt-4 reveal-up stagger-4">
              <a
                href="#contact"
                className="px-8 py-4 bg-[#41b3bc] hover:bg-[#34919a] rounded-full font-semibold text-sm text-white transition-all duration-300 hover:scale-105"
              >
                Let's Work Together
              </a>
              <button className="px-8 py-4 glass hover:bg-glass-hover rounded-full font-semibold text-sm text-white transition-all duration-300">
                Download Resume
              </button>
            </div>
          </div>
        </div>

        {/* Skills & Tools Section */}
        <div className="mt-24 pt-16 border-t border-glass-border">
          <div className="mb-12">
            <span className="inline-block px-4 py-2 glass rounded-full text-sm text-[#41b3bc] font-medium mb-6">
              Skills & Tools
            </span>
            <h3 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Technical <span className="text-[#41b3bc]">Expertise</span>
            </h3>
            <p className="text-lg text-text-secondary max-w-2xl">
              Proficient in modern development tools and design platforms
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {aboutData.skills.map((skill, i) => {
              const skillName = typeof skill === 'string' ? skill : skill.name
              const description = typeof skill === 'string' ? null : skill.description
              const { Icon, color } = getSkillIcon(skillName)

              return (
                <div
                  key={i}
                  className="reveal-up group"
                  style={{ animationDelay: `${i * 0.05}s` }}
                >
                  <div className="card-modern p-6 flex flex-col items-center gap-4 text-center hover:scale-105 transition-transform duration-300 accent-glow">
                    {Icon && (
                      <div
                        className="w-12 h-12 flex items-center justify-center rounded-xl transition-all duration-300 group-hover:scale-110"
                        style={{ backgroundColor: `${color}20` }}
                      >
                        <Icon className="w-7 h-7" style={{ color }} />
                      </div>
                    )}

                    <div>
                      <h3 className="text-sm font-semibold text-white mb-1">{skillName}</h3>
                      {description && (
                        <p className="text-xs text-text-tertiary line-clamp-2">{description}</p>
                      )}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Badges & Recognition Section */}
        {items.length > 0 && (
          <div className="mt-24 pt-16 border-t border-glass-border">
            <div className="mb-12">
              <span className="inline-block px-4 py-2 glass rounded-full text-sm text-[#41b3bc] font-medium mb-6">
                Achievements
              </span>
              <h3 className="text-4xl md:text-5xl font-bold text-white mb-4">
                Badges & <span className="text-[#41b3bc]">Recognition</span>
              </h3>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {items.map((b, i) => {
                const isSnippet = !!b.snippetImg || !!b.snippet
                const isZoom = !!b.zoom
                const onCardClick = isSnippet ? ()=>openSnippet(i) : isZoom ? ()=>openZoom(i) : undefined
                const aspectClass = b.aspect === "4/3" ? "aspect-[4/3]" : "aspect-[16/9]"

                return (
                  <article
                    key={b.name || i}
                    className={`group card-modern overflow-hidden transition-all duration-500 ${onCardClick ? "cursor-zoom-in" : ""}`}
                    onClick={onCardClick}
                  >
                    <div className={`w-full ${aspectClass} bg-slate-50 overflow-hidden relative`}>
                      <img
                        src={b.img}
                        alt={b.name || "Badge"}
                        className="w-full h-full object-cover group-hover:scale-105 transition-all duration-700"
                        loading="lazy"
                        decoding="async"
                      />
                      <div className="absolute inset-0 bg-[#41b3bc]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    </div>
                    <div className="p-6 border-t-4 border-[#41b3bc]">
                      <h4 className="text-sm font-semibold text-white">{b.name || "—"}</h4>
                      {b.note && <p className="mt-3 text-xs text-text-secondary leading-relaxed">{b.note}</p>}
                      <div className="mt-4 flex flex-wrap gap-4 text-[10px] uppercase tracking-wider font-semibold">
                        {b.url && <a className="text-[#41b3bc] hover:translate-x-1 transition-all" href={b.url} target="_blank" rel="noreferrer" onClick={(e)=>e.stopPropagation()}>Visit site →</a>}
                        {b.post && <a className="text-[#41b3bc] hover:translate-x-1 transition-all" href={b.post} target="_blank" rel="noreferrer" onClick={(e)=>e.stopPropagation()}>LinkedIn →</a>}
                        {isSnippet && <button className="text-[#41b3bc] hover:translate-x-1 transition-all" onClick={(e)=>{e.stopPropagation(); openSnippet(i);}}>Letter →</button>}
                        {isZoom && <button className="text-[#41b3bc] hover:translate-x-1 transition-all" onClick={(e)=>{e.stopPropagation(); openZoom(i);}}>Zoom →</button>}
                      </div>
                    </div>
                  </article>
                )
              })}
            </div>
          </div>
        )}
      </div>

      {/* Modal */}
      {modal.open && items[modal.idx] && (
        <div className="fixed inset-0 z-50 bg-black/70 p-4 grid place-items-center" onClick={close} role="dialog" aria-modal="true">
          <div className="max-w-3xl w-full rounded-xl glass p-5 relative" onClick={(e)=>e.stopPropagation()}>
            <button onClick={close} className="absolute top-3 right-3 rounded-full glass px-2 py-1 text-sm text-white">✕</button>
            <h3 className="text-lg font-semibold text-white">{items[modal.idx].name}</h3>

            {modal.mode === "snippet" && (
              <>
                {items[modal.idx].snippet && <p className="mt-3 text-sm text-text-secondary whitespace-pre-line">{items[modal.idx].snippet}</p>}
                {items[modal.idx].snippetImg && (
                  <>
                    <div className="mt-3 border border-glass-border rounded-xl overflow-auto bg-bg-secondary">
                      <div className="w-full grid place-items-center" style={{ minHeight: 320 }}>
                        <img src={items[modal.idx].snippetImg} alt="Acceptance letter snippet"
                          onContextMenu={(e)=>e.preventDefault()}
                          style={{ transform:`scale(${modal.scale})`, transformOrigin:"center center", transition:"transform 120ms ease" }}
                          className="max-w-full max-h-[70vh] object-contain" />
                      </div>
                    </div>
                    <div className="mt-4 flex flex-wrap items-center gap-3">
                      <button onClick={zoomOut} className="px-3 py-1.5 rounded-full glass hover:bg-glass-hover text-sm text-white">− Zoom out</button>
                      <button onClick={zoomIn} className="px-3 py-1.5 rounded-full glass hover:bg-glass-hover text-sm text-white">+ Zoom in</button>
                      <button onClick={zoomReset} className="px-3 py-1.5 rounded-full glass hover:bg-glass-hover text-sm text-white">Reset</button>
                    </div>
                  </>
                )}
              </>
            )}

            {modal.mode === "zoom" && (
              <>
                <div className="mt-3 border border-glass-border rounded-xl overflow-auto bg-bg-secondary">
                  <div className="w-full grid place-items-center" style={{ minHeight: 360 }}>
                    <img
                      src={items[modal.idx].modalImg || items[modal.idx].img}
                      alt={items[modal.idx].name}
                      onContextMenu={(e)=>e.preventDefault()}
                      style={{ transform:`scale(${modal.scale})`, transformOrigin:"center center", transition:"transform 120ms ease" }}
                      className="max-w-full max-h-[70vh] object-contain"
                    />
                  </div>
                </div>
                <div className="mt-4 flex flex-wrap items-center gap-3">
                  <button onClick={zoomOut} className="px-3 py-1.5 rounded-full glass hover:bg-glass-hover text-sm text-white">− Zoom out</button>
                  <button onClick={zoomIn} className="px-3 py-1.5 rounded-full glass hover:bg-glass-hover text-sm text-white">+ Zoom in</button>
                  <button onClick={zoomReset} className="px-3 py-1.5 rounded-full glass hover:bg-glass-hover text-sm text-white">Reset</button>
                  {items[modal.idx].post && (
                    <a href={items[modal.idx].post} target="_blank" rel="noreferrer" className="ml-auto px-3 py-1.5 rounded-full bg-[#41b3bc] text-white hover:bg-[#34919a] text-sm">See LinkedIn post</a>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </section>
  )
}
