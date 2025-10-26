'use client'

import { gsap } from 'gsap'
import type { ReactNode } from 'react'
import { useEffect, useRef, useState } from 'react'
import { Preloader } from './preloader'

interface LoadingProviderProps {
  children: ReactNode
}

export function LoadingProvider({ children }: LoadingProviderProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [showContent, setShowContent] = useState(false)
  const contentRef = useRef<HTMLDivElement>(null)

  const handleLoadComplete = () => {
    // SMALL DELAY BEFORE HIDING PRELOADER
    setTimeout(() => {
      setIsLoading(false)
      
      // SHOW CONTENT AFTER PRELOADER STARTS ANIMATING OUT
      setTimeout(() => {
        setShowContent(true)
        
        // ANIMATE CONTENT IN
        if (contentRef.current) {
          gsap.fromTo(
            contentRef.current,
            { 
              opacity: 0,
              y: 20,
            //   scale: 0.98
            },
            { 
              opacity: 1,
              y: 0,
            //   scale: 1,
              duration: 1.2,
              ease: 'power2.out'
            }
          )
        }
      }, 100) // WAIT FOR PRELOADER TO START SLIDING OUT
    }, 100)
  }

  useEffect(() => {
    // PREVENT SCROLLING DURING LOADING
    if (isLoading) {
      document.body.style.overflow = 'hidden'
      document.documentElement.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
      document.documentElement.style.overflow = ''
    }

    return () => {
      document.body.style.overflow = ''
      document.documentElement.style.overflow = ''
    }
  }, [isLoading])

  return (
    <>
      {isLoading && <Preloader onLoadComplete={handleLoadComplete} />}
      <div 
        ref={contentRef} 
        className="relative"
        style={{ 
          opacity: 0,
          visibility: showContent ? 'visible' : 'hidden',
          willChange: showContent ? 'transform, opacity' : 'auto'
        }}
      >
        {children}
      </div>
    </>
  )
}
