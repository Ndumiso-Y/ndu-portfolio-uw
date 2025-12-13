import React, { useRef } from 'react'
import projectsData from '@/content/projects.json'
import MiniAudioPlayer from '@/components/modern/MiniAudioPlayer'
import { withBase } from '@/lib/withBase'

function ProjectCard({ project }) {
  return (
    <div className="card-modern p-6 min-w-[350px] max-w-[350px] flex flex-col space-y-4">
      {/* Thumbnail */}
      {project.thumb && (
        <div className="relative w-full h-48 rounded-xl overflow-hidden group/img">
          <img
            src={project.thumb}
            alt={project.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover/img:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-bg-primary/80 to-transparent" />
        </div>
      )}

      {/* Content */}
      <div className="flex-1 space-y-3">
        <h3 className="text-lg font-semibold text-white line-clamp-2">{project.name}</h3>

        {/* Audio player */}
        {project.audio && (
          <MiniAudioPlayer src={project.audio} description={project.audioDesc} />
        )}

        <p className="text-sm text-text-secondary line-clamp-3">{project.outcome}</p>

        {/* Stack */}
        {project.stack && (
          <div className="flex flex-wrap gap-2">
            {project.stack.map((tech, i) => (
              <span
                key={i}
                className="px-2 py-1 text-xs font-medium bg-glass rounded-md text-text-secondary"
              >
                {tech}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Link */}
      {project.url && (
        <a
          href={project.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-[#41b3bc] hover:text-[#41b3bc]-hover font-medium text-sm transition-colors group/link"
        >
          <span>View Project</span>
          <svg
            className="w-4 h-4 transition-transform group-hover/link:translate-x-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17 8l4 4m0 0l-4 4m4-4H3"
            />
          </svg>
        </a>
      )}
    </div>
  )
}

export default function ProjectCarousel() {
  const scrollRef = useRef(null)

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = direction === 'left' ? -400 : 400
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' })
    }
  }

  return (
    <section
      id="projects"
      className="relative py-24 px-6 md:px-12 overflow-hidden"
      style={{ background: '#0a0a0a' }}
    >
      <div className="max-w-[1400px] mx-auto">
        {/* Header */}
        <div className="mb-12">
          <span className="inline-block px-4 py-2 glass rounded-full text-sm text-[#41b3bc] font-medium mb-6">
            Treehouse Projects
          </span>
          <h2 className="text-title text-white mb-4">
            Learning <span className="text-[#41b3bc]">Journey</span>
          </h2>
          <p className="text-lg text-text-secondary max-w-2xl">
            Eight projects demonstrating front-end fundamentals with interactive audio
            walkthroughs.
          </p>
        </div>

        {/* Intro Video Block */}
        <div className="mb-16 card-modern p-6 md:p-8 lg:p-10 overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
            {/* Video Column (60-65% on desktop) */}
            <div className="lg:col-span-7">
              <div className="relative w-full rounded-xl overflow-hidden bg-black/20 border border-white/5" style={{ aspectRatio: '1080/1350' }}>
                <video
                  className="w-full h-full object-cover"
                  controls
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="auto"
                  aria-label="Intro clip from my front-end learning journey series"
                >
                  <source src={withBase("/media/learning-journey-intro.mp4")} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
            </div>

            {/* Text Column (35-40% on desktop) */}
            <div className="lg:col-span-5 space-y-4">
              <span className="inline-block px-4 py-1.5 text-[10px] tracking-[0.12em] uppercase rounded-full border border-[#41b3bc]/20 bg-[#41b3bc]/5 text-[#41b3bc] w-fit">
                Documenting the Process
              </span>

              <h3 className="text-2xl md:text-3xl font-bold text-white leading-tight">
                Not just what I build, but how I get there
              </h3>

              <div className="space-y-3 text-text-secondary">
                <p className="text-base leading-relaxed">
                  I believe in documenting the journey, not only the final designs. This video is a small piece of that: honest practice, figuring things out, and building consistency as a developer and designer.
                </p>
                <p className="text-base leading-relaxed">
                  If you enjoy process, you'll appreciate the projects that follow.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Carousel container */}
        <div className="relative">
          {/* Scroll buttons */}
          <button
            onClick={() => scroll('left')}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 glass rounded-full flex items-center justify-center hover:bg-glass-hover transition-colors"
            aria-label="Scroll left"
          >
            <svg
              className="w-5 h-5 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>

          <button
            onClick={() => scroll('right')}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 glass rounded-full flex items-center justify-center hover:bg-glass-hover transition-colors"
            aria-label="Scroll right"
          >
            <svg
              className="w-5 h-5 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>

          {/* Carousel */}
          <div
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto scrollbar-hide scroll-smooth px-16"
            style={{
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
            }}
          >
            {projectsData.map((project, i) => (
              <ProjectCard key={i} project={project} />
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  )
}
