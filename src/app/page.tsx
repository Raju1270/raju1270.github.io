'use client'

import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useEffect, useRef } from 'react'
import { setupAnimations } from '@/animations'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

export default function Home() {
  const keywords = ['DEVELOPER', 'DESIGNER', 'CODER', 'INNOVATOR']
  const heroRef = useRef<HTMLDivElement>(null)
  const fadeRef = useRef<HTMLDivElement>(null)
  const scaleRef = useRef<HTMLDivElement>(null)
  const parallaxRef = useRef<HTMLDivElement>(null)
  const staggerRef = useRef<HTMLDivElement>(null)
  const progressRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // CREATE GSAP CONTEXT FOR BETTER CLEANUP AND SCOPING
    const ctx = gsap.context(() => {
      setupAnimations({
        hero: heroRef.current,
        fade: fadeRef.current,
        scale: scaleRef.current,
        parallax: parallaxRef.current,
        stagger: staggerRef.current,
        progress: progressRef.current,
      })
    }, containerRef)

    // REFRESH SCROLLTRIGGERS ON RESIZE FOR RESPONSIVE LAYOUTS
    const mm = gsap.matchMedia()
    mm.add('(min-width: 1px)', () => {
      ScrollTrigger.refresh()
    })

    // CLEANUP - ONLY KILLS SCROLLTRIGGERS WITHIN THIS CONTEXT
    return () => {
      ctx.revert()
      mm.revert()
    }
  }, [])

  return (
    <div ref={containerRef} className=''>
      {/* PROGRESS BAR */}
      <div className='fixed top-0 left-0 right-0 h-full w-0.5 z-50'>
        <div
          ref={progressRef}
          className='h-full primary-bg origin-top'
          style={{ transform: 'scaleY(0)', willChange: 'transform' }}
        />
      </div>

      <div className='min-h-screen'>
        {/* HERO SECTION */}
        <section className='flex flex-col justify-center relative min-h-screen'>
          <div ref={heroRef} className='text-center space-y-8'>
            {keywords.map((keyword) => (
              <h1 key={keyword} className='text-[12rem] font-bold primary-text leading-32'>
                {keyword}
              </h1>
            ))}
          </div>
          <div className="absolute bottom-6 text-sm font-bold flex items-center gap-2  px-20">
            <span>SCROLL TO DISCOVER</span>
            <span className='w-14 h-0.5 rounded-full primary-bg-black relative overflow-hidden'>
              <span className='absolute inset-0 w-full h-0.5 rounded-full bg-white animate-[slide-line_1.5s_ease-in-out_infinite]'></span>
            </span>
          </div>
        </section>
        {/* HERO SECTION */}
        <section className='flex flex-col justify-center  relative'>
          <div ref={heroRef} className='text-center space-y-8'>
            <div className=" text-8xl font-bold">
              Merging creativity and logic to build products that truly work
            </div>
          </div>
        </section>

        {/* FADE IN EXAMPLE */}
        <section className='min-h-screen flex items-center justify-center px-8'>
          <div
            ref={fadeRef}
            className='max-w-2xl bg-blue-500 p-16 rounded-2xl text-white text-center'
            style={{ willChange: 'transform, opacity' }}
          >
            <h2 className='text-4xl font-bold mb-4'>Fade In</h2>
            <p className='text-xl'>This element fades in and moves up as you scroll</p>
          </div>
        </section>

        {/* SCALE EXAMPLE */}
        <section className='min-h-screen flex items-center justify-center px-8'>
          <div
            ref={scaleRef}
            className='max-w-2xl bg-green-500 p-16 rounded-2xl text-white text-center'
            style={{ willChange: 'transform' }}
          >
            <h2 className='text-4xl font-bold mb-4'>Scale</h2>
            <p className='text-xl'>This element scales up as you scroll</p>
          </div>
        </section>

        {/* PARALLAX EXAMPLE */}
        <section className='min-h-screen flex items-center justify-center px-8 relative overflow-hidden'>
          <div
            ref={parallaxRef}
            className='absolute inset-0 bg-linear-to-br from-purple-400 to-pink-500 opacity-20'
            style={{ willChange: 'transform' }}
          />
          <div className='max-w-2xl bg-white dark:bg-gray-900 p-16 rounded-2xl text-center relative z-10'>
            <h2 className='text-4xl font-bold mb-4 text-black dark:text-white'>Parallax</h2>
            <p className='text-xl text-gray-600 dark:text-gray-400'>
              The background moves at a different speed
            </p>
          </div>
        </section>

        {/* STAGGER EXAMPLE */}
        <section className='min-h-screen flex items-center justify-center px-8'>
          <div ref={staggerRef} className='max-w-4xl w-full'>
            <h2 className='text-4xl font-bold mb-12 text-center text-black dark:text-white'>
              Stagger Animation
            </h2>
            <div className='grid grid-cols-3 gap-8'>
              {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                <div
                  key={num}
                  className='stagger-item aspect-square bg-linear-to-br from-cyan-400 to-blue-500 rounded-xl flex items-center justify-center text-white text-3xl font-bold'
                  style={{ willChange: 'transform, opacity' }}
                >
                  {num}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* INFO SECTION */}
        <section className='min-h-screen flex items-center justify-center px-8'>
          <div className='max-w-3xl space-y-8'>
            <h2 className='text-4xl font-bold text-black dark:text-white'>How to Use</h2>
            <div className='space-y-4 text-lg text-gray-600 dark:text-gray-400'>
              <p>
                All animations are created using GSAP ScrollTrigger and work seamlessly with Lenis
                smooth scrolling.
              </p>
              <p>
                Check the{' '}
                <code className='bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded'>
                  src/components
                </code>{' '}
                folder for reusable animation components.
              </p>
              <p>
                Read{' '}
                <code className='bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded'>
                  GSAP_LENIS_SETUP.md
                </code>{' '}
                for detailed documentation.
              </p>
              <p>
                Check{' '}
                <code className='bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded'>
                  QUICK_REFERENCE.md
                </code>{' '}
                for a quick API reference.
              </p>
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <footer className='py-16 text-center text-gray-500'>
          <p>Built with Next.js, GSAP, and Lenis</p>
        </footer>
      </div>
    </div>
  )
}
