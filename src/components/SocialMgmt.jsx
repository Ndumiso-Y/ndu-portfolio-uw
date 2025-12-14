// src/components/SocialMgmt.jsx
import React, { useEffect, useState } from "react";
import { content } from "../content";
import { FaFacebook, FaLinkedin, FaInstagram } from "react-icons/fa";
import { trackSocialProfileClick } from '../lib/analytics';
import { AssetImage } from './ui/AssetImage';

function PlatformBadge({ type }) {
  const t = (type || "").toLowerCase();
  const Icon = t.includes("facebook") ? FaFacebook : t.includes("linkedin") ? FaLinkedin : FaInstagram;
  const label = t.charAt(0).toUpperCase() + t.slice(1);
  return (
    <span className="inline-flex items-center gap-1.5 text-xs px-2 py-1 rounded-full border border-slate-200 bg-white">
      <Icon className="text-slate-600" />
      <span>{label}</span>
    </span>
  );
}

function SocialLink({ type, url, brand }) {
  const t = (type || "").toLowerCase();
  let Icon = FaFacebook, color = "#4267B2";
  if (t.includes("linkedin")) { Icon = FaLinkedin; color = "#0A66C2"; }
  if (t.includes("instagram")) { Icon = FaInstagram; color = "#E1306C"; }
  const label = (type || "Link").charAt(0).toUpperCase() + (type || "Link").slice(1);
  return (
    <a
      href={url || "#"}
      onClick={() => trackSocialProfileClick(type, brand)}
      target="_blank"
      rel="noreferrer"
      className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-slate-200 bg-white transition"
      style={{ color }}
      onMouseEnter={(e)=>{ e.currentTarget.style.backgroundColor=color; e.currentTarget.style.color="white"; }}
      onMouseLeave={(e)=>{ e.currentTarget.style.backgroundColor="white"; e.currentTarget.style.color=color; }}
    >
      <Icon /><span className="underline">{label}</span>
    </a>
  );
}

function Thumb({ src, brand, aspect="16/9" }) {
  const aspectClass = aspect==="4/3" ? "aspect-[4/3]" : aspect==="1/1" ? "aspect-[1/1]" : aspect==="3/2" ? "aspect-[3/2]" : "aspect-[16/9]";
  return (
    <div className={`relative w-full ${aspectClass} bg-slate-100 overflow-hidden`}>
      {src ? (
        <AssetImage src={src} alt={brand||""} className="absolute inset-0 w-full h-full object-cover" loading="lazy" />
      ) : (
        <div className="absolute inset-0 grid place-items-center text-3xl text-white" style={{ background:"#41b3bc" }}>
          {(brand||"").split(" ").map(w=>w[0]).join("").slice(0,3).toUpperCase() || "—"}
        </div>
      )}
    </div>
  );
}

export default function SocialMgmt() {
  const items = Array.isArray(content?.social) ? content.social : [];
  const intro = content?.sectionIntros?.social;
  const brand = content?.brandColor || "#41b3bc";

  const [expanded, setExpanded] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const set = () => { setIsDesktop(mq.matches); setExpanded(mq.matches); };
    set(); mq.addEventListener("change", set);
    return () => mq.removeEventListener("change", set);
  }, []);

  if (!items.length) return null;
  const visible = expanded || isDesktop ? items : items.slice(0,1);

  const collapse = () => {
    setExpanded(false);
    const el = document.getElementById("social");
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section id="social" className="section-offset" style={{ background: 'linear-gradient(to bottom, #0a0a0a, #050505)' }}>
      <div className="max-w-7xl mx-auto px-6 py-20 md:py-32">
        {/* Section header */}
        <div className="mb-12">
          <span className="inline-block px-4 py-2 glass rounded-full text-sm text-[#41b3bc] font-medium mb-6">
            Social Strategy
          </span>
          <h2 className="text-4xl md:text-6xl font-bold text-white leading-tight tracking-tight mb-4">Social Media Management</h2>
        {intro && <p className="text-sm md:text-base text-text-secondary font-normal max-w-2xl">{intro}</p>}
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {visible.map((s, i) => {
            const links = Array.isArray(s?.links) ? s.links : [];
            const platforms = Array.isArray(s?.platforms) ? s.platforms : [];
            const thumb = s?.thumb || content?.socialThumbs?.[s?.thumbKey];
            const aspect = s?.aspect || "16/9";
            return (
              <article
                key={s?.brand || i}
                className="group card-modern overflow-hidden transition-all duration-500 flex flex-col"
              >
                <div className="overflow-hidden aspect-[16/10] bg-slate-50 relative">
                  <Thumb src={thumb} brand={s?.brand} aspect={aspect} />
                  <div className="absolute inset-0 bg-[#41b3bc]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>
                <div className="p-6 flex flex-col flex-1 border-t-4 border-[#41b3bc]">
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <h3 className="text-sm font-semibold text-white">{s?.brand || "Untitled"}</h3>
                    <div className="flex flex-wrap gap-1">
                      {platforms.map((p, idx) => <PlatformBadge type={p} key={idx} />)}
                    </div>
                  </div>
                  {s?.desc && <p className="text-xs text-text-secondary leading-relaxed">{s.desc}</p>}
                  <div className="mt-auto pt-4 flex gap-3 flex-wrap">
                    {links.length ? links.map((l, j)=> <SocialLink key={j} type={l?.type} url={l?.url} brand={s?.brand} />)
                                   : <span className="text-text-tertiary text-[10px] uppercase tracking-wider">(Add links in content.social)</span>}
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {/* Mobile controls with brand color */}
        {!isDesktop && items.length>1 && !expanded && (
          <div className="mt-8 flex items-center gap-3">
            {items.slice(1,5).map((s, idx)=>(
              <button
                key={idx}
                onClick={()=>setExpanded(true)}
                className="w-12 h-12 overflow-hidden border-2 hover:scale-105 transition-all"
                style={{ borderColor: brand }}
              >
                <AssetImage src={s.thumb || content?.socialThumbs?.[s.thumbKey]} alt="" className="w-full h-full object-cover grayscale"/>
              </button>
            ))}
            <button
              onClick={()=>setExpanded(true)}
              className="ml-auto text-[10px] uppercase tracking-wider font-semibold transition-all hover:translate-x-1"
              style={{ color: brand }}
            >
              View more →
            </button>
          </div>
        )}

        {!isDesktop && items.length>1 && expanded && (
          <div className="mt-8">
            <button
              onClick={collapse}
              className="text-[10px] uppercase tracking-wider font-semibold transition-all hover:-translate-x-1"
              style={{ color: brand }}
            >
              ← Show less
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
