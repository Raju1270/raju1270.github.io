'use client'

import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useEffect, useRef } from 'react'

// Register GSAP ScrollTrigger plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

export function ScrollExample() {
  const containerRef = useRef<HTMLDivElement>(null)
  const box1Ref = useRef<HTMLDivElement>(null)
  const box2Ref = useRef<HTMLDivElement>(null)
  const box3Ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    // Example 1: Fade in on scroll
    if (box1Ref.current) {
      gsap.fromTo(
        box1Ref.current,
        { opacity: 0, y: 100 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          scrollTrigger: {
            trigger: box1Ref.current,
            start: 'top 80%',
            end: 'top 50%',
            scrub: true,
          },
        }
      )
    }

    // Example 2: Scale on scroll
    if (box2Ref.current) {
      gsap.fromTo(
        box2Ref.current,
        { scale: 0.5 },
        {
          scale: 1,
          duration: 1,
          scrollTrigger: {
            trigger: box2Ref.current,
            start: 'top 80%',
            end: 'top 50%',
            scrub: true,
          },
        }
      )
    }

    // Example 3: Rotate on scroll
    if (box3Ref.current) {
      gsap.fromTo(
        box3Ref.current,
        { rotation: -180 },
        {
          rotation: 0,
          duration: 1,
          scrollTrigger: {
            trigger: box3Ref.current,
            start: 'top 80%',
            end: 'top 50%',
            scrub: true,
          },
        }
      )
    }

    // Cleanup
    return () => {
      const triggers = ScrollTrigger.getAll()
      for (const trigger of triggers) {
        trigger.kill()
      }
    }
  }, [])

  return (
    <div ref={containerRef} className='space-y-96 py-20'>
      <div
        ref={box1Ref}
        className='mx-auto h-64 w-64 bg-blue-500 rounded-lg flex items-center justify-center text-white text-2xl font-bold'
      >
        Fade In
      </div>

      <div
        ref={box2Ref}
        className='mx-auto h-64 w-64 bg-green-500 rounded-lg flex items-center justify-center text-white text-2xl font-bold'
      >
        Scale
      </div>

      <div
        ref={box3Ref}
        className='mx-auto h-64 w-64 bg-purple-500 rounded-lg flex items-center justify-center text-white text-2xl font-bold'
      >
        Rotate
      </div>
    </div>
  )
}
