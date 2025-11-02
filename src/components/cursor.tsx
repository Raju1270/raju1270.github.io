'use client'

import { gsap } from 'gsap'
import { useEffect, useRef, useState } from 'react'

export default function Cursor() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const cursorInnerRef = useRef<HTMLDivElement>(null)
  const [cursorText, setCursorText] = useState('')
  const [hoveredElement, setHoveredElement] = useState<HTMLElement | null>(null)

  useEffect(() => {
    const cursor = cursorRef.current
    const cursorInner = cursorInnerRef.current

    if (!cursor || !cursorInner) return

    let mouseX = 0
    let mouseY = 0
    let currentElement: HTMLElement | null = null

    // Initialize cursor position off-screen
    gsap.set(cursor, { x: -100, y: -100, opacity: 0, xPercent: -50, yPercent: -50 })
    gsap.set(cursorInner, { x: -100, y: -100, opacity: 0, xPercent: -50, yPercent: -50 })

    // Mouse move handler
    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY

      if (!currentElement) {
        // Normal cursor follow
        gsap.to(cursor, {
          x: mouseX,
          y: mouseY,
          duration: 0.6,
          ease: 'power2.out',
        })

        gsap.to(cursorInner, {
          x: mouseX,
          y: mouseY,
          duration: 0.15,
          ease: 'power2.out',
        })
      }
    }

    // Mouse enter handler (when cursor enters viewport)
    const handleMouseEnter = (e: MouseEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY

      gsap.set(cursor, { x: mouseX, y: mouseY })
      gsap.set(cursorInner, { x: mouseX, y: mouseY })

      gsap.to(cursor, {
        opacity: 1,
        scale: 1,
        duration: 0.4,
        ease: 'power2.out',
      })
      gsap.to(cursorInner, {
        opacity: 1,
        scale: 1,
        duration: 0.4,
        ease: 'power2.out',
      })
    }

    // Mouse leave handler (when cursor leaves viewport)
    const handleMouseLeave = () => {
      gsap.to(cursor, {
        opacity: 0,
        scale: 0,
        duration: 0.3,
        ease: 'power2.out',
      })
      gsap.to(cursorInner, {
        opacity: 0,
        scale: 0,
        duration: 0.3,
        ease: 'power2.out',
      })
    }

    // Handle hoverable elements - morph cursor to button shape
    const handleElementHover = (e: Event) => {
      const target = e.target as HTMLElement
      currentElement = target
      setHoveredElement(target)

      const text = target.getAttribute('data-cursor-text')
      if (text) setCursorText(text)

      // Get button dimensions and position
      const rect = target.getBoundingClientRect()
      const width = rect.width
      const height = rect.height
      const left = rect.left + width / 2
      const top = rect.top + height / 2

      // Morph cursor to match button size and position
      gsap.to(cursor, {
        x: left,
        y: top,
        width: width,
        height: height,
        borderRadius: getComputedStyle(target).borderRadius || '0.5rem',
        duration: 0.4,
        ease: 'power3.out',
      })

      // Hide inner cursor
      gsap.to(cursorInner, {
        scale: 0,
        opacity: 0,
        duration: 0.3,
        ease: 'power2.out',
      })

      // Add tracking for button movement (for magnetic effect)
      const trackButton = () => {
        if (currentElement === target) {
          const newRect = target.getBoundingClientRect()
          const newLeft = newRect.left + newRect.width / 2
          const newTop = newRect.top + newRect.height / 2

          gsap.to(cursor, {
            x: newLeft,
            y: newTop,
            duration: 0.2,
            ease: 'power2.out',
            overwrite: true,
          })
          requestAnimationFrame(trackButton)
        }
      }
      trackButton()
    }

    const handleElementLeave = () => {
      currentElement = null
      setHoveredElement(null)
      setCursorText('')

      // Reset cursor to normal size
      gsap.to(cursor, {
        width: 32,
        height: 32,
        borderRadius: '50%',
        x: mouseX,
        y: mouseY,
        duration: 0.4,
        ease: 'power3.out',
      })

      // Show inner cursor
      gsap.to(cursorInner, {
        scale: 1,
        opacity: 1,
        duration: 0.3,
        ease: 'power2.out',
      })
    }

    // Add event listeners
    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseenter', handleMouseEnter)
    document.addEventListener('mouseleave', handleMouseLeave)

    // Add hover effects to interactive elements
    const hoverElements = document.querySelectorAll('a, button, [data-cursor="hover"]')
    hoverElements.forEach((element) => {
      element.addEventListener('mouseenter', handleElementHover)
      element.addEventListener('mouseleave', handleElementLeave)
    })

    // Handle click animation
    const handleClick = () => {
      if (currentElement) {
        gsap
          .timeline()
          .to(cursor, {
            scale: 0.95,
            duration: 0.1,
            ease: 'power2.out',
          })
          .to(cursor, {
            scale: 1,
            duration: 0.2,
            ease: 'power2.out',
          })
      } else {
        gsap
          .timeline()
          .to(cursor, {
            scale: 0.8,
            duration: 0.1,
            ease: 'power2.out',
          })
          .to(cursor, {
            scale: 1,
            duration: 0.2,
            ease: 'back.out(1.7)',
          })
      }
    }

    document.addEventListener('click', handleClick)

    // Cleanup
    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseenter', handleMouseEnter)
      document.removeEventListener('mouseleave', handleMouseLeave)
      document.removeEventListener('click', handleClick)

      hoverElements.forEach((element) => {
        element.removeEventListener('mouseenter', handleElementHover)
        element.removeEventListener('mouseleave', handleElementLeave)
      })
    }
  }, [])

  return (
    <>
      {/* Morphing cursor */}
      <div
        ref={cursorRef}
        className='fixed top-0 left-0 w-8 h-8 pointer-events-none z-9999 hidden lg:block'
      >
        <div className='w-full h-full rounded-full border border-white/30 bg-white/10 backdrop-blur-md flex items-center justify-center transition-all duration-300'>
          {cursorText && hoveredElement && (
            <span className='text-sm font-medium text-white whitespace-nowrap px-4'>
              {cursorText}
            </span>
          )}
        </div>
      </div>

      {/* Inner cursor dot */}
      <div
        ref={cursorInnerRef}
        className='fixed top-0 left-0 w-2 h-2 pointer-events-none z-9999 hidden lg:block'
      >
        <div className='w-full h-full rounded-full bg-white mix-blend-difference' />
      </div>
    </>
  )
}
