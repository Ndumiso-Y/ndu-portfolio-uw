// src/components/Contact.jsx
import React, { useState } from "react";
import { content } from "../content";

// Reusable safe image: falls back to a styled badge if the image can't load
function SafeLogo({ src, alt = "", className = "", fallbackType = "badge" }) {
  const [ok, setOk] = useState(true);

  if (ok && src) {
    return (
      <img
        src={src}
        alt={alt}
        onError={() => setOk(false)}
        className={className}
        loading="lazy"
        decoding="async"
      />
    );
  }

  if (fallbackType === "none") return null;

  

  // Default fallback: a neat "NY" badge so the UI never breaks
  const initials = "NY";
  return (
    <div
      className={`grid place-items-center bg-white text-slate-700 ${className}`}
      aria-label="Logo fallback"
      style={{ border: "1px solid rgba(148,163,184,0.5)", borderRadius: "1rem" }}
    >
      <span className="font-semibold">{initials}</span>
    </div>
  );
}

export default function Contact() {
  const c = content?.contact || {};

  return (
    <section id="contact" className="relative" style={{ background: 'linear-gradient(to bottom, #0a0a0a, #050505)' }}>
      <div className="max-w-6xl mx-auto px-6 py-20 md:py-32">
        <div className="text-xs uppercase tracking-[0.25em] text-text-tertiary font-normal mb-8">
          Contact
        </div>
        <h2 className="text-4xl md:text-6xl font-bold text-white leading-tight tracking-tight mb-16">
          Let's build something great together.
        </h2>

        <div className="flex justify-center">
          {/* Main contact card - minimalist */}
          <article className="relative card-modern p-10 md:p-16 overflow-hidden w-full max-w-3xl">
            {/* Watermark */}
            <SafeLogo
              src={c.icon}
              alt=""
              fallbackType="none"
              className="pointer-events-none select-none absolute -right-10 -bottom-10 w-56 md:w-72 opacity-[0.02]"
            />

            <div className="flex flex-col gap-8">
              {/* Minimalist logo */}
              <div className="relative">
                <div className="w-12 h-12 md:w-14 md:h-14 bg-white rounded-lg p-2 border border-white/10">
                  <SafeLogo
                    src={c.icon}
                    alt="Ndumiso icon"
                    className="w-full h-full object-contain"
                  />
                </div>
              </div>
              <div className="flex-1">
                <p className="text-sm md:text-base text-text-secondary leading-relaxed max-w-md">
                  Open to new projects and collaborations.
                </p>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
