import React, { useState, useEffect } from 'react'
import { content } from '../../content'
import { withBase } from '../../lib/withBase'

const navLinks = [
  { href: '#about', label: 'About' },
  { href: '#websites', label: 'Websites' },
  { href: '#graphics', label: 'Graphics' },
  { href: '#social', label: 'Social' },
  { href: '#projects', label: 'Projects' },
  { href: '#contact', label: 'Contact' },
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

        {/* Dark mode toggle */}
        <button
          onClick={toggleDarkMode}
          className="ml-2 w-8 h-8 rounded-full glass flex items-center justify-center hover:bg-glass-hover transition-colors"
          aria-label="Theme toggle"
        >
          {darkMode ? (
            <svg
              className="w-4 h-4 text-[#41b3bc]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
              />
            </svg>
          ) : (
            <svg
              className="w-4 h-4 text-[#41b3bc]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
              />
            </svg>
          )}
        </button>
      </div>
    </nav>
  )
}
