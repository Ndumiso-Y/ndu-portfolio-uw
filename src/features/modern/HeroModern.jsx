import React, { useEffect, useState } from 'react'
import { withBase } from '@/lib/withBase'
import { trackGetInTouchClick, trackViewWorkClick, trackECardClick } from '../../lib/analytics'

export default function HeroModern() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 200)
    return () => clearTimeout(timer)
  }, [])

  const services = [
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      title: "WEB DESIGN & DEVELOPMENT",
      description: "I design and build fast, modern websites that look sharp and convert visitors into clients."
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
        </svg>
      ),
      title: "BRANDING & GRAPHICS",
      description: "Logos, marketing visuals, and digital assets that keep your brand consistent and memorable."
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
      ),
      title: "SOCIAL & DIGITAL CONTENT",
      description: "Social media visuals and simple campaigns that keep your audience engaged and informed."
    }
  ]

  return (
    <section
      id="hero"
      className="relative min-h-screen bg-[#1a1a1a] overflow-hidden"
      aria-label="Hero section"
    >
      {/* Subtle grid texture */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)',
          backgroundSize: '60px 60px'
        }}
        aria-hidden="true"
      />

      {/* Teal radial glow behind portrait */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] opacity-20 pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(65,179,188,0.3) 0%, transparent 70%)',
        }}
        aria-hidden="true"
      />

      {/* Main container */}
      <div className="relative min-h-screen w-full px-6 md:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 min-h-screen gap-0 items-center">

          {/* LEFT COLUMN: Main message */}
          <div className="lg:col-span-4 flex flex-col justify-center z-20 pt-32 pb-12 lg:py-0 lg:pr-10">
            <div
              className={`space-y-5 transform transition-all duration-700 ease-out ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              {/* Status pill */}
              <div className="inline-flex items-center px-5 py-2 text-[11px] tracking-[0.15em] uppercase rounded-full border border-white/10 bg-white/5 text-white/60 w-fit">
                Web Developer
              </div>

              {/* Primary heading - BIGGER */}
              <h1 className="text-7xl md:text-8xl lg:text-[6rem] xl:text-[7rem] font-bold text-white leading-[0.88] tracking-tighter">
                NDUMISO<br />YEDWA
              </h1>

              {/* Role / Subheading - BIGGER */}
              <p className="text-xl md:text-2xl lg:text-2xl text-white/70 font-semibold">
                Web Designer & Front-End Developer
              </p>

              {/* Body copy - limit to 32-36ch */}
              <p className="text-base md:text-lg text-white/60 max-w-[34ch] leading-relaxed">
                Founder of Embark Digitals — building fast, modern websites, branding, and digital assets.
              </p>

              {/* CTA Buttons - BIGGER */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <a
                  href="#contact"
                  onClick={trackGetInTouchClick}
                  className="inline-flex items-center justify-center px-10 py-4 bg-[#41b3bc] text-white font-bold text-sm uppercase tracking-[0.1em] rounded-lg hover:bg-[#4ec5cf] hover:-translate-y-0.5 hover:shadow-lg hover:shadow-[#41b3bc]/20 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#41b3bc] focus-visible:ring-offset-2 focus-visible:ring-offset-[#1a1a1a]"
                >
                  Get in touch
                </a>
                <a
                  href="#websites"
                  onClick={trackViewWorkClick}
                  className="group inline-flex items-center justify-center gap-2 px-10 py-4 border border-[#41b3bc]/40 text-white/90 font-semibold text-sm uppercase tracking-[0.1em] rounded-lg hover:border-[#41b3bc] hover:bg-[#41b3bc]/10 hover:-translate-y-0.5 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
                >
                  View work
                  <svg
                    className="w-4 h-4 transform transition-transform duration-200 group-hover:translate-x-1"
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
                </a>
              </div>

              {/* Bullets - BIGGER */}
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#41b3bc] flex-shrink-0"></div>
                  <div className="text-base text-white/60">Clean UI & brand consistency</div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#41b3bc] flex-shrink-0"></div>
                  <div className="text-base text-white/60">Conversion-focused messaging</div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#41b3bc] flex-shrink-0"></div>
                  <div className="text-base text-white/60">Reliable delivery</div>
                </div>
              </div>

              {/* Scroll prompt */}
              <div className="hidden lg:flex items-center gap-2 text-white/30 text-[10px] uppercase tracking-[0.12em] pt-12 mt-2">
                <span>Scroll to explore</span>
                <svg className="w-4 h-4 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </div>
            </div>
          </div>

          {/* MIDDLE COLUMN: Portrait - 1.5X BIGGER */}
          <div className="lg:col-span-4 relative flex items-end justify-start order-3 lg:order-2 lg:pl-0">
            <div
              className={`relative z-10 flex items-end justify-center transform transition-all duration-1000 ease-out ${
                isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
              }`}
              style={{ transitionDelay: '400ms' }}
            >
              <img
                src={withBase("/assets/NdumisoNobackground.png")}
                alt="Ndumiso Yedwa - Founder of Embark Digitals"
                className="h-[70vh] md:h-[80vh] lg:h-[90vh] xl:h-[95vh] w-auto object-contain object-bottom"
                style={{
                  filter: 'drop-shadow(0 30px 60px rgba(0,0,0,0.5))'
                }}
                loading="eager"
              />
            </div>

          </div>

          {/* RIGHT COLUMN: Service pillars - BIGGER */}
          <div className="lg:col-span-4 flex flex-col justify-center self-center order-2 lg:order-3 z-20 lg:pl-2 lg:pr-0 relative">
            <div
              className={`space-y-8 transform transition-all duration-1000 ease-out ${
                isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
              }`}
              style={{ transitionDelay: '600ms' }}
            >
              {services.map((service, index) => (
                <div
                  key={index}
                  className="group flex gap-4 items-start p-4 rounded-xl border border-white/5 bg-white/[0.02] hover:border-[#41b3bc]/30 hover:bg-white/[0.04] hover:scale-[1.02] hover:shadow-lg hover:shadow-[#41b3bc]/5 transition-all duration-200 cursor-pointer"
                >
                  {/* Icon */}
                  <div className="flex-shrink-0 flex items-center justify-center w-12 h-12 rounded-lg border border-white/10 bg-white/5 text-[#41b3bc] group-hover:border-[#41b3bc]/50 group-hover:bg-[#41b3bc]/10 transition-all duration-200">
                    {service.icon}
                  </div>
                  {/* Content */}
                  <div className="flex-1 space-y-1.5">
                    <h3 className="text-[#41b3bc] font-bold text-xs uppercase tracking-[0.12em] leading-tight">
                      {service.title}
                    </h3>
                    <p className="text-white/60 text-sm leading-relaxed">
                      {service.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* QR Connect card - Desktop - bottom right */}
            <div
              className={`hidden lg:block mt-10 transform transition-all duration-1000 ease-out ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: '800ms' }}
            >
              <div
                onClick={trackECardClick}
                className="bg-white/5 backdrop-blur-sm border border-white/10 p-5 rounded-xl hover:border-[#41b3bc]/50 hover:shadow-xl hover:shadow-[#41b3bc]/10 hover:scale-[1.02] transition-all duration-200 cursor-pointer max-w-[220px]"
              >
                <div className="space-y-2 mb-4">
                  <p className="text-[#41b3bc] font-bold text-sm uppercase tracking-[0.14em]">Connect</p>
                  <p className="text-white/50 text-xs leading-relaxed">Scan to open my e-card and save my contact details.</p>
                </div>
                <div className="bg-white p-2 rounded-lg">
                  <img
                    src="/assets/QRcodeBusiness.jpg"
                    alt="Scan to open Ndumiso's e-card contact details"
                    className="w-28 h-28 rounded"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* QR Connect card - Mobile/Tablet */}
          <div
            className={`lg:hidden flex justify-center order-4 pb-16 mt-10 transform transition-all duration-1000 ease-out ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
            style={{ transitionDelay: '800ms' }}
          >
            <div
              onClick={trackECardClick}
              className="bg-white/5 backdrop-blur-sm border border-white/10 p-5 rounded-xl max-w-sm cursor-pointer"
            >
              <div className="space-y-2 mb-4 text-center">
                <p className="text-[#41b3bc] font-bold text-sm uppercase tracking-[0.14em]">Connect</p>
                <p className="text-white/50 text-xs leading-relaxed">Scan to open my e-card and save my contact details.</p>
              </div>
              <div className="bg-white p-3 rounded-lg flex justify-center">
                <img
                  src="/assets/QRcodeBusiness.jpg"
                  alt="Scan to open Ndumiso's e-card contact details"
                  className="w-32 h-32 rounded"
                />
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
