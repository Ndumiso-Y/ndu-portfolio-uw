// src/components/Navbar.jsx
import { withBase } from '../lib/withBase';
import React, { useState, useEffect } from "react";
import { content } from "../content";

const links = [
  { href: "#about",    label: "About" },
  { href: "#websites", label: "Websites" },
  { href: "#graphics", label: "Graphics" },
  { href: "#social",   label: "Social Media Management" }, // must match section id
  { href: "#projects", label: "Projects" },
  { href: "#badges",   label: "Badges & Recognition" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const icon = content?.contact?.icon ? withBase(content.contact.icon) : null;

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`sticky top-0 z-40 transition-all duration-300 ${
      scrolled
        ? 'bg-white/98 backdrop-blur-xl border-b border-slate-200/20'
        : 'bg-white/92 backdrop-blur-lg border-b border-slate-200/10'
    }`}>
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <a href="#home" className="flex items-center gap-3 group">
          <div className={`relative transition-all duration-500 ${scrolled ? 'scale-90' : 'scale-100'}`}>
            <img
              src={icon}
              alt="logo"
              className="w-8 h-8 object-contain transition-all duration-500 group-hover:opacity-80"
            />
          </div>
          <span className="font-medium text-sm uppercase tracking-[0.15em] text-slate-900 group-hover:text-[#48aab7] transition-colors duration-300">
            Ndumiso Yedwa
          </span>
        </a>

        <button
          className="md:hidden px-2 py-2 border-0 hover:opacity-60 transition-opacity duration-300"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          <svg
            className="w-5 h-5 transition-transform duration-300"
            style={{ transform: open ? 'rotate(90deg)' : 'rotate(0deg)' }}
            fill="none"
            stroke="currentColor"
            strokeWidth={1}
            viewBox="0 0 24 24"
          >
            {open ? (
              <path strokeLinecap="square" strokeLinejoin="miter" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="square" strokeLinejoin="miter" d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>

        <div className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="relative text-xs uppercase tracking-[0.12em] text-slate-600 hover:text-slate-900 font-normal transition-colors duration-300 py-1"
            >
              {l.label}
              <span className="absolute bottom-0 left-0 w-0 h-px bg-slate-900 transition-all duration-300 hover:w-full" />
            </a>
          ))}
        </div>
      </div>

      {open && (
        <div className="md:hidden border-t border-slate-200/20 backdrop-blur-xl bg-white/98">
          <div className="flex flex-col px-6 py-6 space-y-3">
            {links.map((l, index) => (
              <a
                key={l.href}
                href={l.href}
                className="py-2 text-xs uppercase tracking-[0.12em] text-slate-600 hover:text-slate-900 font-normal transition-all duration-300 border-b border-slate-200/30 hover:border-slate-900/30"
                onClick={() => setOpen(false)}
                style={{
                  animationDelay: `${index * 50}ms`,
                  animation: 'fade-in-up 0.3s ease-out forwards'
                }}
              >
                {l.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
