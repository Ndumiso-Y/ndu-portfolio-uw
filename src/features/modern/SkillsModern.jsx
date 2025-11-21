import React from 'react'
import aboutData from '@/content/about.json'
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

export default function SkillsModern() {
  return (
    <section
      id="skills"
      className="relative py-24 px-6 md:px-12"
      style={{ background: '#0a0a0a' }}
    >
      <div className="max-w-[1400px] mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2 glass rounded-full text-sm text-[#41b3bc] font-medium mb-6">
            Skills & Tools
          </span>
          <h2 className="text-title text-white mb-4">
            Technical <span className="text-[#41b3bc]">Expertise</span>
          </h2>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto">
            Proficient in modern development tools and design platforms
          </p>
        </div>

        {/* Skills grid */}
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
    </section>
  )
}
