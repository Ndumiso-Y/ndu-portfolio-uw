// Modern Portfolio Layout
import React from 'react'
import FloatingNav from './components/modern/FloatingNav'
import HeroModern from './features/modern/HeroModern'
import AboutModern from './features/modern/AboutModern'
import WorkShowcase from './features/modern/WorkShowcase'
import LogoShowCase from './components/LogoShowCase'
import SocialMgmt from './components/SocialMgmt'
import ProjectCarousel from './features/modern/ProjectCarousel'
import Contact from './components/Contact'

export default function AppModern() {
  return (
    <div className="min-h-screen" style={{ background: '#0a0a0a' }}>
      <FloatingNav />
      <main>
        <HeroModern />
        <AboutModern />
        <WorkShowcase />
        <LogoShowCase />
        <SocialMgmt />
        <ProjectCarousel />
        <Contact />
      </main>

      {/* Simple footer */}
      <footer className="py-8 px-6 text-center border-t border-glass-border bg-white">
        <p className="text-sm text-slate-600">
          © {new Date().getFullYear()} Ndumiso Yedwa. Built with React & Tailwind CSS.
        </p>
      </footer>
    </div>
  )
}
