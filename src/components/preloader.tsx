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
    const progressBarRef = useRef<HTMLDivElement>(null)
    const counterRef = useRef<HTMLDivElement>(null)
    const textRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        let loadingProgress = 0
        const targetProgress = 100

        // SIMULATE ASSET LOADING WITH PROGRESS TRACKING
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

        // INITIAL ANIMATION - SET INITIALIZED AFTER ANIMATION STARTS
        const initAnimation = () => {
            setIsInitialized(true)

            // ANIMATE ALL ELEMENTS TOGETHER WITH NO STAGGER
            gsap.fromTo(
                counterRef.current,
                { opacity: 0, y: 20 },
                { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }
            )
            gsap.fromTo(
                textRef.current,
                { opacity: 0, y: 20 },
                { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }
            )
            // PROGRESS BAR CONTAINER ANIMATION (NOT THE FILL)
            if (progressBarRef.current?.parentElement) {
                gsap.fromTo(
                    progressBarRef.current.parentElement,
                    { opacity: 0 },
                    { opacity: 1, duration: 0.6, ease: 'power2.out' }
                )
            }
        }

        // START LOADING IMMEDIATELY
        initAnimation()
        loadAssets()

        // WINDOW LOAD EVENT
        const handleLoad = () => {
            loadingProgress = 90
            setProgress(90)

            // FINAL PROGRESS ANIMATION
            gsap.to({ value: 90 }, {
                value: targetProgress,
                duration: 0.5,
                ease: 'power2.inOut',
                onUpdate: function () {
                    const currentProgress = Math.floor(this.targets()[0].value)
                    setProgress(currentProgress)
                },
                onComplete: () => {
                    setProgress(100)
                    // DELAY BEFORE TRANSITION
                    setTimeout(() => {
                        animateOut()
                    }, 300)
                }
            })
        }

        // ANIMATE OUT FUNCTION
        const animateOut = () => {
            const tl = gsap.timeline({
                onComplete: () => {
                    onLoadComplete()
                }
            })

            tl.to(counterRef.current, {
                opacity: 0,
                y: -30,
                duration: 0.5,
                ease: 'power2.inOut'
            })
                .to(textRef.current, {
                    opacity: 0,
                    y: -30,
                    duration: 0.5,
                    ease: 'power2.inOut'
                }, '-=0.3')
                .to(progressBarRef.current, {
                    scaleX: 0,
                    transformOrigin: 'right center',
                    duration: 0.6,
                    ease: 'power2.inOut'
                }, '-=0.3')
                .to(containerRef.current, {
                    yPercent: -100,
                    duration: 0.8,
                    ease: 'power3.inOut'
                }, '-=0.4')
        }

        // CHECK IF ALREADY LOADED
        if (document.readyState === 'complete') {
            // SMALL DELAY TO ENSURE INITIALIZATION COMPLETES
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

    // ANIMATE PROGRESS BAR
    useEffect(() => {
        if (progressBarRef.current) {
            gsap.to(progressBarRef.current, {
                scaleX: progress / 100,
                duration: 0.3,
                ease: 'power2.out',
                transformOrigin: 'left center'
            })
        }
    }, [progress])

    return (
        <div
            ref={containerRef}
            className="fixed inset-0 z-9999 flex flex-col items-center justify-center overflow-hidden shadow-lg "
            style={{
                willChange: 'transform',
                backfaceVisibility: 'hidden',
                WebkitBackfaceVisibility: 'hidden',
            }}
        >

            {/* CONTENT */}
            <div className="relative z-10 flex flex-col items-center justify-center gap-12">
                {/* COUNTER */}
                <div ref={counterRef} className="text-center primary-text opacity-0">
                    <div className="text-8xl md:text-9xl font-bold leading-none">
                        {isInitialized ? progress : 0}
                        <span className="text-6xl md:text-7xl">%</span>
                    </div>
                </div>


                {/* PROGRESS BAR CONTAINER */}
                {/* <div className="w-80 md:w-96 h-1 rounded-full overflow-hidden" style={{ background: 'var(--dark-text)', opacity: 0 }}>
                    <div
                        ref={progressBarRef}
                        className="h-full primary-bg rounded-full origin-left will-change-transform"
                        style={{ transform: 'scaleX(0)' }}
                    />
                </div> */}
            </div>

            {/* CORNER ACCENT */}
            <div className="absolute bottom-8 right-8 dark-text text-sm tracking-widest uppercase">
                Initializing
            </div>
        </div>
    )
}
