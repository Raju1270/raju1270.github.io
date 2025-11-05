'use client'

import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useEffect, useId, useRef } from 'react'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

interface AnimatedSignatureProps {
  className?: string
}

export default function AnimatedSignature({ className = '' }: AnimatedSignatureProps) {
  const svgRef = useRef<SVGSVGElement>(null)
  const titleId = useId()

  useEffect(() => {
    if (!svgRef.current) return

    const paths = svgRef.current.querySelectorAll('path')
    
    // Set initial state - hide all paths
    paths.forEach((path) => {
      const length = path.getTotalLength()
      
      // Set stroke properties for drawing effect
      gsap.set(path, {
        strokeDasharray: length,
        strokeDashoffset: length,
        fill: 'none',
        stroke: '#ffb261',
        strokeWidth: 2,
      })
    })

    // Create scroll-triggered drawing animation
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: svgRef.current,
        start: 'top 80%',
        end: 'bottom 60%',
        scrub: 1,
        // markers: true, // Uncomment for debugging
      },
    })

    // Animate each path sequentially (signature drawing effect)
    paths.forEach((path, index) => {
      tl.to(
        path,
        {
          strokeDashoffset: 0,
          duration: 1,
          ease: 'none',
        },
        index * 0.3 // Stagger each path
      )
      
      // Fill the path after drawing (optional)
      tl.to(
        path,
        {
          // fill: 'currentColor',
          stroke: '#ffb261',
          duration: 0.3,
          ease: 'power2.inOut',
        },
        `+=${0.1}`
      )
    })

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.vars.trigger === svgRef.current) {
          trigger.kill()
        }
      })
    }
  }, [])

  return (
    <svg
      ref={svgRef}
      className={`${className} `}
      width='300'
      height='300'
      viewBox='0 0 222 247'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      aria-labelledby={titleId}
    >
      <title id={titleId}>Animated Signature</title>
      <path d='M21.3348 19.4989L1.43938 34.4205C0.811879 34.8911 0.946486 35.87 1.66969 36.1737C10.086 39.7078 13.2019 43.3945 13 53.5V157.5C13.2295 164.04 11.3616 166.921 6.08838 170.32C5.54084 170.672 5.45053 171.443 5.91486 171.9L34.2987 199.826C34.9309 200.448 36 200 36 199.113V49.2347C36 48.3706 37.022 47.9133 37.6663 48.4891L59.1663 67.7018C59.3786 67.8915 59.5 68.1628 59.5 68.4475V203C59.3256 209.965 57.2827 212.699 52.1457 215.824C51.5772 216.17 51.4769 216.962 51.9551 217.424L80.3046 244.859C80.9391 245.473 82 245.024 82 244.141V13.5C82 12.9477 82.4477 12.5 83 12.5H139C139.552 12.5 140 12.9477 140 13.5V64.7732C140 65.636 141.019 66.0938 141.664 65.5206L162.164 47.2983C162.378 47.1086 162.5 46.8366 162.5 46.5509V12.5C162.949 7.18972 165.052 6.00361 170.065 5.57059C170.59 5.52527 171 5.0906 171 4.56391V1.5C171 0.947715 170.552 0.5 170 0.5H52C51.4477 0.5 51 0.947715 51 1.5V4.61394C51 5.11966 51.3804 5.5442 51.881 5.61641C57.3306 6.40264 59.3625 8.06029 59.5 14V51.2212C59.5 52.0921 58.4639 52.5468 57.8229 51.9571L22.6119 19.5629C22.2572 19.2367 21.7204 19.2097 21.3348 19.4989Z' />
      <path d='M90 84.2903V96.5609C90 96.8407 90.1172 97.1078 90.3233 97.2971L139.177 142.203C139.383 142.392 139.5 142.659 139.5 142.939V244.64C139.5 245.523 140.561 245.973 141.196 245.358L170.032 217.437C170.514 216.97 170.408 216.172 169.834 215.825C164.112 212.373 162.379 209.001 162 201.5V148.436C162 148.158 161.884 147.893 161.681 147.703L120.29 109.234C119.864 108.838 119.865 108.163 120.292 107.768L184.321 48.5527C184.961 47.9605 186 48.4147 186 49.2869V199.113C186 200 187.069 200.448 187.701 199.826L216.032 171.953C216.512 171.48 216.394 170.677 215.813 170.336C211.069 167.557 209.343 164.76 209 157.5V52.5C209.176 43.3974 211.651 39.5886 219.857 36.1547C220.574 35.8545 220.721 34.8882 220.11 34.4077L201.166 19.523C200.781 19.2211 200.235 19.2411 199.874 19.5701L111.179 100.381C110.795 100.731 110.207 100.729 109.826 100.375L91.6798 83.5569C91.0397 82.9636 90 83.4176 90 84.2903Z' />
    </svg>
  )
}
