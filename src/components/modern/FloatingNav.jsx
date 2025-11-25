import React, { useState, useEffect } from 'react'
import { content } from '../../content'
import { withBase } from '../../lib/withBase'
import { trackNavClick } from '../../lib/analytics'

const navLinks = [
  { href: '#about', label: 'About', section: 'about' },
  { href: '#websites', label: 'Websites', section: 'websites' },
  { href: '#graphics', label: 'Graphics', section: 'graphics' },
  { href: '#social', label: 'Social', section: 'social' },
  { href: '#projects', label: 'Projects', section: 'projects' },
  { href: '#contact', label: 'Contact', section: 'contact' },
]

export default function FloatingNav() {
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('hero')
  const [darkMode, setDarkMode] = useState(true)

  const icon = content?.contact?.icon ? withBase(content.contact.icon) : null

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)

      // Detect active section
      const sections = document.querySelectorAll('section[id]')
      sections.forEach(section => {
        const rect = section.getBoundingClientRect()
        if (rect.top <= 100 && rect.bottom >= 100) {
          setActiveSection(section.id)
        }
      })
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
    document.documentElement.classList.toggle('light-mode')
  }

  return (
    <nav
      className={`fixed top-6 left-1/2 -translate-x-1/2 z-50 transition-all duration-500 ${
        scrolled ? 'top-4' : 'top-6'
      }`}
    >
      <div className="glass rounded-full px-6 py-3 flex items-center gap-8">
        {/* Logo with icon */}
        <a
          href="#hero"
          className="flex items-center gap-2 text-sm font-bold tracking-tight text-white hover:text-[#41b3bc] transition-colors"
        >
          {icon ? (
            <img src={icon} alt="NY" className="w-6 h-6 rounded-lg object-contain bg-white p-1" />
          ) : (
            <span>NY</span>
          )}
        </a>

        {/* Nav Links */}
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map(link => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => trackNavClick(link.section)}
              className={`text-sm font-medium transition-colors relative group ${
                activeSection === link.href.slice(1)
                  ? 'text-[#41b3bc]'
                  : 'text-text-secondary hover:text-white'
              }`}
            >
              {link.label}
              {/* Active indicator */}
              {activeSection === link.href.slice(1) && (
                <span className="absolute -bottom-1 left-0 right-0 h-px bg-[#41b3bc]" />
              )}
            </a>
          ))}
        </div>
      </div>
    </nav>
  )
}
