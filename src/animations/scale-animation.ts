import { gsap } from 'gsap'
import { SCROLL_CONFIG } from './config'

/**
 * SCALE ANIMATION
 * Scales up element from 0.5 to 1 on scroll
 */
export const setupScaleAnimation = (element: HTMLDivElement) => {
  gsap.fromTo(
    element,
    { scale: 0.5 },
    {
      scale: 1,
      scrollTrigger: {
        trigger: element,
        start: 'top 80%',
        end: 'top 50%',
        scrub: true,
        ...SCROLL_CONFIG,
      },
    }
  )
}
