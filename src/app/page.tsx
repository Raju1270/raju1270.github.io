'use client'

import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useEffect, useRef } from 'react'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null)
  const fadeRef = useRef<HTMLDivElement>(null)
  const scaleRef = useRef<HTMLDivElement>(null)
  const parallaxRef = useRef<HTMLDivElement>(null)
  const pinRef = useRef<HTMLDivElement>(null)
  const staggerRef = useRef<HTMLDivElement>(null)
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

    // FADE IN ANIMATION
    if (fadeRef.current) {
      gsap.fromTo(
        fadeRef.current,
        { opacity: 0, y: 100 },
        {
          opacity: 1,
          y: 0,
          scrollTrigger: {
            trigger: fadeRef.current,
            start: 'top 80%',
            end: 'top 50%',
            scrub: true,
          },
        }
      )
    }

    // SCALE ANIMATION
    if (scaleRef.current) {
      gsap.fromTo(
        scaleRef.current,
        { scale: 0.5 },
        {
          scale: 1,
          scrollTrigger: {
            trigger: scaleRef.current,
            start: 'top 80%',
            end: 'top 50%',
            scrub: true,
          },
        }
      )
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

    // PIN SECTION
    if (pinRef.current) {
      ScrollTrigger.create({
        trigger: pinRef.current,
        start: 'top top',
        end: '+=500',
        pin: true,
        pinSpacing: true,
      })
    }

    // STAGGER ANIMATION
    if (staggerRef.current) {
      const items = staggerRef.current.querySelectorAll('.stagger-item')
      gsap.fromTo(
        items,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.1,
          scrollTrigger: {
            trigger: staggerRef.current,
            start: 'top 70%',
            end: 'top 40%',
            scrub: true,
          },
        }
      )
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
          scrub: true,
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
            <h1 className='text-9xl font-bold primary-text'>LOREM IPSUM</h1>
            <p className='text-2xl'>Lorem.</p>
            <div className='text-lg'> examples</div>
          </div>
        </section>

        {/* FADE IN EXAMPLE */}
        <section className='min-h-screen flex items-center justify-center px-8'>
          <div
            ref={fadeRef}
            className='max-w-2xl bg-blue-500 p-16 rounded-2xl text-white text-center'
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
          >
            <h2 className='text-4xl font-bold mb-4'>Scale</h2>
            <p className='text-xl'>This element scales up as you scroll</p>
          </div>
        </section>

        {/* PARALLAX EXAMPLE */}
        <section className='min-h-screen flex items-center justify-center px-8 relative overflow-hidden'>
          <div
            ref={parallaxRef}
            className='absolute inset-0 bg-gradient-to-br from-purple-400 to-pink-500 opacity-20'
          />
          <div className='max-w-2xl bg-white dark:bg-gray-900 p-16 rounded-2xl text-center relative z-10'>
            <h2 className='text-4xl font-bold mb-4 text-black dark:text-white'>Parallax</h2>
            <p className='text-xl text-gray-600 dark:text-gray-400'>
              The background moves at a different speed
            </p>
          </div>
        </section>

        {/* PIN EXAMPLE */}
        <section className='min-h-screen'>
          <div
            ref={pinRef}
            className='h-screen flex items-center justify-center bg-gradient-to-br from-orange-400 to-red-500'
          >
            <div className='text-center text-white'>
              <h2 className='text-4xl font-bold mb-4'>Pinned Section</h2>
              <p className='text-xl'>This section stays pinned while you scroll</p>
            </div>
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
                  className='stagger-item aspect-square bg-gradient-to-br from-cyan-400 to-blue-500 rounded-xl flex items-center justify-center text-white text-3xl font-bold'
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
    </>
  )
}
