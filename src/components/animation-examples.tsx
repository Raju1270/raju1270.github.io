'use client'

import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useEffect, useRef } from 'react'

// Register plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

// Example 1: Simple Fade In
export function FadeIn({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!ref.current) return

    gsap.fromTo(
      ref.current,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        scrollTrigger: {
          trigger: ref.current,
          start: 'top 80%',
          end: 'top 50%',
          scrub: true,
        },
      }
    )
  }, [])

  return <div ref={ref}>{children}</div>
}

// Example 2: Parallax Effect
export function Parallax({ children, speed = 50 }: { children: React.ReactNode; speed?: number }) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!ref.current) return

    gsap.to(ref.current, {
      y: speed,
      scrollTrigger: {
        trigger: ref.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      },
    })
  }, [speed])

  return <div ref={ref}>{children}</div>
}

// Example 3: Pin Section
export function PinSection({
  children,
  duration = 500,
}: {
  children: React.ReactNode
  duration?: number
}) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!ref.current) return

    ScrollTrigger.create({
      trigger: ref.current,
      start: 'top top',
      end: `+=${duration}`,
      pin: true,
      pinSpacing: true,
    })
  }, [duration])

  return <div ref={ref}>{children}</div>
}

// Example 4: Horizontal Scroll
export function HorizontalScroll({ children }: { children: React.ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current || !scrollRef.current) return

    const scrollWidth = scrollRef.current.scrollWidth
    const containerWidth = containerRef.current.offsetWidth

    gsap.to(scrollRef.current, {
      x: -(scrollWidth - containerWidth),
      ease: 'none',
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: () => `+=${scrollWidth - containerWidth}`,
        pin: true,
        scrub: 1,
      },
    })
  }, [])

  return (
    <div ref={containerRef} className='overflow-hidden'>
      <div ref={scrollRef} className='flex'>
        {children}
      </div>
    </div>
  )
}

// Example 5: Stagger Animation
export function StaggerReveal({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!ref.current) return

    const items = ref.current.querySelectorAll('[data-stagger-item]')

    gsap.fromTo(
      items,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        stagger: 0.1,
        duration: 0.8,
        scrollTrigger: {
          trigger: ref.current,
          start: 'top 70%',
          end: 'top 40%',
          scrub: true,
        },
      }
    )
  }, [])

  return <div ref={ref}>{children}</div>
}

// Example 6: Scale on Scroll
export function ScaleOnScroll({
  children,
  from = 0.8,
  to = 1,
}: {
  children: React.ReactNode
  from?: number
  to?: number
}) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!ref.current) return

    gsap.fromTo(
      ref.current,
      { scale: from },
      {
        scale: to,
        scrollTrigger: {
          trigger: ref.current,
          start: 'top 80%',
          end: 'top 30%',
          scrub: true,
        },
      }
    )
  }, [from, to])

  return <div ref={ref}>{children}</div>
}

// Example 7: Rotate on Scroll
export function RotateOnScroll({
  children,
  rotation = 360,
}: {
  children: React.ReactNode
  rotation?: number
}) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!ref.current) return

    gsap.fromTo(
      ref.current,
      { rotation: 0 },
      {
        rotation,
        scrollTrigger: {
          trigger: ref.current,
          start: 'top 80%',
          end: 'top 30%',
          scrub: true,
        },
      }
    )
  }, [rotation])

  return <div ref={ref}>{children}</div>
}

// Example 8: Progress Indicator
export function ScrollProgress() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!ref.current) return

    gsap.to(ref.current, {
      scaleX: 1,
      ease: 'none',
      scrollTrigger: {
        trigger: document.body,
        start: 'top top',
        end: 'bottom bottom',
        scrub: true,
      },
    })
  }, [])

  return (
    <div className='fixed top-0 left-0 right-0 h-1 bg-gray-200 z-50'>
      <div ref={ref} className='h-full bg-blue-500 origin-left' style={{ scale: 0 }} />
    </div>
  )
}

// Example 9: Text Reveal
export function TextReveal({ text }: { text: string }) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!ref.current) return

    const chars = ref.current.querySelectorAll('.char')

    gsap.fromTo(
      chars,
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        stagger: 0.03,
        scrollTrigger: {
          trigger: ref.current,
          start: 'top 75%',
          end: 'top 50%',
          scrub: true,
        },
      }
    )
  }, [])

  return (
    <div ref={ref}>
      {text.split('').map((char, i) => (
        <span key={i + char} className='char inline-block'>
          {char === ' ' ? '\u00A0' : char}
        </span>
      ))}
    </div>
  )
}

// Example 10: Clip Path Reveal
export function ClipPathReveal({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!ref.current) return

    gsap.fromTo(
      ref.current,
      { clipPath: 'inset(100% 0% 0% 0%)' },
      {
        clipPath: 'inset(0% 0% 0% 0%)',
        duration: 1.5,
        scrollTrigger: {
          trigger: ref.current,
          start: 'top 80%',
          end: 'top 40%',
          scrub: true,
        },
      }
    )
  }, [])

  return <div ref={ref}>{children}</div>
}
