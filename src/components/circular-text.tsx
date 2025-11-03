'use client'

import { IconArrowNarrowRight } from '@tabler/icons-react'
import { gsap } from 'gsap'
import { useEffect, useId, useRef } from 'react'

interface CircularTextProps {
  text?: string
  variant?: 'light' | 'dark'
}

export default function CircularText({
  text = 'DESIGN BY RAJU - MADE WITH LOVE - ',
  variant = 'dark',
}: CircularTextProps) {
  const textRef = useRef<SVGTextElement>(null)
  const pathId = useId()

  useEffect(() => {
    if (!textRef.current) return

    const animation = gsap.to(textRef.current, {
      duration: 30,
      ease: 'none',
      rotation: 360,
      transformOrigin: 'center',
      repeat: -1,
    })

    return () => {
      animation.kill()
    }
  }, [])

  return (
    <div
      className={`relative ${variant === 'light' ? 'w-45 h-45 md:w-90 md:h-90 mx-auto ' : 'w-45 h-45 md:w-60 md:h-60'} `}
    >
      <div className='absolute inset-0 flex items-center justify-center z-10'>
        <IconArrowNarrowRight
          className={variant === 'light' ? 'text-white' : 'text-(--text)'}
          size={66}
          strokeWidth={1.5}
        />
      </div>

      <svg
        className='pointer-events-none w-full h-full'
        width='100%'
        height='100%'
        viewBox='0 0 1400 1400'
        aria-label='Circular rotating text'
      >
        <title>Circular Text</title>
        <defs>
          <path
            id={pathId}
            d='M250,700.5A450.5,450.5 0 1 1 1151,700.5A450.5,450.5 0 1 1 250,700.5'
          />
        </defs>
        <text
          ref={textRef}
          className={`uppercase font-bold ${variant === 'light' ? 'fill-white' : 'fill-(--text)'}`}
          style={{
            fontSize: '130px',
          }}
        >
          <textPath xlinkHref={`#${pathId}`} textLength='2830' className='whitespace-pre'>
            {text}
          </textPath>
        </text>
      </svg>
    </div>
  )
}
