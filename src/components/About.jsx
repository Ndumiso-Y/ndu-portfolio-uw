// src/components/About.jsx
import React, { useState, useEffect } from "react";
import { content } from "../content";
import {
  SiHtml5, SiCss3, SiJavascript, SiReact, SiTailwindcss,
  SiCanva, SiAdobephotoshop, SiAdobeillustrator, SiAdobeindesign,
  SiAdobepremierepro
} from "react-icons/si";
import { TbCircleLetterC } from "react-icons/tb"; // Claude
import { AiFillHeart } from "react-icons/ai";     // Lovable
import { HiInformationCircle } from "react-icons/hi2"; // Info icon for mobile

// Map skill labels to icon + brand colors
function getSkillSpec(label = "") {
  const n = label.trim().toLowerCase();
  const spec = (C, bg, txt = "#fff") => ({ C, bg, txt });

  // Core web
  if (n === "html" || n === "html5")               return spec(SiHtml5,          "#E34F26");
  if (n === "css"  || n === "css3")                return spec(SiCss3,           "#1572B6");
  if (n === "javascript" || n === "js")            return spec(SiJavascript,     "#F7DF1E", "#000");
  if (n === "react")                                return spec(SiReact,          "#61DAFB", "#000");
  if (n === "tailwind" || n === "tailwind css")     return spec(SiTailwindcss,    "#38BDF8", "#000");

  // Design apps
  if (n === "canva")                                return spec(SiCanva,          "#00C4CC");
  if (n === "adobe photoshop" || n === "photoshop" || n === "ps")
                                                    return spec(SiAdobephotoshop, "#31A8FF");
  if (n === "adobe illustrator" || n === "illustrator" || n === "ai")
                                                    return spec(SiAdobeillustrator, "#FF9A00");
  if (n === "adobe indesign" || n === "indesign" || n === "id")
                                                    return spec(SiAdobeindesign,  "#FF3366");
  if (n === "premiere pro" || n === "adobe premiere pro" || n === "pr")
                                                    return spec(SiAdobepremierepro, "#9999FF", "#000");

  // Extras
  if (n === "claude" || n === "claude.ai" || n === "claude code" || n === "anthropic")
                                                    return spec(TbCircleLetterC,  "#101010");
  if (n === "lovable" || n === "loveable")          return spec(AiFillHeart,      "#EC4899");

  return spec(null, "#0f172a");
}

function SkillPill({ skill, onMobileToggle, showMobileDescription, isMobile }) {
  const skillName = typeof skill === 'string' ? skill : skill.name;
  const description = typeof skill === 'string' ? null : skill.description;
  const { C, bg, txt } = getSkillSpec(skillName);

  if (isMobile) {
    return (
      <div className="flex flex-col">
        <button
          onClick={() => onMobileToggle(skillName)}
          className="flex flex-col items-center justify-center gap-2 px-3 py-4 border border-slate-200/50 hover:border-slate-300 text-xs transition-all duration-300 aspect-square"
          style={{ backgroundColor: 'transparent' }}
        >
          {C ? <C className="w-6 h-6" style={{ color: bg }} /> : null}
          <span className="font-normal text-[10px] text-slate-600 text-center leading-tight">{skillName}</span>
        </button>

        {showMobileDescription && description && (
          <div className="mt-2 px-3 py-2 bg-white border border-slate-200 text-[10px] text-slate-600 font-light animate-fade-in-up">
            {description}
          </div>
        )}
      </div>
    );
  }

  // Desktop - minimalist card
  return (
    <div className="relative group">
      <div
        className="flex flex-col items-center justify-center gap-2 px-3 py-4 border border-slate-200/50 hover:border-[#48aab7]/30 cursor-help transition-all duration-300 aspect-square"
        style={{ backgroundColor: 'transparent' }}
      >
        {C ? <C className="w-6 h-6 opacity-80 group-hover:opacity-100 transition-opacity" style={{ color: bg }} /> : null}
        <span className="font-normal text-[10px] text-slate-600 text-center leading-tight">{skillName}</span>
      </div>

      {/* Minimalist tooltip */}
      {description && (
        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-slate-900 text-white text-[10px] font-normal opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap z-20">
          {description}
        </div>
      )}
    </div>
  );
}

export default function About() {
  const a = content.about || {};
  const brand = content.brandColor || "#48aab7";
  const [expandedSkill, setExpandedSkill] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile on mount and resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleMobileToggle = (skillName) => {
    setExpandedSkill(expandedSkill === skillName ? null : skillName);
  };

  return (
    <section id="about" className="relative bg-white section-offset overflow-hidden">
      {/* Minimal accent line */}
      <div className="absolute top-0 left-0 w-px h-32 bg-gradient-to-b from-[#48aab7]/40 to-transparent" aria-hidden="true" />

      <div className="relative max-w-6xl mx-auto px-6 py-20 md:py-32">
        {/* Heading */}
        <div className="max-w-4xl">
          <div className="text-xs uppercase tracking-[0.25em] text-slate-400 font-normal mb-8">
            01 — Introduction
          </div>
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold text-slate-900 leading-[1.1] tracking-tight mb-6">
            About
          </h2>
          {a.title && (
            <p className="text-base md:text-lg text-slate-600 font-normal max-w-2xl">
              {a.title}
            </p>
          )}

          {a.name && (
            <div className="mt-8">
              <span className="text-lg md:text-xl text-slate-900 font-medium">
                {a.name}
              </span>
            </div>
          )}
        </div>

        {/* Bio */}
        {a.bio && (
          <p className="mt-16 text-sm md:text-base text-slate-700 max-w-2xl leading-relaxed">
            {a.bio}
          </p>
        )}

        {/* Stats */}
        {(a.stats?.years || a.stats?.activeClients) && (
          <div className="mt-16 flex flex-wrap gap-12 text-slate-900">
            {a.stats?.years && (
              <div className="inline-flex flex-col gap-2">
                <span className="text-5xl md:text-6xl font-bold tracking-tight">
                  {a.stats.years}+
                </span>
                <span className="text-xs uppercase tracking-[0.15em] text-slate-500 font-medium">
                  Years Coding
                </span>
              </div>
            )}
            {a.stats?.activeClients && (
              <div className="inline-flex flex-col gap-2">
                <span className="text-5xl md:text-6xl font-bold tracking-tight">
                  {a.stats.activeClients}
                </span>
                <span className="text-xs uppercase tracking-[0.15em] text-slate-500 font-medium">
                  Active Clients
                </span>
              </div>
            )}
          </div>
        )}

        {/* Minimal divider */}
        <div className="relative mt-20 mb-16">
          <div className="w-full h-px bg-slate-200" />
        </div>

        {/* Skills — minimalist grid */}
        {Array.isArray(a.skills) && a.skills.length > 0 && (
          <>
            <div className="flex items-baseline gap-4 mb-10">
              <h3 className="text-xs uppercase tracking-[0.15em] text-slate-500 font-semibold">
                Technical Skills
              </h3>
              {isMobile && (
                <span className="text-[10px] uppercase tracking-wider text-slate-400 font-normal">
                  Tap to learn more
                </span>
              )}
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 max-w-5xl">
              {a.skills.map((skill, i) => {
                const skillName = typeof skill === 'string' ? skill : skill.name;
                return (
                  <SkillPill
                    key={i}
                    skill={skill}
                    onMobileToggle={handleMobileToggle}
                    showMobileDescription={expandedSkill === skillName}
                    isMobile={isMobile}
                  />
                );
              })}
            </div>
          </>
        )}
      </div>
    </section>
  );
}
