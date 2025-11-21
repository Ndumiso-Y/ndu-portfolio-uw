// src/components/Contact.jsx
import { withBase } from '../lib/withBase';
import React, { useMemo, useState } from "react";
import { content } from "../content";
import { 
  FaWhatsapp, 
  FaEnvelope, 
  FaPhone, 
  FaLinkedin, 
  FaFacebook, 
  FaInstagram, 
  FaTwitter,
  FaIdCard,
  FaCreditCard,
  FaDownload 
} from 'react-icons/fa';

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

function ActionButton({ href, onClick, children, variant = "solid", ariaLabel, isPrimary = false }) {
  const base = "inline-flex items-center justify-center gap-3 px-6 py-4 border text-[10px] uppercase tracking-[0.15em] font-medium transition-all duration-300";
  const solid = isPrimary
    ? "border-slate-900 bg-slate-900 text-white hover:bg-slate-800"
    : "border-slate-200/50 bg-transparent text-slate-600 hover:border-slate-300 hover:text-slate-900";
  const outline = "border-white/20 bg-transparent text-white hover:border-white/40 hover:bg-white/5";

  const cls = `${base} ${variant === "solid" ? solid : outline}`;

  if (href) {
    return (
      <a href={href} target="_blank" rel="noreferrer" className={cls} aria-label={ariaLabel}>
        {children}
      </a>
    );
  }
  return (
    <button onClick={onClick} className={cls} aria-label={ariaLabel}>
      {children}
    </button>
  );
}

