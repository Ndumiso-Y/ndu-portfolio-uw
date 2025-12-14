import React from "react"
import contactData from "@/content/contact.json"
import { SectionHeading } from "@/components/ui/SectionHeading"

export default function Contact() {
  return (
    <section id="contact" className="relative bg-slate-50 dark:bg-slate-900 section-offset">
      <div className="absolute top-0 right-0 w-px h-32 bg-gradient-to-b from-emerald-600/40 to-transparent" aria-hidden="true" />

      <div className="relative max-w-6xl mx-auto px-6 py-20 md:py-32">
        <SectionHeading
          eyebrow=""
          title=""
          sub="Let's build something great together."
        />

        <div className="mt-16 text-center">
          <div className="max-w-2xl mx-auto">
            <p className="text-xl text-slate-600 dark:text-slate-300 mb-8">
              Open to new projects and collaborations.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
