// src/components/Projects.jsx
import { withBase } from '../lib/withBase';
import React, { useEffect, useState } from "react";
import { content } from "../content";

export default function Projects() {
  const items = Array.isArray(content?.projects) ? content.projects : [];
  const intro = content?.sectionIntros?.projects;
  const brand = content?.brandColor || "#48aab7";

  const [expanded, setExpanded] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const [modalProject, setModalProject] = useState(null);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const set = () => { setIsDesktop(mq.matches); setExpanded(mq.matches); };
    set(); mq.addEventListener("change", set);
    return () => mq.removeEventListener("change", set);
  }, []);

  if (!items.length) return null;
  const visible = expanded || isDesktop ? items : items.slice(0,1);

  const clip = (p) => {
    if (p.preview) return p.preview;
    if (!p.desc) return "";
    return p.desc.length > 160 ? p.desc.slice(0, 160).trim() + "…" : p.desc;
  };

  const collapse = () => {
    setExpanded(false);
    const el = document.getElementById("projects");
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section id="projects" className="bg-white section-offset">
      <div className="max-w-6xl mx-auto px-6 py-20 md:py-32">
        {/* Section number with brand color accent */}
        <div className="flex items-center gap-6 mb-8">
          <div
            className="text-xs uppercase tracking-[0.25em] font-semibold px-4 py-2 border-2"
            style={{ color: brand, borderColor: brand }}
          >
            05 — Case Studies
          </div>
          <div className="flex-1 h-px" style={{ backgroundColor: brand, opacity: 0.2 }}></div>
        </div>

        <h2 className="text-4xl md:text-6xl font-bold text-slate-900 leading-tight tracking-tight mb-4">Projects</h2>
        {intro && <p className="text-sm md:text-base text-slate-600 font-normal max-w-2xl">{intro}</p>}

        <div className="mt-16 grid md:grid-cols-2 gap-8">
          {visible.map((p, i)=>(
            <article
              key={p.name || i}
              className="group bg-white overflow-hidden border-2 border-transparent hover:border-opacity-100 transition-all duration-500 flex flex-col"
              style={{ borderColor: 'transparent' }}
              onMouseEnter={(e) => e.currentTarget.style.borderColor = brand}
              onMouseLeave={(e) => e.currentTarget.style.borderColor = 'transparent'}
            >
              {p.thumb && (
                <div className="overflow-hidden aspect-[16/10] bg-slate-50 relative">
                  <picture>
                    <source srcSet={p.thumb.replace(/\.[^/.]+$/, '.avif')} type="image/avif" />
                    <source srcSet={p.thumb.replace(/\.[^/.]+$/, '.webp')} type="image/webp" />
                    <img src={p.thumb} alt={p.name||"Project"} className="w-full h-full object-cover grayscale-[30%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700" loading="lazy" />
                  </picture>
                  {/* Brand color overlay on hover */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500"
                    style={{ backgroundColor: brand }}
                  ></div>
                </div>
              )}
              <div className="p-6 flex flex-col flex-1 border-t-4" style={{ borderColor: brand }}>
                <h3 className="text-sm font-semibold text-slate-900">{p.name || "—"}</h3>
                {p.audio && (
                  <div className="mt-2">
                    <audio controls src={p.audio} className="w-full" preload="none" />
                    {p.audioDesc && <div className="text-xs text-slate-500 mt-1">{p.audioDesc}</div>}
                  </div>
                )}
                {clip(p) && (
                  <p className="mt-3 text-xs text-slate-600 leading-relaxed">
                    {clip(p)}{" "}
                    {p.desc && p.desc.length > (p.preview?.length || 160) && (
                      <button
                        onClick={() => setModalProject(p)}
                        className="inline cursor-pointer font-semibold transition-all hover:translate-x-1"
                        style={{ color: brand }}
                      >
                        Read more →
                      </button>
                    )}
                  </p>
                )}
                <div className="mt-auto pt-4">
                  {p.url && (
                    <a
                      href={p.url}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.15em] font-semibold transition-all duration-300 hover:translate-x-1"
                      style={{ color: brand }}
                    >
                      View Project →
                    </a>
                  )}
                </div>
              </div>
            </article>
          ))}
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
                <img src={s.thumb} alt="" className="w-full h-full object-cover grayscale"/>
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

      {/* Read More Modal */}
      {modalProject && (
        <div
          className="fixed inset-0 z-50 bg-black/70 p-4 flex items-center justify-center"
          onClick={() => setModalProject(null)}
        >
          <div
            className="bg-white rounded-2xl p-6 max-w-2xl max-h-[80vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between mb-4">
              <h3 className="text-xl font-bold">{modalProject.name}</h3>
              <button 
                onClick={() => setModalProject(null)}
                className="text-slate-500 hover:text-slate-700 text-xl leading-none"
              >
                ×
              </button>
            </div>
            
            {modalProject.thumb && (
              <div className="mb-4">
                <picture>
                  <source srcSet={modalProject.thumb.replace(/\.[^/.]+$/, '.avif')} type="image/avif" />
                  <source srcSet={modalProject.thumb.replace(/\.[^/.]+$/, '.webp')} type="image/webp" />
                  <img 
                    src={modalProject.thumb} 
                    alt={modalProject.name||"Project"} 
                    className="w-full aspect-[16/9] object-cover bg-slate-100 rounded-lg" 
                  />
                </picture>
              </div>
            )}
            
            <div className="prose prose-sm max-w-none">
              <p className="text-slate-700 leading-relaxed">
                {modalProject.desc}
              </p>
              
              {modalProject.url && (
                <div className="mt-6 pt-4 border-t border-slate-200">
                  <a 
                    href={modalProject.url} 
                    target="_blank" 
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-slate-200 hover:bg-slate-50"
                    style={{ color: brand }}
                  >
                    Go to website →
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
