import React from "react"
import contactData from "@/content/contact.json"
import { SectionHeading } from "@/components/ui/SectionHeading"

export default function Contact() {
  return (
    <section id="contact" className="relative bg-slate-50 dark:bg-slate-900 section-offset">
      <div className="absolute top-0 right-0 w-px h-32 bg-gradient-to-b from-emerald-600/40 to-transparent" aria-hidden="true" />

      <div className="relative max-w-6xl mx-auto px-6 py-20 md:py-32">
        <SectionHeading
          eyebrow="08 — Get in Touch"
          title="Contact"
          sub="Let's build something great together."
        />

        <div className="mt-16 text-center">
          <div className="max-w-2xl mx-auto">
            <p className="text-xl text-slate-600 dark:text-slate-300 mb-8">
              Open to new projects and collaborations.
            </p>

            {/* Location */}
            {contactData.location && (
              <div className="inline-flex items-center gap-3 px-6 py-4 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
                <svg
                  className="w-5 h-5 text-emerald-600 dark:text-emerald-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                <span className="text-sm font-medium text-slate-900 dark:text-slate-100">
                  {contactData.location}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
