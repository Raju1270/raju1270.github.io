'use client'

import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'
import type { ReactNode } from 'react'
import { useEffect, useRef } from 'react'

// REGISTER GSAP SCROLL TRIGGER PLUGIN

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

interface LenisProviderProps {
  children: ReactNode
}

export function LenisProvider({ children }: LenisProviderProps) {
  const lenisRef = useRef<Lenis | null>(null)
  const rafIdRef = useRef<number | null>(null)

  useEffect(() => {
    // INITIALIZE LENIS
    const lenis = new Lenis({
      autoRaf: false,
      smoothWheel: true,
      lerp: 0.1,
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - 2 ** (-10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      wheelMultiplier: 1,
      touchMultiplier: 1,
      infinite: false,
      autoResize: true,
      overscroll: true,
      anchors: true,
    })

    lenisRef.current = lenis

    lenis.on('scroll', ScrollTrigger.update)

    function raf(time: number) {
      lenis.raf(time)
      rafIdRef.current = requestAnimationFrame(raf)
    }

    rafIdRef.current = requestAnimationFrame(raf)

    gsap.ticker.lagSmoothing(0)

    const handleVisibilityChange = () => {
      if (document.hidden) {
        if (rafIdRef.current !== null) {
          cancelAnimationFrame(rafIdRef.current)
          rafIdRef.current = null
        }
      } else {
        if (rafIdRef.current === null) {
          rafIdRef.current = requestAnimationFrame(raf)
        }

        setTimeout(() => {
          ScrollTrigger.refresh()
        }, 100)
      }
    }

    document.addEventListener('visibilitychange', handleVisibilityChange)

    const handleResize = () => {
      ScrollTrigger.refresh()
    }

    window.addEventListener('resize', handleResize)

    return () => {
      if (rafIdRef.current !== null) {
        cancelAnimationFrame(rafIdRef.current)
      }
      lenis.destroy()
      document.removeEventListener('visibilitychange', handleVisibilityChange)
      window.removeEventListener('resize', handleResize)
      ScrollTrigger.getAll().forEach((trigger) => {
        trigger.kill()
      })
    }
  }, [])

  return <>{children}</>
}
