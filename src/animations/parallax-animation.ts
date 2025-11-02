import { gsap } from 'gsap'
import { SCROLL_CONFIG } from './config'

/**
 * PARALLAX ANIMATION
 * Creates parallax effect by moving element at different speed
 */
export const setupParallaxAnimation = (element: HTMLDivElement) => {
  gsap.to(element, {
    y: 200,
    scrollTrigger: {
      trigger: element,
      start: 'top bottom',
      end: 'bottom top',
      scrub: true,
      ...SCROLL_CONFIG,
    },
  })
}
