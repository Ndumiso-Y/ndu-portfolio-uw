// src/components/Websites.jsx
import { withBase } from '../lib/withBase';
import React, { useEffect, useState } from "react";
import { content } from "../content";
import { AssetImage } from "./ui/AssetImage";

export default function Websites() {
  const items = Array.isArray(content?.websites) ? content.websites : [];
  const intro = content?.sectionIntros?.websites;
  const brand = content?.brandColor || "#48aab7";

  const [expanded, setExpanded] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const set = () => { setIsDesktop(mq.matches); setExpanded(mq.matches); };
    set(); mq.addEventListener("change", set);
    return () => mq.removeEventListener("change", set);
  }, []);

  if (!items.length) return null;

  const visible = expanded || isDesktop ? items : items.slice(0, 1);

  const collapse = () => {
    setExpanded(false);
    const el = document.getElementById("websites");
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section id="websites" className="bg-white section-offset">
      <div className="max-w-6xl mx-auto px-6 py-20 md:py-32">
        {/* Section number with brand color accent */}
        <div className="flex items-center gap-6 mb-8">
          <div
            className="text-xs uppercase tracking-[0.25em] font-semibold px-4 py-2 border-2"
            style={{ color: brand, borderColor: brand }}
          >
            02 — Portfolio
          </div>
          <div className="flex-1 h-px" style={{ backgroundColor: brand, opacity: 0.2 }}></div>
        </div>

        <h2 className="text-4xl md:text-6xl font-bold text-slate-900 leading-tight tracking-tight mb-4">Websites</h2>
        {intro && <p className="text-sm md:text-base text-slate-600 font-normal max-w-2xl">{intro}</p>}

        <div className="mt-16 grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {visible.map((w, i) => (
            <article
              key={w.name || i}
              className="group bg-white overflow-hidden border-2 border-transparent hover:border-opacity-100 transition-all duration-500"
              style={{ borderColor: 'transparent' }}
              onMouseEnter={(e) => e.currentTarget.style.borderColor = brand}
              onMouseLeave={(e) => e.currentTarget.style.borderColor = 'transparent'}
            >
              {w.thumb && (
                <div className="overflow-hidden aspect-[16/10] bg-slate-50 relative">
                  <AssetImage
                    src={w.thumb}
                    alt={w.name || "Website"}
                    className="w-full h-full object-cover grayscale-[30%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                    loading="lazy" decoding="async"
                  />
                  {/* Brand color overlay on hover */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500"
                    style={{ backgroundColor: brand }}
                  ></div>
                </div>
              )}
              <div className="p-6 border-t-4" style={{ borderColor: brand }}>
                <h3 className="text-sm font-semibold text-slate-900 mb-2">{w.name || "—"}</h3>
                {w.brief && <p className="text-xs text-slate-600 leading-relaxed">{w.brief}</p>}
                <div className="mt-4">
                  {w.url && (
                    <a
                      href={w.url}
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
        {!isDesktop && items.length > 1 && !expanded && (
          <div className="mt-8 flex items-center gap-3">
            {items.slice(1, 5).map((s, idx) => (
              <button
                key={idx}
                onClick={() => setExpanded(true)}
                className="w-12 h-12 overflow-hidden border-2 hover:scale-105 transition-all"
                style={{ borderColor: brand }}
              >
                <AssetImage src={s.thumb} alt="" className="w-full h-full object-cover grayscale" />
              </button>
            ))}
            <button
              onClick={() => setExpanded(true)}
              className="ml-auto text-[10px] uppercase tracking-wider font-semibold transition-all hover:translate-x-1"
              style={{ color: brand }}
            >
              View more →
            </button>
          </div>
        )}

        {!isDesktop && items.length > 1 && expanded && (
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
