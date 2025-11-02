import { gsap } from 'gsap'
import { SCROLL_CONFIG } from './config'

/**
 * STAGGER ANIMATION
 * Animates multiple items with stagger delay
 */
export const setupStaggerAnimation = (element: HTMLDivElement) => {
  const items = element.querySelectorAll('.stagger-item')
  gsap.fromTo(
    items,
    { opacity: 0, y: 50 },
    {
      opacity: 1,
      y: 0,
      stagger: 0.1,
      scrollTrigger: {
        trigger: element,
        start: 'top 70%',
        end: 'top 40%',
        scrub: true,
        ...SCROLL_CONFIG,
      },
    }
  )
}
