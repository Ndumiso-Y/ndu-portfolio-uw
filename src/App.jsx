// src/App.jsx
import React from "react"
import Theme from "./Theme"
import Navbar from "./components/Navbar"
import Hero from "./features/hero/Hero"
import About from "./features/about/About"
import Websites from "./features/websites/Websites"
import LogoShowCase from "./components/LogoShowCase"
import SocialMgmt from "./components/SocialMgmt"
import Projects from "./features/projects/Projects"
import Upcoming from "./components/Upcoming"
import Badges from "./components/Badges"
import Contact from "./features/contact/Contact"
import Footer from "./components/Footer"
import { SectionDivider } from "./components/ui/SectionDivider"

export default function App() {
  return (
    <div className="min-h-screen">
      <Theme />
      <Navbar />
      <main>
        <Hero />
        <About />
        <SectionDivider variant="gradient" />
        <Websites />
        <SectionDivider variant="dots" />
        <LogoShowCase />
        <SectionDivider variant="line" />
        <SocialMgmt />
        <SectionDivider variant="gradient" />
        <Projects />
        <SectionDivider variant="dots" />
        <Upcoming />
        <SectionDivider variant="line" />
        <Badges />
        <SectionDivider variant="gradient" />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}
