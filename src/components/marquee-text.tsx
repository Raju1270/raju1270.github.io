'use client'

import { gsap } from 'gsap'
import { useEffect, useRef } from 'react'

interface MarqueeTextProps {
  text: string
  direction?: 'left' | 'right'
}

export default function MarqueeText({ text, direction = 'left' }: MarqueeTextProps) {
  const marqueeRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!marqueeRef.current) return

    const marqueeElement = marqueeRef.current
    const marqueeContent = marqueeElement.querySelector('.marquee-content')

    if (!marqueeContent) return

    // Horizontal scroll animation - only moves on scroll
    gsap.to(marqueeContent, {
      x: direction === 'left' ? '-10%' : '10%',
      ease: 'none',
      scrollTrigger: {
        trigger: marqueeElement,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 5,
      },
    })
  }, [direction])

  return (
    <div ref={marqueeRef} className='overflow-hidden whitespace-nowrap w-full'>
      <div className='marquee-content inline-flex gap-16'>
        {Array.from({ length: 5 }, (_, i) => `${text}-${i}`).map((item) => (
          <span key={item} className='text-6xl lg:text-[16rem] font-bold primary-text'>
            {text}
          </span>
        ))}
      </div>
    </div>
  )
}
