import { gsap } from 'gsap'

/**
 * HERO SECTION ANIMATION
 * Animates hero section children with stagger effect
 */
export const setupHeroAnimation = (element: HTMLDivElement) => {
  gsap.from(element.children, {
    y: 100,
    opacity: 0,
    duration: 1.2,
    stagger: 0.2,
    ease: 'power3.out',
  })
}
