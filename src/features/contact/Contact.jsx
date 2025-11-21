import React, { useMemo } from "react"
import contactData from "@/content/contact.json"
import { SectionHeading } from "@/components/ui/SectionHeading"
import Button from "@/components/ui/Button"
import {
  FaWhatsapp,
  FaEnvelope,
  FaPhone,
  FaLinkedin,
  FaFacebook,
  FaInstagram,
  FaTwitter,
  FaDownload
} from 'react-icons/fa'

export default function Contact() {
  // Build a .vcf (vCard) data URL
  const vcardUrl = useMemo(() => {
    const lines = [
      "BEGIN:VCARD",
      "VERSION:3.0",
      `N:Yedwa;Ndumiso;;;`,
      `FN:${contactData.name || "Ndumiso Yedwa"}`,
      contactData.email ? `EMAIL;TYPE=INTERNET:${contactData.email}` : "",
      contactData.phone ? `TEL;TYPE=CELL:${contactData.phone}` : "",
      contactData.location ? `ADR;TYPE=WORK:;;${(contactData.location || "").replaceAll(",", "\\,")};;;;` : "",
      contactData.linkedin ? `URL:${contactData.linkedin}` : "",
      contactData.ecard ? `URL;TYPE=ECARD:${contactData.ecard}` : "",
      "END:VCARD"
    ].filter(Boolean).join("\n")

    const b64 = typeof window !== "undefined"
      ? btoa(unescape(encodeURIComponent(lines)))
      : ""
    return `data:text/vcard;charset=utf-8;base64,${b64}`
  }, [])

  const contactMethods = [
    {
      icon: FaWhatsapp,
      label: "WhatsApp",
      href: contactData.whatsapp,
      color: "#25D366"
    },
    {
      icon: FaEnvelope,
      label: "Email",
      href: `mailto:${contactData.email}`,
      color: "#EA4335"
    },
    {
      icon: FaPhone,
      label: "Phone",
      href: `tel:${contactData.phone}`,
      color: "#4285F4"
    }
  ]

  const socialLinks = [
    {
      icon: FaLinkedin,
      label: "LinkedIn",
      href: contactData.linkedin,
      color: "#0A66C2"
    },
    {
      icon: FaFacebook,
      label: "Facebook",
      href: contactData.facebook,
      color: "#1877F2"
    },
    {
      icon: FaInstagram,
      label: "Instagram",
      href: contactData.instagram,
      color: "#E4405F"
    },
    {
      icon: FaTwitter,
      label: "Twitter",
      href: contactData.twitter,
      color: "#1DA1F2"
    }
  ].filter(link => link.href)

  return (
    <section id="contact" className="relative bg-slate-50 dark:bg-slate-900 section-offset">
      <div className="absolute top-0 right-0 w-px h-32 bg-gradient-to-b from-emerald-600/40 to-transparent" aria-hidden="true" />

      <div className="relative max-w-6xl mx-auto px-6 py-20 md:py-32">
        <SectionHeading
          eyebrow="08 — Get in Touch"
          title="Contact"
          sub="Ready to start your project? Let's connect and bring your vision to life."
        />

        <div className="mt-16 grid md:grid-cols-2 gap-12">
          {/* Left: Contact methods */}
          <div className="space-y-8">
            <div>
              <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-6">
                Get in Touch
              </h3>
              <div className="space-y-4">
                {contactMethods.map((method, i) => {
                  const Icon = method.icon
                  return (
                    <a
                      key={i}
                      href={method.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-4 p-4 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-emerald-500 dark:hover:border-emerald-400 transition-all duration-200 group"
                      aria-label={method.label}
                    >
                      <div
                        className="flex-shrink-0 w-12 h-12 rounded-lg flex items-center justify-center"
                        style={{ backgroundColor: `${method.color}15` }}
                      >
                        <Icon className="w-6 h-6" style={{ color: method.color }} aria-hidden="true" />
                      </div>
                      <div className="flex-1">
                        <div className="text-sm font-medium text-slate-900 dark:text-slate-100">
                          {method.label}
                        </div>
                        <div className="text-xs text-slate-500 dark:text-slate-400">
                          {method.label === "Email" && contactData.email}
                          {method.label === "Phone" && contactData.phone}
                          {method.label === "WhatsApp" && "Send a message"}
                        </div>
                      </div>
                      <svg
                        className="w-5 h-5 text-slate-400 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transform transition-transform group-hover:translate-x-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17 8l4 4m0 0l-4 4m4-4H3"
                        />
                      </svg>
                    </a>
                  )
                })}
              </div>
            </div>

            {/* Location */}
            {contactData.location && (
              <div className="p-6 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
                <div className="flex items-center gap-3 mb-2">
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
                  <h4 className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                    Location
                  </h4>
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-300">
                  {contactData.location}
                </p>
              </div>
            )}
          </div>

          {/* Right: Social & Downloads */}
          <div className="space-y-8">
            {/* Social links */}
            {socialLinks.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-6">
                  Connect on Social
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  {socialLinks.map((social, i) => {
                    const Icon = social.icon
                    return (
                      <a
                        key={i}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 p-4 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-emerald-500 dark:hover:border-emerald-400 transition-all duration-200 group"
                        aria-label={social.label}
                      >
                        <Icon className="w-6 h-6 flex-shrink-0" style={{ color: social.color }} aria-hidden="true" />
                        <span className="text-sm font-medium text-slate-900 dark:text-slate-100">
                          {social.label}
                        </span>
                      </a>
                    )
                  })}
                </div>
              </div>
            )}

            {/* Download contact */}
            <div className="p-6 bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 rounded-xl border border-emerald-200 dark:border-emerald-800">
              <h4 className="text-sm font-semibold text-slate-900 dark:text-slate-100 mb-4">
                Save My Contact
              </h4>
              <div className="space-y-3">
                <a
                  href={vcardUrl}
                  download="Ndumiso-Yedwa.vcf"
                  className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors text-sm font-medium"
                  aria-label="Download vCard"
                >
                  <FaDownload className="w-4 h-4" aria-hidden="true" />
                  Download vCard
                </a>
                {contactData.ecard && (
                  <a
                    href={contactData.ecard}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors text-sm font-medium border border-slate-200 dark:border-slate-700"
                    aria-label="View digital business card"
                  >
                    View E-Card
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
