'use client'

import { gsap } from 'gsap'
import { useEffect, useRef, useState } from 'react'

interface PreloaderProps {
  onLoadComplete: () => void
}

export function Preloader({ onLoadComplete }: PreloaderProps) {
  const [progress, setProgress] = useState(0)
  const [isInitialized, setIsInitialized] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const counterRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let loadingProgress = 0
    const targetProgress = 100

    const loadAssets = () => {
      // CHECK IF DOCUMENT IS READY
      if (document.readyState === 'complete') {
        loadingProgress = 50
      } else {
        loadingProgress = 20
      }

      // SIMULATE CHECKING FOR IMAGES
      const images = Array.from(document.images)
      let loadedImages = 0

      if (images.length === 0) {
        loadingProgress = 70
      } else {
        images.forEach((img) => {
          if (img.complete) {
            loadedImages++
          } else {
            img.addEventListener('load', () => {
              loadedImages++
              loadingProgress = 50 + (loadedImages / images.length) * 30
              setProgress(Math.min(Math.floor(loadingProgress), 90))
            })
          }
        })
        loadingProgress = 50 + (loadedImages / images.length) * 30
      }

      setProgress(Math.min(Math.floor(loadingProgress), 90))
    }

    const initAnimation = () => {
      setIsInitialized(true)

      gsap.fromTo(
        counterRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }
      )
    }

    initAnimation()
    loadAssets()

    const handleLoad = () => {
      loadingProgress = 90
      setProgress(90)

      gsap.to(
        { value: 90 },
        {
          value: targetProgress,
          duration: 0.5,
          ease: 'power2.inOut',
          onUpdate: function () {
            const currentProgress = Math.floor(this.targets()[0].value)
            setProgress(currentProgress)
          },
          onComplete: () => {
            setProgress(100)

            setTimeout(() => {
              animateOut()
            }, 300)
          },
        }
      )
    }

    const animateOut = () => {
      const tl = gsap.timeline({
        onComplete: () => {
          onLoadComplete()
        },
      })

      tl.to(counterRef.current, {
        opacity: 0,
        y: -30,
        duration: 0.5,
        ease: 'power2.inOut',
      }).to(
        containerRef.current,
        {
          yPercent: -100,
          duration: 0.8,
          ease: 'power3.inOut',
        },
        '-=0.4'
      )
    }

    if (document.readyState === 'complete') {
      setTimeout(() => {
        handleLoad()
      }, 200)
    } else {
      window.addEventListener('load', handleLoad)
    }

    return () => {
      window.removeEventListener('load', handleLoad)
    }
  }, [onLoadComplete])

  return (
    <div
      ref={containerRef}
      className='fixed inset-0 z-50 flex flex-col items-center justify-center overflow-hidden bg-neutral-800'
      style={{
        willChange: 'transform',
        backfaceVisibility: 'hidden',
        WebkitBackfaceVisibility: 'hidden',
      }}
    >
      <div className='relative z-10 flex flex-col items-center justify-center gap-12'>
        {/* COUNTER */}
        <div ref={counterRef} className='text-center primary-text opacity-0'>
          <div className='text-8xl md:text-9xl font-bold leading-none'>
            {isInitialized ? progress : 0}
            <span className='text-6xl md:text-7xl'>%</span>
          </div>
        </div>
      </div>

      <div className='absolute bottom-8 right-8 text-neutral-400 text-sm tracking-widest uppercase'>
        Initializing...
      </div>
    </div>
  )
}
