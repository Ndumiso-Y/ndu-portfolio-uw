import React from 'react'
import contactData from '@/content/contact.json'
import { FaLinkedin, FaGithub, FaTwitter, FaEnvelope } from 'react-icons/fa'

export default function ContactModern() {
  const socialLinks = [
    { icon: FaLinkedin, href: contactData.linkedin, label: 'LinkedIn' },
    { icon: FaTwitter, href: contactData.twitter, label: 'Twitter' },
    { icon: FaEnvelope, href: `mailto:${contactData.email}`, label: 'Email' },
  ]

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
            Let's Build Something <span className="text-accent">Amazing</span>
          </h2>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto">
            Available for freelance projects, collaborations, or just a friendly chat about web
            development.
          </p>
        </div>

        {/* Contact options */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {/* Email */}
          <a
            href={`mailto:${contactData.email}`}
            className="card-modern p-8 text-left group reveal-up stagger-1"
          >
            <div className="w-12 h-12 rounded-xl bg-accent/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <FaEnvelope className="w-6 h-6 text-accent" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Email Me</h3>
            <p className="text-sm text-text-secondary mb-4">
              Drop me a line for project inquiries
            </p>
            <p className="text-sm text-accent font-medium">{contactData.email}</p>
          </a>

          {/* Phone */}
          <a
            href={contactData.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="card-modern p-8 text-left group reveal-up stagger-2"
          >
            <div className="w-12 h-12 rounded-xl bg-accent/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <svg className="w-6 h-6 text-accent" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">WhatsApp</h3>
            <p className="text-sm text-text-secondary mb-4">Quick chat or voice call</p>
            <p className="text-sm text-accent font-medium">{contactData.phone}</p>
          </a>
        </div>

        {/* CTA Button */}
        <div className="mb-12 reveal-up stagger-3">
          <a
            href={`mailto:${contactData.email}`}
            className="inline-flex items-center gap-3 px-10 py-5 bg-accent hover:bg-accent-hover rounded-full font-semibold text-base text-bg-primary transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-accent-glow"
          >
            <span>Start a Project</span>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </a>
        </div>

        {/* Social links */}
        <div className="flex items-center justify-center gap-6 reveal-up stagger-4">
          {socialLinks.map((social, i) => {
            const Icon = social.icon
            return (
              <a
                key={i}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 glass rounded-full flex items-center justify-center hover:bg-glass-hover hover:scale-110 transition-all duration-300 group"
                aria-label={social.label}
              >
                <Icon className="w-5 h-5 text-text-secondary group-hover:text-accent transition-colors" />
              </a>
            )
          })}
        </div>

        {/* Footer note */}
        <div className="mt-16 pt-8 border-t border-glass-border reveal-up stagger-5">
          <p className="text-sm text-text-tertiary">
            Based in {contactData.location} • Available for remote work worldwide
          </p>
        </div>
      </div>
    </section>
  )
}
