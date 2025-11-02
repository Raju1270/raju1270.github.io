import { gsap } from 'gsap'
import { SCROLL_CONFIG } from './config'

/**
 * PROGRESS BAR ANIMATION
 * Updates progress bar based on scroll position
 */
export const setupProgressAnimation = (element: HTMLDivElement) => {
  gsap.to(element, {
    scaleY: 1,
    ease: 'none',
    scrollTrigger: {
      trigger: document.body,
      start: 'top top',
      end: 'bottom bottom',
      scrub: true,
      ...SCROLL_CONFIG,
    },
  })
}
