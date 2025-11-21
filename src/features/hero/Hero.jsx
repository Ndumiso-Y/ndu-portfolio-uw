import React, { useEffect, useState } from "react"

export default function Hero() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 200)
    return () => clearTimeout(timer)
  }, [])

  const handleGetInTouch = () => {
    const contactSection = document.getElementById('contact')
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const handleViewWork = () => {
    const projectsSection = document.querySelector('[id*="project"]') || document.querySelector('[id*="website"]')
    if (projectsSection) {
      projectsSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const services = [
    {
      icon: (
        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
        </svg>
      ),
      title: "WEB DESIGN & DEVELOPMENT",
      description: "I design and build fast, modern websites that look sharp and convert visitors into clients."
    },
    {
      icon: (
        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
        </svg>
      ),
      title: "BRANDING & GRAPHICS",
      description: "Logos, marketing visuals, and digital assets that keep your brand consistent and memorable."
    },
    {
      icon: (
        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
      ),
      title: "SOCIAL & DIGITAL CONTENT",
      description: "Social media visuals and simple campaigns that keep your audience engaged and informed."
    }
  ]

  return (
    <section
      id="hero"
      className="relative min-h-screen bg-[#0a0a0a] overflow-hidden flex items-center"
      aria-label="Hero section"
    >
      {/* Teal radial glow behind portrait */}
      <div
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at 55% 60%, rgba(65,179,188,0.3) 0%, transparent 50%)'
        }}
        aria-hidden="true"
      />

      {/* Subtle grid texture */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)',
          backgroundSize: '60px 60px'
        }}
        aria-hidden="true"
      />

      {/* Main container */}
      <div className="relative w-full max-w-[1280px] mx-auto px-6 md:px-12 py-20 lg:py-0">

        {/* Desktop: 3-column grid | Mobile: single column */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">

          {/* LEFT COLUMN - Main message */}
          <div className="lg:col-span-4 space-y-6 z-20">
            <div
              className={`transform transition-all duration-700 ease-out ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              {/* Status pill */}
              <div className="inline-flex items-center px-4 py-1.5 text-xs tracking-[0.08em] uppercase rounded-full border border-white/10 bg-white/5 text-white/70 mb-6">
                Available for freelance
              </div>

              {/* Primary heading */}
              <h1 className="text-6xl md:text-7xl lg:text-7xl xl:text-8xl font-bold text-white leading-[0.95] tracking-tight mb-6">
                <span className="block">NDUMISO</span>
                <span className="block mt-1">YEDWA</span>
                <span className="block text-[#41b3bc] text-sm mt-4">VERSION 2.0 LOADED</span>
              </h1>

              {/* Role */}
              <h2 className="text-lg md:text-xl font-medium text-white/70 mb-4">
                Web Designer & Front-End Developer
              </h2>

              {/* Body copy */}
              <p className="text-sm md:text-base text-white/60 leading-relaxed max-w-[40ch] mb-8">
                Founder of Embark Digitals — building fast, modern websites, branding, and digital assets.
              </p>

              {/* CTAs */}
              <div className="flex flex-wrap gap-4 mb-10">
                <button
                  onClick={handleGetInTouch}
                  className="inline-flex items-center gap-3 px-8 py-4 rounded-md bg-[#41b3bc] text-white font-semibold text-sm tracking-wide hover:bg-[#34919a] transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#41b3bc] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0a]"
                  aria-label="Get in touch"
                >
                  Get in Touch
                </button>
                <button
                  onClick={handleViewWork}
                  className="group inline-flex items-center gap-2 px-8 py-4 rounded-md border border-white/20 text-white font-medium text-sm tracking-wide hover:border-[#41b3bc] hover:text-[#41b3bc] transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
                  aria-label="View work"
                >
                  View Work
                  <svg
                    className="w-4 h-4 transform transition-transform duration-300 group-hover:translate-x-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </button>
              </div>

              {/* Stats row */}
              <div className="flex gap-10">
                <div>
                  <div className="text-4xl md:text-5xl font-bold text-[#41b3bc] leading-none">98%</div>
                  <div className="text-xs md:text-sm text-white/60 mt-2">Satisfaction Rate</div>
                </div>
                <div>
                  <div className="text-4xl md:text-5xl font-bold text-[#41b3bc] leading-none">10+</div>
                  <div className="text-xs md:text-sm text-white/60 mt-2">Projects Delivered</div>
                </div>
              </div>
            </div>
          </div>

          {/* MIDDLE COLUMN - Portrait (desktop center, mobile after services) */}
          <div className="lg:col-span-4 relative flex items-end justify-center order-3 lg:order-2 z-10">
            <div
              className={`relative transform transition-all duration-1000 ease-out ${
                isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
              }`}
              style={{ transitionDelay: '300ms' }}
            >
              <img
                src="/assets/NdumisoNobackground.png"
                alt="Ndumiso Yedwa - Founder of Embark Digitals"
                className="h-[60vh] md:h-[70vh] lg:h-[85vh] w-auto object-contain object-bottom"
                style={{
                  filter: 'drop-shadow(0 40px 80px rgba(0,0,0,0.7))'
                }}
                loading="eager"
              />
            </div>
          </div>

          {/* RIGHT COLUMN - Service pillars */}
          <div className="lg:col-span-4 space-y-8 order-2 lg:order-3 z-20">
            {services.map((service, index) => (
              <div
                key={index}
                className={`transform transition-all duration-700 ease-out ${
                  isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
                }`}
                style={{ transitionDelay: `${400 + index * 150}ms` }}
              >
                {/* Icon box */}
                <div className="w-12 h-12 flex items-center justify-center rounded-lg border border-white/10 bg-white/5 text-[#41b3bc] mb-4">
                  {service.icon}
                </div>
                {/* Title */}
                <h3 className="text-[#41b3bc] font-bold text-sm md:text-base uppercase tracking-wider mb-3">
                  {service.title}
                </h3>
                {/* Description */}
                <p className="text-white/60 text-xs md:text-sm leading-relaxed max-w-[36ch]">
                  {service.description}
                </p>
              </div>
            ))}
          </div>

        </div>

        {/* QR Connect Card - bottom right on desktop, below photo on mobile */}
        <div
          className={`absolute bottom-8 right-8 md:bottom-12 md:right-12 lg:bottom-16 lg:right-16 hidden lg:block z-30 transform transition-all duration-1000 ease-out ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
          style={{ transitionDelay: '800ms' }}
        >
          <div className="bg-white/95 backdrop-blur-md border border-white/20 shadow-[0_20px_60px_rgba(0,0,0,0.4)] p-6">
            <p className="text-center text-xs uppercase tracking-[0.25em] text-slate-500 font-medium mb-4">
              SCAN ME
            </p>
            <div className="w-36 h-36 bg-white">
              <img
                src="/assets/QRcodeBusiness.jpg"
                alt="QR Code - Connect with Ndumiso"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
          </div>
        </div>

        {/* QR card for mobile - below everything */}
        <div className="lg:hidden flex justify-center mt-12">
          <div className="bg-white/95 backdrop-blur-md border border-white/20 shadow-[0_20px_60px_rgba(0,0,0,0.4)] p-6">
            <p className="text-center text-xs uppercase tracking-[0.25em] text-slate-500 font-medium mb-4">
              SCAN ME
            </p>
            <div className="w-36 h-36 bg-white">
              <img
                src="/assets/QRcodeBusiness.jpg"
                alt="QR Code - Connect with Ndumiso"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
          </div>
        </div>

        {/* Scroll prompt */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden lg:flex flex-col items-center gap-2 text-white/40 text-xs uppercase tracking-wider">
          <span>Scroll to explore</span>
          <svg className="w-5 h-5 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>

      </div>
    </section>
  )
}