export default function Contact() {
  const c = content?.contact || {};
  const brand = content?.brandColor || "#41b3bc";
  const [openPreview, setOpenPreview] = useState(false);

  // Build a .vcf (vCard) data URL so users can save your contact
  const vcardUrl = useMemo(() => {
    const lines = [
      "BEGIN:VCARD",
      "VERSION:3.0",
      `N:Yedwa;Ndumiso;;;`,
      `FN:${c.name || "Ndumiso Yedwa"}`,
      c.title ? `TITLE:${c.title}` : "",
      c.email ? `EMAIL;TYPE=INTERNET:${c.email}` : "",
      c.phone ? `TEL;TYPE=CELL:${c.phone}` : "",
      c.location ? `ADR;TYPE=WORK:;;${(c.location || "").replaceAll(",", "\\,")};;;;` : "",
      c.linkedin ? `URL:${c.linkedin}` : "",
      c.ecard ? `URL;TYPE=ECARD:${c.ecard}` : "",
      "END:VCARD"
    ].filter(Boolean).join("\n");
    const b64 = typeof window !== "undefined"
      ? btoa(unescape(encodeURIComponent(lines)))
      : "";
    return `data:text/vcard;charset=utf-8;base64=${b64}`;
  }, [c]);

  return (
    <section id="contact" className="relative" style={{ background: 'linear-gradient(to bottom, #0a0a0a, #050505)' }}>
      <div className="max-w-6xl mx-auto px-6 py-20 md:py-32">
        <div className="text-xs uppercase tracking-[0.25em] text-text-tertiary font-normal mb-8">
          Contact
        </div>
        <h2 className="text-4xl md:text-6xl font-bold text-white leading-tight tracking-tight mb-16">
          Let's work together
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
                  Fast, modern websites, branding, and digital assets — tailored to your goals.
                </p>
              </div>
            </div>

            {/* Contact actions - minimalist grid */}
            <div className="mt-12 space-y-6">
              {/* Primary CTAs */}
              <div className="grid sm:grid-cols-2 gap-4">
                {c.whatsapp && (
                  <a
                    href={c.whatsapp}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center gap-3 px-6 py-4 rounded-full font-semibold text-sm transition-all duration-300 hover:scale-105"
                    style={{ backgroundColor: '#25D366', color: 'white' }}
                    aria-label="WhatsApp me"
                  >
                    <FaWhatsapp className="w-4 h-4" /> <span>WhatsApp</span>
                  </a>
                )}
                {c.email && (
                  <a
                    href={`mailto:${c.email}`}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center gap-3 px-6 py-4 bg-[#41b3bc] hover:bg-[#41b3bc]-hover rounded-full font-semibold text-sm text-bg-primary transition-all duration-300 hover:scale-105"
                    aria-label="Email me"
                  >
                    <FaEnvelope className="w-4 h-4" /> <span>Email</span>
                  </a>
                )}
              </div>

              {/* Secondary actions */}
              <div className="grid sm:grid-cols-2 gap-4">
                {c.phone && (
                  <ActionButton href={`tel:${(c.phone || "").replace(/\s+/g, "")}`} variant="outline" ariaLabel="Call me">
                    <FaPhone className="w-3 h-3" /> <span>Call</span>
                  </ActionButton>
                )}
                {c.vcf ? (
                  <ActionButton href={withBase(c.vcf)} variant="outline" ariaLabel="Save contact">
                    <FaDownload className="w-3 h-3" /> <span>Save Contact</span>
                  </ActionButton>
                ) : (
                  <ActionButton href={vcardUrl} variant="outline" ariaLabel="Save contact">
                    <FaDownload className="w-3 h-3" /> <span>Save Contact</span>
                  </ActionButton>
                )}
              </div>

              {/* Social divider */}
              <div className="pt-8 mt-8 border-t border-glass-border">
                <h3 className="text-[10px] uppercase tracking-[0.2em] text-text-tertiary font-semibold mb-4">Follow</h3>
                <div className="flex flex-wrap gap-3">
                  {c.linkedin && (
                    <a
                      href={c.linkedin}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass hover:bg-glass-hover transition-all text-sm"
                      aria-label="LinkedIn"
                    >
                      <FaLinkedin className="w-4 h-4" style={{ color: '#0A66C2' }} />
                      <span className="text-white">LinkedIn</span>
                    </a>
                  )}
                  {c.facebook && (
                    <a
                      href={c.facebook}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass hover:bg-glass-hover transition-all text-sm"
                      aria-label="Facebook"
                    >
                      <FaFacebook className="w-4 h-4" style={{ color: '#1877F2' }} />
                      <span className="text-white">Facebook</span>
                    </a>
                  )}
                  {c.instagram && (
                    <a
                      href={c.instagram}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass hover:bg-glass-hover transition-all text-sm"
                      aria-label="Instagram"
                    >
                      <FaInstagram className="w-4 h-4" style={{ color: '#E4405F' }} />
                      <span className="text-white">Instagram</span>
                    </a>
                  )}
                </div>
              </div>
            </div>
          </article>
        </div>
      </div>

      {/* e-Card Preview Modal */}
      {openPreview && c.ecard && (
        <div
          className="fixed inset-0 z-50 bg-black/70 p-4 grid place-items-center"
          role="dialog"
          aria-modal="true"
          aria-label="e-Card preview"
          onClick={() => setOpenPreview(false)}
        >
          <div
            className="max-w-4xl w-full rounded-2xl bg-white overflow-hidden relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setOpenPreview(false)}
              className="absolute top-3 right-3 z-10 rounded-full border border-slate-200 bg-white px-2 py-1 text-sm"
            >
              ✕
            </button>
            <div className="h-[70vh]">
              <iframe
                title="Ndumiso e-Card"
                src={c.ecard}
                className="w-full h-full"
                style={{ border: "0" }}
              />
            </div>
            <div className="p-3 border-t border-slate-200 flex items-center gap-3">
              <a
                href={c.ecard}
                target="_blank"
                rel="noreferrer"
                className="px-3 py-1.5 rounded-full bg-slate-900 text-white hover:bg-slate-800 text-sm"
              >
                Open e-Card in new tab
              </a>
              <span className="text-xs text-slate-500">
                If the preview doesn’t load, the e-Card site may block embedding — use the button.
              </span>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
