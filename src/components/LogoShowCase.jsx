// src/components/LogoShowCase.jsx
import { withBase } from '../lib/withBase';
import React, { useEffect, useState } from "react";
import { content } from "../content";
import { trackGraphicsSlidesClick } from '../lib/analytics';

function Chip({ children }) {
  return (
    <span className="text-[11px] px-2 py-1 rounded-full border border-slate-200 bg-white">
      {children}
    </span>
  );
}

export default function LogoShowCase() {
  const brand = content?.brandColor || "#41b3bc";
  const intro = content?.sectionIntros?.graphics;
  const logos = Array.isArray(content?.logos) ? content.logos : [];
  const tvei  = Array.isArray(content?.tvei?.items) ? content.tvei.items : [];

  // separate expand states so each block can expand/collapse independently
  const [expandedLogos, setExpandedLogos]   = useState(false);
  const [expandedDesign, setExpandedDesign] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const set = () => {
      const desk = mq.matches;
      setIsDesktop(desk);
      // desktop: both expanded; mobile: both collapsed by default
      setExpandedLogos(desk);
      setExpandedDesign(desk);
    };
    set();
    mq.addEventListener("change", set);
    return () => mq.removeEventListener("change", set);
  }, []);

  const pdfLink = (href) => {
    if (!href) return null;
    const url = withBase(href);
    console.log(`PDF Link: ${href} -> ${url}`);
    return url;
  };

  // ----- Modal & gallery for TVEI -----
  const [modal, setModal] = useState({ open:false, mode:null, itemIdx:-1, imgIdx:0, scale:1 });
  const openGallery = (itemIdx, startAt=0) => setModal({ open:true, mode:"gallery", itemIdx, imgIdx:startAt, scale:1 });
  const openZoom = (itemIdx) => setModal({ open:true, mode:"zoom", itemIdx, imgIdx:0, scale:1 });
  const closeModal = () => setModal({ open:false, mode:null, itemIdx:-1, imgIdx:0, scale:1 });
  const nextImg = () => {
    if (modal.mode!=="gallery") return;
    const g = tvei[modal.itemIdx]?.gallery||[]; if(!g.length) return;
    setModal(m=>({ ...m, imgIdx:(m.imgIdx+1)%g.length }));
  };
  const prevImg = () => {
    if (modal.mode!=="gallery") return;
    const g = tvei[modal.itemIdx]?.gallery||[]; if(!g.length) return;
    setModal(m=>({ ...m, imgIdx:(m.imgIdx-1+g.length)%g.length }));
  };
  const setZoom = (val)=> setModal(m=>({ ...m, scale: Math.max(1, Math.min(3, val)) }));
  const zoomIn = ()=> setZoom(parseFloat((modal.scale+0.25).toFixed(2)));
  const zoomOut= ()=> setZoom(parseFloat((modal.scale-0.25).toFixed(2)));
  const zoomReset=()=> setZoom(1);
  useEffect(()=> {
    const onKey=(e)=>{ if(!modal.open) return;
      if(e.key==="Escape") closeModal();
      if(modal.mode==="gallery"){ if(e.key==="ArrowRight") nextImg(); if(e.key==="ArrowLeft") prevImg(); }
    };
    window.addEventListener("keydown", onKey); return ()=> window.removeEventListener("keydown", onKey);
  }, [modal.open, modal.mode, modal.itemIdx, modal.imgIdx, tvei]);

  // TVEI opening carousel thumb
  const hasOpeningGallery = !!(tvei[0]?.gallery && tvei[0].gallery.length);
  const [carouselIdx, setCarouselIdx] = useState(0);
  useEffect(()=>{
    if(!hasOpeningGallery) return;
    const total = tvei[0].gallery.length;
    const id=setInterval(()=> setCarouselIdx(i=> (i+1)%total ), 3000);
    return ()=> clearInterval(id);
  }, [hasOpeningGallery, tvei]);

  const goCarouselNext = ()=> hasOpeningGallery && setCarouselIdx(i=> (i+1)%tvei[0].gallery.length);
  const goCarouselPrev = ()=> hasOpeningGallery && setCarouselIdx(i=> (i-1+tvei[0].gallery.length)%tvei[0].gallery.length);

  // visible slices per block
  const logosVisible  = expandedLogos  || isDesktop ? logos : logos.slice(0,1);
  const designVisible = expandedDesign || isDesktop ? tvei  : tvei.slice(0,1);

  const collapseLogos = () => {
    setExpandedLogos(false);
    const el = document.getElementById("graphics");
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };
  const collapseDesign = () => {
    setExpandedDesign(false);
    const el = document.getElementById("graphics");
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section id="graphics" className="section-offset" style={{ background: 'linear-gradient(to bottom, #050505, #0a0a0a)' }}>
      <div className="max-w-6xl mx-auto px-6 py-20 md:py-32">
        {/* Section header */}
        <div className="mb-12">
          <span className="inline-block px-4 py-2 glass rounded-full text-sm text-[#41b3bc] font-medium mb-6">
            Creative Work
          </span>
          <h2 className="text-4xl md:text-6xl font-bold text-white leading-tight tracking-tight mb-4">Graphics & Branding</h2>
          {intro && <p className="text-sm md:text-base text-text-secondary font-normal max-w-2xl">{intro}</p>}
        </div>

        {/* ================= LOGO DESIGNS ================= */}
        {logos.length>0 && (
          <h3
            className="text-xs uppercase tracking-[0.15em] font-semibold mt-16 mb-8 pb-3 border-b-2"
            style={{ color: brand, borderColor: brand }}
          >
            Logo Designs
          </h3>
        )}
        {logos.length>0 && (
          <>
            <div className="grid md:grid-cols-3 gap-8">
              {logosVisible.map((it, idx) => {
                const cover = it.cover || it.thumb || "/assets/nduproj-01.jpg";
                return (
                  <article
                    key={`logo-${idx}`}
                    className="group bg-white overflow-hidden border-2 border-transparent hover:border-opacity-100 transition-all duration-500"
                    style={{ borderColor: 'transparent' }}
                    onMouseEnter={(e) => e.currentTarget.style.borderColor = brand}
                    onMouseLeave={(e) => e.currentTarget.style.borderColor = 'transparent'}
                  >
                    <div className="relative overflow-hidden aspect-[16/10] bg-slate-50">
                      <img src={cover} alt={it.name||"Logo"} className="w-full h-full object-contain grayscale-[30%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700" loading="lazy" />
                      {/* Brand color overlay on hover */}
                      <div
                        className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500"
                        style={{ backgroundColor: brand }}
                      ></div>
                      <div className="absolute top-3 left-3 flex gap-2">
                        <span
                          className="text-[10px] px-2 py-1.5 border-2 backdrop-blur-sm uppercase tracking-wider font-semibold"
                          style={{ borderColor: brand, color: brand, backgroundColor: 'rgba(255,255,255,0.9)' }}
                        >
                          Logo
                        </span>
                        {it.client && (
                          <span className="text-[10px] px-2 py-1 border border-slate-200/50 bg-white/90 backdrop-blur-sm font-normal">
                            {it.client}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="p-6 border-t-4" style={{ borderColor: brand }}>
                      <div className="flex items-start justify-between gap-3 mb-2">
                        <h3 className="text-sm font-semibold text-slate-900">{it.name||"—"}</h3>
                        {it.year && <span className="text-[10px] text-slate-400 uppercase tracking-wider font-medium">{it.year}</span>}
                      </div>
                      {it.note && <p className="text-xs text-slate-600 leading-relaxed">{it.note}</p>}
                      <div className="mt-4 flex gap-4 text-[10px] uppercase tracking-[0.15em] font-semibold">
                        {it.download && (
                          <a
                            href={pdfLink(it.download)}
                            onClick={() => trackGraphicsSlidesClick(it.name || 'Logo design')}
                            target="_blank"
                            rel="noreferrer"
                            className="transition-all hover:translate-x-1"
                            style={{ color: brand }}
                          >
                            Slides →
                          </a>
                        )}
                        {it.brief && (
                          <a
                            href={pdfLink(it.brief)}
                            onClick={() => trackGraphicsSlidesClick(`${it.name || 'Logo'} - Brief`)}
                            target="_blank"
                            rel="noreferrer"
                            className="transition-all hover:translate-x-1"
                            style={{ color: brand }}
                          >
                            Brief →
                          </a>
                        )}
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>

            {/* Mobile tiny strip + controls (LOGOS) with brand color */}
            {!isDesktop && logos.length>1 && !expandedLogos && (
              <div className="mt-8 flex items-center gap-3">
                {logos.slice(1,5).map((l, i)=>(
                  <button
                    key={`logo-mini-${i}`}
                    onClick={()=>setExpandedLogos(true)}
                    className="w-12 h-12 overflow-hidden border-2 hover:scale-105 transition-all"
                    style={{ borderColor: brand }}
                  >
                    <img src={l.cover||l.thumb} alt="" className="w-full h-full object-cover grayscale"/>
                  </button>
                ))}
                <button
                  onClick={()=>setExpandedLogos(true)}
                  className="ml-auto text-[10px] uppercase tracking-wider font-semibold transition-all hover:translate-x-1"
                  style={{ color: brand }}
                >
                  View more →
                </button>
              </div>
            )}
            {!isDesktop && logos.length>1 && expandedLogos && (
              <div className="mt-8">
                <button
                  onClick={collapseLogos}
                  className="text-[10px] uppercase tracking-wider font-semibold transition-all hover:-translate-x-1"
                  style={{ color: brand }}
                >
                  ← Show less
                </button>
              </div>
            )}
          </>
        )}

        {/* ================= DESIGN WORK (TVEI etc.) ================= */}
        {tvei.length>0 && (
          <h3
            className="text-xs uppercase tracking-[0.15em] font-semibold mt-20 mb-8 pb-3 border-b-2"
            style={{ color: brand, borderColor: brand }}
          >
            Design Work
          </h3>
        )}
        {tvei.length>0 && (
          <>
            <div className="grid md:grid-cols-3 gap-8">
              {designVisible.map((d, i) => {
                const realIndex = tvei.indexOf(d); // stable index for modal
                const isOpening = (realIndex===0) && Array.isArray(d.gallery) && d.gallery.length>0;
                const openingSrc = isOpening ? d.gallery[carouselIdx] : (d.src || "/assets/nduproj-02.jpg");
                return (
                  <article
                    key={`design-${realIndex}`}
                    className={`group bg-white overflow-hidden border-2 border-transparent hover:border-opacity-100 transition-all duration-500 ${isOpening ? "cursor-pointer" : "cursor-zoom-in"}`}
                    style={{ borderColor: 'transparent' }}
                    onMouseEnter={(e) => e.currentTarget.style.borderColor = brand}
                    onMouseLeave={(e) => e.currentTarget.style.borderColor = 'transparent'}
                    onClick={() => (isOpening ? openGallery(0, 0) : openZoom(realIndex))}
                  >
                    <div className="relative overflow-hidden aspect-[16/10] bg-slate-50">
                      <img src={openingSrc} alt={d.title||"Design"} className="w-full h-full object-contain grayscale-[30%] group-hover:grayscale-0 transition-all duration-700" loading="lazy" />
                      {/* Brand color overlay on hover */}
                      <div
                        className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500"
                        style={{ backgroundColor: brand }}
                      ></div>
                      {isOpening && (
                        <>
                          <button
                            className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-white/80 border-2 px-2 py-1 text-sm font-bold hover:scale-110 transition-transform"
                            style={{ borderColor: brand, color: brand }}
                            onClick={(e)=>{e.stopPropagation(); goCarouselPrev();}}
                          >
                            ‹
                          </button>
                          <button
                            className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-white/80 border-2 px-2 py-1 text-sm font-bold hover:scale-110 transition-transform"
                            style={{ borderColor: brand, color: brand }}
                            onClick={(e)=>{e.stopPropagation(); goCarouselNext();}}
                          >
                            ›
                          </button>
                          <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-1">
                            {d.gallery.map((_, dotIdx)=>(
                              <span
                                key={dotIdx}
                                className={`w-1.5 h-1.5 rounded-full ${dotIdx===carouselIdx?"":"bg-slate-300"}`}
                                style={dotIdx===carouselIdx ? { backgroundColor: brand } : {}}
                              />
                            ))}
                          </div>
                        </>
                      )}
                    </div>
                    <div className="p-6 border-t-4" style={{ borderColor: brand }}>
                      <h4 className="text-sm font-semibold text-slate-900">{d.title||"—"}</h4>
                      {d.copy && <p className="mt-2 text-xs text-slate-600 leading-relaxed">{d.copy}</p>}
                      {isOpening && (
                        <p className="mt-3 text-[10px] uppercase tracking-wider font-semibold" style={{ color: brand }}>
                          Click to open gallery
                        </p>
                      )}
                    </div>
                  </article>
                );
              })}
            </div>

            {/* Mobile tiny strip + controls (DESIGN) with brand color */}
            {!isDesktop && tvei.length>1 && !expandedDesign && (
              <div className="mt-8 flex items-center gap-3">
                {tvei.slice(1,5).map((d, i)=>(
                  <button
                    key={`design-mini-${i}`}
                    onClick={()=>setExpandedDesign(true)}
                    className="w-12 h-12 overflow-hidden border-2 hover:scale-105 transition-all"
                    style={{ borderColor: brand }}
                  >
                    <img src={d.src || d.gallery?.[0]} alt="" className="w-full h-full object-cover grayscale"/>
                  </button>
                ))}
                <button
                  onClick={()=>setExpandedDesign(true)}
                  className="ml-auto text-[10px] uppercase tracking-wider font-semibold transition-all hover:translate-x-1"
                  style={{ color: brand }}
                >
                  View more →
                </button>
              </div>
            )}
            {!isDesktop && tvei.length>1 && expandedDesign && (
              <div className="mt-8">
                <button
                  onClick={collapseDesign}
                  className="text-[10px] uppercase tracking-wider font-semibold transition-all hover:-translate-x-1"
                  style={{ color: brand }}
                >
                  ← Show less
                </button>
              </div>
            )}
          </>
        )}
      </div>

      {/* ======= Modal ======= */}
      {modal.open && tvei[modal.itemIdx] && (
        <div className="fixed inset-0 z-50 bg-black/80 p-4 grid place-items-center" onClick={closeModal}>
          <div className="max-w-5xl w-full rounded-xl bg-white overflow-hidden relative" onClick={(e)=>e.stopPropagation()}>
            <button onClick={closeModal} className="absolute top-3 right-3 z-10 rounded-full border border-slate-200 bg-white px-2 py-1 text-sm">✕</button>
            <div className="p-4 border-b border-slate-200">
              <h3 className="text-lg font-semibold">{tvei[modal.itemIdx]?.title || "Design Work"}</h3>
              {tvei[modal.itemIdx]?.copy && <p className="text-sm text-slate-600 mt-1">{tvei[modal.itemIdx].copy}</p>}
            </div>
            <div className="p-4">
              {modal.mode==="gallery" ? (
                <>
                  <div className="relative border border-slate-200 rounded-lg bg-slate-50">
                    <img src={tvei[modal.itemIdx].gallery[modal.imgIdx]} alt="Gallery item"
                         className="w-full max-h-[70vh] object-contain"
                         style={{ transform:`scale(${modal.scale})`, transition:"transform 120ms ease" }}/>
                    <button className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-white/90 border border-slate-200 px-2 py-1 text-sm" onClick={prevImg}>‹</button>
                    <button className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-white/90 border border-slate-200 px-2 py-1 text-sm" onClick={nextImg}>›</button>
                  </div>
                  <div className="mt-3 flex gap-2 overflow-x-auto">
                    {tvei[modal.itemIdx].gallery.map((src, idx)=>(
                      <button key={idx}
                              className={`shrink-0 border rounded-md p-1 ${idx===modal.imgIdx?"border-slate-600":"border-slate-200"}`}
                              onClick={()=> setModal(m=>({ ...m, imgIdx: idx }))}>
                        <img src={src} alt={`thumb ${idx+1}`} className="w-20 h-14 object-contain bg-white" />
                      </button>
                    ))}
                  </div>
                  <div className="mt-3 flex flex-wrap gap-3">
                    <button onClick={zoomOut} className="px-3 py-1.5 rounded-full border border-slate-200 text-sm">− Zoom out</button>
                    <button onClick={zoomIn}  className="px-3 py-1.5 rounded-full border border-slate-200 text-sm">+ Zoom in</button>
                    <button onClick={zoomReset} className="px-3 py-1.5 rounded-full border border-slate-200 text-sm">Reset</button>
                  </div>
                </>
              ) : (
                <>
                  <div className="relative border border-slate-200 rounded-lg bg-slate-50">
                    <img src={tvei[modal.itemIdx]?.src || "/assets/nduproj-02.jpg"} alt={tvei[modal.itemIdx]?.title||"Design"}
                         className="w-full max-h-[70vh] object-contain"
                         style={{ transform:`scale(${modal.scale})`, transition:"transform 120ms ease" }}/>
                  </div>
                  <div className="mt-3 flex flex-wrap gap-3">
                    <button onClick={zoomOut} className="px-3 py-1.5 rounded-full border border-slate-200 text-sm">− Zoom out</button>
                    <button onClick={zoomIn}  className="px-3 py-1.5 rounded-full border border-slate-200 text-sm">+ Zoom in</button>
                    <button onClick={zoomReset} className="px-3 py-1.5 rounded-full border border-slate-200 text-sm">Reset</button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
