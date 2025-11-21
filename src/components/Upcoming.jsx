// src/components/Upcoming.jsx
import { withBase } from '../lib/withBase';
import React, { useEffect, useState } from "react";
import { content } from "../content";

export default function Upcoming() {
  const items = Array.isArray(content?.upcoming) ? content.upcoming : [];
  const intro = content?.sectionIntros?.upcoming;
  const brand = content?.brandColor || "#48aab7";
  
  const [expanded, setExpanded] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const [playingFullVideo, setPlayingFullVideo] = useState(null);

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
    const el = document.getElementById("upcoming");
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleVideoClick = (index) => {
    setPlayingFullVideo(playingFullVideo === index ? null : index);
  };

  return (
    <section id="upcoming" className="bg-white section-offset">
      <div className="max-w-6xl mx-auto px-6 py-20 md:py-32">
        {/* Section number with brand color accent */}
        <div className="flex items-center gap-6 mb-8">
          <div
            className="text-xs uppercase tracking-[0.25em] font-semibold px-4 py-2 border-2"
            style={{ color: brand, borderColor: brand }}
          >
            06 — Coming Soon
          </div>
          <div className="flex-1 h-px" style={{ backgroundColor: brand, opacity: 0.2 }}></div>
        </div>

        <h2 className="text-4xl md:text-6xl font-bold text-slate-900 leading-tight tracking-tight mb-4">Upcoming Projects</h2>
        {intro && <p className="text-sm md:text-base text-slate-600 font-normal max-w-2xl">{intro}</p>}
        
        <div className="mt-16 grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {visible.map((it, i) => (
            <article
              key={i}
              className="group bg-white overflow-hidden border-2 border-transparent hover:border-opacity-100 transition-all duration-500"
              style={{ borderColor: 'transparent' }}
              onMouseEnter={(e) => e.currentTarget.style.borderColor = brand}
              onMouseLeave={(e) => e.currentTarget.style.borderColor = 'transparent'}
            >
              
              {/* Video content */}
              {it.video?.poster && (
                <div className="relative">
                  {playingFullVideo === i ? (
                    /* Full video with controls */
                    <div className="relative">
                      <video
                        controls
                        autoPlay
                        preload="auto"
                        poster={withBase(it.video.poster)}
                        className="w-full aspect-[16/9] object-cover bg-slate-100"
                        onEnded={() => setPlayingFullVideo(null)}
                        onError={() => setPlayingFullVideo(null)}
                      >
                        {it.video.webm && <source src={withBase(it.video.webm)} type="video/webm" />}
                        {it.video.mp4 && <source src={withBase(it.video.mp4)} type="video/mp4" />}
                        <p className="text-sm text-slate-500 p-4">
                          Your browser doesn't support HTML5 video.
                        </p>
                      </video>
                      <button 
                        onClick={() => setPlayingFullVideo(null)}
                        className="absolute top-2 right-2 w-8 h-8 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors flex items-center justify-center"
                        aria-label="Close video"
                      >
                        ×
                      </button>
                    </div>
                  ) : it.video.mp4 || it.video.webm ? (
                    /* Autoplay muted video with click overlay */
                    <div className="relative cursor-pointer group" onClick={() => handleVideoClick(i)}>
                      <video
                        autoPlay
                        loop
                        muted
                        playsInline
                        preload="metadata"
                        poster={withBase(it.video.poster)}
                        className="w-full aspect-[16/9] object-cover bg-slate-100"
                        onError={(e) => {
                          // Fallback to poster image if video fails
                          e.target.style.display = 'none';
                          e.target.nextElementSibling.style.display = 'block';
                        }}
                      >
                        {it.video.webm && <source src={withBase(it.video.webm)} type="video/webm" />}
                        {it.video.mp4 && <source src={withBase(it.video.mp4)} type="video/mp4" />}
                      </video>
                      
                      {/* Fallback poster image */}
                      <picture style={{ display: 'none' }}>
                        <source srcSet={withBase(it.video.poster.replace(/\.[^/.]+$/, '.avif'))} type="image/avif" />
                        <source srcSet={withBase(it.video.poster.replace(/\.[^/.]+$/, '.webp'))} type="image/webp" />
                        <img
                          src={withBase(it.video.poster)}
                          alt={it.name || "Project preview"}
                          className="w-full aspect-[16/9] object-cover bg-slate-100"
                        />
                      </picture>
                      
                      {/* Play button overlay for full video */}
                      <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/30 transition-colors">
                        <div 
                          className="w-16 h-16 rounded-full flex items-center justify-center shadow-lg transition-transform group-hover:scale-110"
                          style={{ backgroundColor: brand }}
                        >
                          <svg className="w-6 h-6 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M8 5v14l11-7z" />
                          </svg>
                        </div>
                      </div>
                      
                      {/* "Coming Soon" badge */}
                      <div className="absolute top-3 left-3">
                        <span 
                          className="text-xs px-2 py-1 rounded-full text-white font-medium"
                          style={{ backgroundColor: brand }}
                        >
                          Coming Soon
                        </span>
                      </div>
                      
                      {/* Click for sound indicator */}
                      <div className="absolute bottom-3 right-3">
                        <span className="text-xs px-2 py-1 rounded-full bg-black/50 text-white">
                          🔊 Click for sound
                        </span>
                      </div>
                    </div>
                  ) : (
                    /* Static poster image for projects without video */
                    <div className="relative">
                      <picture>
                        <source srcSet={withBase(it.video.poster.replace(/\.[^/.]+$/, '.avif'))} type="image/avif" />
                        <source srcSet={withBase(it.video.poster.replace(/\.[^/.]+$/, '.webp'))} type="image/webp" />
                        <img
                          src={withBase(it.video.poster)}
                          alt={it.name || "Project preview"}
                          className="w-full aspect-[16/9] object-cover bg-slate-100"
                          loading="lazy"
                        />
                      </picture>
                      
                      {/* "Coming Soon" badge */}
                      <div className="absolute top-3 left-3">
                        <span 
                          className="text-xs px-2 py-1 rounded-full text-white font-medium"
                          style={{ backgroundColor: brand }}
                        >
                          Coming Soon
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              )}

              <div className="p-6 border-t-4" style={{ borderColor: brand }}>
                <h3 className="text-sm font-semibold text-slate-900">{it.name || "Untitled"}</h3>
                {it.note && <p className="text-xs text-slate-600 mt-1">{it.note}</p>}
                {it.details && <p className="mt-3 text-xs text-slate-600 leading-relaxed">{it.details}</p>}

                {Array.isArray(it.tags) && it.tags.length > 0 && (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {it.tags.map((t, idx) => (
                      <span
                        key={idx}
                        className="text-[10px] uppercase tracking-wider px-3 py-1.5 border-2 font-semibold"
                        style={{ borderColor: brand, color: brand }}
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                )}
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
                {s.video?.poster && (
                  <img src={withBase(s.video.poster)} alt="" className="w-full h-full object-cover grayscale" />
                )}
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
