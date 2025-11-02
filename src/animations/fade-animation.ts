import { gsap } from 'gsap'
import { SCROLL_CONFIG } from './config'

/**
 * FADE IN ANIMATION
 * Fades in element and moves it up on scroll
 */
export const setupFadeAnimation = (element: HTMLDivElement) => {
  gsap.fromTo(
    element,
    { opacity: 0, y: 100 },
    {
      opacity: 1,
      y: 0,
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
