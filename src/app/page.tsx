'use client'

import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useEffect, useRef } from 'react'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null)
  const parallaxRef = useRef<HTMLDivElement>(null)
  const progressRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // HERO ANIMATION
    if (heroRef.current) {
      gsap.from(heroRef.current.children, {
        y: 100,
        opacity: 0,
        duration: 1.2,
        stagger: 0.2,
        ease: 'power3.out',
      })
    }

    // PARALLAX EFFECT
    if (parallaxRef.current) {
      gsap.to(parallaxRef.current, {
        y: 200,
        scrollTrigger: {
          trigger: parallaxRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      })
    }

    // PROGRESS BAR
    if (progressRef.current) {
      gsap.to(progressRef.current, {
        scaleY: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: document.body,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.5,
          invalidateOnRefresh: true,
        },
      })
    }

    // CLEANUP
    return () => {
      const triggers = ScrollTrigger.getAll()
      for (const trigger of triggers) {
        trigger.kill()
      }
    }
  }, [])

  return (
    <>
      {/* PROGRESS BAR */}
      <div className='fixed top-0 left-0 right-0 h-full w-0.5 z-50'>
        <div
          ref={progressRef}
          className='h-full primary-bg origin-top'
          style={{ transform: 'scaleY(0)' }}
        />
      </div>

      <div className='min-h-screen '>
        {/* HERO SECTION */}
        <section className='min-h-screen flex items-center justify-center px-8'>
          <div ref={heroRef} className='text-center space-y-8'>
            <h1 className='text-9xl font-bold primary-text'>DEVELOPER</h1>
            <h1 className='text-9xl font-bold primary-text'>UI/UX</h1>
            <div className='text-lg space-y-4'>
              <p>GSAP & Lenis animation examples with custom cursor</p>
              <div className='flex justify-center gap-4 mt-8'>
                <button
                  type='button'
                  className='px-6 py-3 bg-white/10 border border-white/20 rounded-lg hover:bg-white/20 transition-colors'
                  data-cursor-text='Click me!'
                >
                  View Work
                </button>
                <a
                  href='#contact'
                  className='px-6 py-3 primary-bg text-black rounded-lg hover:opacity-80 transition-opacity'
                  data-cursor-text='Contact'
                  data-magnetic='true'
                >
                  Get In Touch
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* PARALLAX EXAMPLE */}
        <section className='min-h-screen flex items-center justify-center px-8 relative overflow-hidden'>
          <div
            ref={parallaxRef}
            className='absolute inset-0 bg-linear-to-br from-purple-400 to-pink-500 opacity-20'
          />
          <div className='max-w-2xl bg-white dark:bg-gray-900 p-16 rounded-2xl text-center relative z-10'>
            <h2 className='text-4xl font-bold mb-4 text-black dark:text-white'>Parallax</h2>
            <p className='text-xl text-gray-600 dark:text-gray-400'>
              The background moves at a different speed
            </p>
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
    </>
  )
}
