// src/components/Hero.jsx
import React, { useEffect, useState } from "react";
import { withBase } from "../lib/withBase";

export default function Hero() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 200);
    return () => clearTimeout(timer);
  }, []);

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
  ];

  return (
    <section
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
      <div className="relative min-h-screen max-w-[1280px] mx-auto px-6 md:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 min-h-screen gap-8 lg:gap-12 items-center">

          {/* LEFT COLUMN: Main message */}
          <div className="lg:col-span-5 flex flex-col justify-center z-20 pt-32 pb-12 lg:py-0">
            <div
              className={`space-y-6 transform transition-all duration-700 ease-out ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              {/* Status pill */}
              <div className="inline-flex items-center px-4 py-1 text-xs tracking-[0.08em] uppercase rounded-full border border-white/10 bg-white/5 text-white/70 w-fit">
                Available for freelance
              </div>

              {/* Primary heading */}
              <h1 className="text-6xl md:text-7xl lg:text-7xl xl:text-8xl font-bold text-white leading-[0.95] tracking-tight">
                NDUMISO<br />YEDWA
              </h1>

              {/* Role / Subheading */}
              <p className="text-lg md:text-xl text-white/70 font-medium">
                Web Designer & Front-End Developer
              </p>

              {/* Body copy */}
              <p className="text-sm md:text-base text-white/60 max-w-[40ch] leading-relaxed">
                Founder of Embark Digitals — building fast, modern websites, branding, and digital assets.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <a
                  href="#contact"
                  className="inline-flex items-center justify-center px-8 py-4 bg-[#41b3bc] text-white font-semibold text-sm uppercase tracking-wider rounded hover:bg-[#34919a] transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#41b3bc] focus-visible:ring-offset-2 focus-visible:ring-offset-[#1a1a1a]"
                >
                  Get in Touch
                </a>
                <a
                  href="#websites"
                  className="group inline-flex items-center justify-center gap-2 px-8 py-4 border border-white/20 text-white/80 font-medium text-sm uppercase tracking-wider rounded hover:border-[#41b3bc] hover:text-[#41b3bc] transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
                >
                  View Work
                  <svg
                    className="w-4 h-4 transform transition-transform duration-300 group-hover:translate-x-1"
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

              {/* Stats row */}
              <div className="flex gap-12 pt-8">
                <div>
                  <div className="text-4xl md:text-5xl font-bold text-[#41b3bc]">98%</div>
                  <div className="text-sm text-white/60 mt-1">Satisfaction Rate</div>
                </div>
                <div>
                  <div className="text-4xl md:text-5xl font-bold text-[#41b3bc]">10+</div>
                  <div className="text-sm text-white/60 mt-1">Projects Delivered</div>
                </div>
              </div>

              {/* Scroll prompt */}
              <div className="hidden lg:flex items-center gap-2 text-white/40 text-xs uppercase tracking-wider pt-8">
                <span>Scroll to explore</span>
                <svg className="w-4 h-4 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </div>
            </div>
          </div>

          {/* MIDDLE COLUMN: Portrait */}
          <div className="lg:col-span-4 relative flex items-end justify-center order-3 lg:order-2">
            <div
              className={`relative z-10 flex items-end justify-center transform transition-all duration-1000 ease-out ${
                isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
              }`}
              style={{ transitionDelay: '400ms' }}
            >
              <img
                src={withBase("/assets/NdumisoNobackground.png")}
                alt="Ndumiso Yedwa - Founder of Embark Digitals"
                className="h-[60vh] md:h-[70vh] lg:h-[85vh] w-auto object-contain object-bottom"
                style={{
                  filter: 'drop-shadow(0 30px 60px rgba(0,0,0,0.5))'
                }}
                loading="eager"
              />
            </div>

            {/* QR Connect card - Desktop */}
            <div
              className={`hidden lg:block absolute bottom-8 right-0 transform transition-all duration-1000 ease-out ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: '800ms' }}
            >
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 p-4 rounded">
                <p className="text-[#41b3bc] font-bold text-xs uppercase tracking-wider mb-3 text-center">Connect</p>
                <img
                  src="/assets/QRcodeBusiness.jpg"
                  alt="QR Code to connect with Ndumiso"
                  className="w-24 h-24 rounded"
                />
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Service pillars */}
          <div className="lg:col-span-3 flex flex-col justify-center order-2 lg:order-3 z-20">
            <div
              className={`space-y-8 transform transition-all duration-1000 ease-out ${
                isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
              }`}
              style={{ transitionDelay: '600ms' }}
            >
              {services.map((service, index) => (
                <div
                  key={index}
                  className="space-y-2"
                >
                  <div className="flex items-center justify-center w-12 h-12 rounded border border-white/10 bg-white/5 text-[#41b3bc]">
                    {service.icon}
                  </div>
                  <h3 className="text-[#41b3bc] font-bold text-sm uppercase tracking-wider">
                    {service.title}
                  </h3>
                  <p className="text-white/60 text-xs leading-relaxed max-w-[32ch]">
                    {service.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* QR Connect card - Mobile/Tablet */}
          <div
            className={`lg:hidden flex justify-center order-4 pb-12 transform transition-all duration-1000 ease-out ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
            style={{ transitionDelay: '800ms' }}
          >
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 p-4 rounded">
              <p className="text-[#41b3bc] font-bold text-xs uppercase tracking-wider mb-3 text-center">Connect</p>
              <img
                src="/assets/QRcodeBusiness.jpg"
                alt="QR Code to connect with Ndumiso"
                className="w-24 h-24 rounded"
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
