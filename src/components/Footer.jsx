// src/components/Footer.jsx
import React from "react";

export default function Footer(){
  return (
    <footer className="border-t border-slate-200/50 bg-white">
      <div className="max-w-6xl mx-auto px-6 py-16 md:py-20">
        <div className="grid md:grid-cols-3 gap-12">
          {/* Brand */}
          <div className="flex flex-col gap-4">
            <div className="w-10 h-10 bg-slate-100 rounded-lg p-1.5 border border-slate-200">
              <img src="/assets/ndu-icon.png" alt="Ndumiso icon" className="w-full h-full object-contain" />
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.15em] font-semibold text-slate-900">Ndumiso Yedwa</p>
              <p className="text-[10px] text-slate-500 mt-2">© {new Date().getFullYear()} Embark Digitals</p>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex flex-col gap-3 text-xs uppercase tracking-[0.12em] font-normal">
            <a href="#home" className="text-slate-600 hover:text-slate-900 transition-colors">Home</a>
            <a href="#about" className="text-slate-600 hover:text-slate-900 transition-colors">About</a>
            <a href="#websites" className="text-slate-600 hover:text-slate-900 transition-colors">Work</a>
            <a href="#contact" className="text-slate-600 hover:text-slate-900 transition-colors">Contact</a>
          </nav>

          {/* Social */}
          <div className="flex flex-col gap-3 text-xs uppercase tracking-[0.12em] font-normal">
            <a href="https://www.facebook.com/" target="_blank" rel="noreferrer" className="text-slate-600 hover:text-slate-900 transition-colors">Facebook</a>
            <a href="https://www.linkedin.com/" target="_blank" rel="noreferrer" className="text-slate-600 hover:text-slate-900 transition-colors">LinkedIn</a>
            <a href="https://www.instagram.com/" target="_blank" rel="noreferrer" className="text-slate-600 hover:text-slate-900 transition-colors">Instagram</a>
          </div>
        </div>

        {/* Bottom line */}
        <div className="mt-16 pt-8 border-t border-slate-200/50">
          <p className="text-[10px] text-slate-500 tracking-wider text-center">
            Crafted with precision — Digital excellence delivered
          </p>
        </div>
      </div>
    </footer>
  );
}
