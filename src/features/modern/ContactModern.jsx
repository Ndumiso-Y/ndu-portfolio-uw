import React from 'react'
import contactData from '@/content/contact.json'

export default function ContactModern() {
  return (
    <section
      id="contact"
      className="relative py-32 px-6 md:px-12"
      style={{ background: 'linear-gradient(to bottom, #0a0a0a, #050505)' }}
    >
      <div className="max-w-[800px] mx-auto text-center">
        {/* Header */}
        <div className="mb-12 reveal-up">
          <span className="inline-block px-4 py-2 glass rounded-full text-sm text-accent font-medium mb-6">
            Get In Touch
          </span>
          <h2 className="text-title text-white mb-6">
            Let's Build Something <span className="text-accent">Great</span>
          </h2>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto">
            Open to new projects and collaborations.
          </p>
        </div>

        {/* Footer note */}
        <div className="mt-16 pt-8 border-t border-glass-border reveal-up stagger-5">
          <p className="text-sm text-text-tertiary">
            Based in {contactData.location}
          </p>
        </div>
      </div>
    </section>
  )
}
