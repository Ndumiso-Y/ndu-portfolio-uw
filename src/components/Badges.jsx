// src/components/Badges.jsx
import React, { useState } from "react";
import { content } from "../content";
import { AssetImage } from "./ui/AssetImage";

export default function Badges() {
  const items = Array.isArray(content?.badges) ? content.badges : [];
  const intro = content?.sectionIntros?.badges;
  const [modal, setModal] = useState({ open:false, idx:-1, mode:null, scale:1 });

  if (!items.length) return null;

  const openSnippet = (idx)=>setModal({ open:true, idx, mode:"snippet", scale:1 });
  const openZoom    = (idx)=>setModal({ open:true, idx, mode:"zoom",    scale:1 });
  const close       = ()=>setModal({ open:false, idx:-1, mode:null, scale:1 });
  const zoomIn = ()=>setModal(m=>({ ...m, scale: Math.min(3, +(m.scale+0.25).toFixed(2)) }));
  const zoomOut= ()=>setModal(m=>({ ...m, scale: Math.max(1, +(m.scale-0.25).toFixed(2)) }));
  const zoomReset=()=>setModal(m=>({ ...m, scale:1 }));

  const brand = content?.brandColor || "#48aab7";

  return (
    <section id="badges" className="bg-white section-offset">
      <div className="max-w-6xl mx-auto px-6 py-20 md:py-32">
        {/* Section number with brand color accent */}
        <div className="flex items-center gap-6 mb-8">
          <div
            className="text-xs uppercase tracking-[0.25em] font-semibold px-4 py-2 border-2"
            style={{ color: brand, borderColor: brand }}
          >
            07 — Achievements
          </div>
          <div className="flex-1 h-px" style={{ backgroundColor: brand, opacity: 0.2 }}></div>
        </div>

        <h2 className="text-4xl md:text-6xl font-bold text-slate-900 leading-tight tracking-tight mb-4">Badges & Recognition</h2>
        {intro && <p className="text-sm md:text-base text-slate-600 font-normal max-w-2xl">{intro}</p>}

        <div className="grid md:grid-cols-2 gap-8 mt-16">
          {items.map((b, i) => {
            const isSnippet = !!b.snippetImg || !!b.snippet;
            const isZoom = !!b.zoom;
            const onCardClick = isSnippet ? ()=>openSnippet(i) : isZoom ? ()=>openZoom(i) : undefined;
            const aspectClass = b.aspect === "4/3" ? "aspect-[4/3]" : "aspect-[16/9]";
            return (
              <article
                key={b.name || i}
                className={`group bg-white overflow-hidden border-2 border-transparent hover:border-opacity-100 transition-all duration-500 ${onCardClick ? "cursor-zoom-in" : ""}`}
                style={{ borderColor: 'transparent' }}
                onMouseEnter={(e) => e.currentTarget.style.borderColor = brand}
                onMouseLeave={(e) => e.currentTarget.style.borderColor = 'transparent'}
                onClick={onCardClick}
              >
                <div className={`w-full ${aspectClass} bg-slate-50 overflow-hidden relative`}>
                  <AssetImage
                    src={b.img}
                    alt={b.name || "Badge"}
                    className="w-full h-full object-cover group-hover:scale-105 transition-all duration-700"
                    loading="lazy"
                    decoding="async"
                  />
                  {/* Brand color overlay on hover */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500"
                    style={{ backgroundColor: brand }}
                  ></div>
                </div>
                <div className="p-6 border-t-4" style={{ borderColor: brand }}>
                  <h3 className="text-sm font-semibold text-slate-900">{b.name || "—"}</h3>
                  {b.note && <p className="mt-3 text-xs text-slate-600 leading-relaxed">{b.note}</p>}
                  <div className="mt-4 flex flex-wrap gap-4 text-[10px] uppercase tracking-wider font-semibold">
                    {b.url && <a className="transition-all hover:translate-x-1" href={b.url} target="_blank" rel="noreferrer" style={{ color: brand }} onClick={(e)=>e.stopPropagation()}>Visit site →</a>}
                    {b.post && <a className="transition-all hover:translate-x-1" href={b.post} target="_blank" rel="noreferrer" style={{ color: brand }} onClick={(e)=>e.stopPropagation()}>LinkedIn →</a>}
                    {isSnippet && <button className="transition-all hover:translate-x-1" style={{ color: brand }} onClick={(e)=>{e.stopPropagation(); openSnippet(i);}}>Letter →</button>}
                    {isZoom && <button className="transition-all hover:translate-x-1" style={{ color: brand }} onClick={(e)=>{e.stopPropagation(); openZoom(i);}}>Zoom →</button>}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>

      {modal.open && items[modal.idx] && (
        <div className="fixed inset-0 z-50 bg-black/70 p-4 grid place-items-center" onClick={close} role="dialog" aria-modal="true">
          <div className="max-w-3xl w-full rounded-xl bg-white p-5 relative" onClick={(e)=>e.stopPropagation()}>
            <button onClick={close} className="absolute top-3 right-3 rounded-full border border-slate-200 bg-white px-2 py-1 text-sm">✕</button>
            <h3 className="text-lg font-semibold">{items[modal.idx].name}</h3>

            {modal.mode === "snippet" && (
              <>
                {items[modal.idx].snippet && <p className="mt-3 text-sm text-slate-700 whitespace-pre-line">{items[modal.idx].snippet}</p>}
                {items[modal.idx].snippetImg && (
                  <>
                    <div className="mt-3 border border-slate-200 rounded-xl overflow-auto bg-slate-50">
                      <div className="w-full grid place-items-center" style={{ minHeight: 320 }}>
                        <img src={items[modal.idx].snippetImg} alt="Acceptance letter snippet"
                          onContextMenu={(e)=>e.preventDefault()}
                          style={{ transform:`scale(${modal.scale})`, transformOrigin:"center center", transition:"transform 120ms ease" }}
                          className="max-w-full max-h-[70vh] object-contain" />
                      </div>
                    </div>
                    <div className="mt-4 flex flex-wrap items-center gap-3">
                      <button onClick={zoomOut} className="px-3 py-1.5 rounded-full border border-slate-200 hover:bg-slate-50 text-sm">− Zoom out</button>
                      <button onClick={zoomIn} className="px-3 py-1.5 rounded-full border border-slate-200 hover:bg-slate-50 text-sm">+ Zoom in</button>
                      <button onClick={zoomReset} className="px-3 py-1.5 rounded-full border border-slate-200 hover:bg-slate-50 text-sm">Reset</button>
                    </div>
                  </>
                )}
              </>
            )}

            {modal.mode === "zoom" && (
              <>
                <div className="mt-3 border border-slate-200 rounded-xl overflow-auto bg-slate-50">
                  <div className="w-full grid place-items-center" style={{ minHeight: 360 }}>
                    <img
                      src={items[modal.idx].modalImg || items[modal.idx].img}
                      alt={items[modal.idx].name}
                      onContextMenu={(e)=>e.preventDefault()}
                      style={{ transform:`scale(${modal.scale})`, transformOrigin:"center center", transition:"transform 120ms ease" }}
                      className="max-w-full max-h-[70vh] object-contain"
                    />
                  </div>
                </div>
                <div className="mt-4 flex flex-wrap items-center gap-3">
                  <button onClick={zoomOut} className="px-3 py-1.5 rounded-full border border-slate-200 hover:bg-slate-50 text-sm">− Zoom out</button>
                  <button onClick={zoomIn} className="px-3 py-1.5 rounded-full border border-slate-200 hover:bg-slate-50 text-sm">+ Zoom in</button>
                  <button onClick={zoomReset} className="px-3 py-1.5 rounded-full border border-slate-200 hover:bg-slate-50 text-sm">Reset</button>
                  {items[modal.idx].post && (
                    <a href={items[modal.idx].post} target="_blank" rel="noreferrer" className="ml-auto px-3 py-1.5 rounded-full bg-slate-900 text-white hover:bg-slate-800 text-sm">See LinkedIn post</a>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
