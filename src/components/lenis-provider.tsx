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

  useEffect(() => {
    // INITIALIZE LENIS
    const lenis = new Lenis({
      autoRaf: true,
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

    // SYNCHRONIZE LENIS SCROLLING WITH GSAP'S SCROLL TRIGGER PLUGIN
    lenis.on('scroll', ScrollTrigger.update)

    // ADD LENIS'S REQUEST ANIMATION FRAME (RAF) METHOD TO GSAP'S TICKER
    // THIS ENSURES LENIS'S SMOOTH SCROLL ANIMATION UPDATES ON EACH GSAP TICK

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000) // SECONDS TO MILLISECONDS
    })

    // DISABLE LAG SMOOTHING IN GSAP TO PREVENT ANY DELAY IN SCROLL ANIMATIONS
    gsap.ticker.lagSmoothing(0)

    // CLEANUP
    return () => {
      lenis.destroy()
      gsap.ticker.remove((time) => {
        lenis.raf(time * 1000)
      })
    }
  }, [])

  return <>{children}</>
}
