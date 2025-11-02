import { setupFadeAnimation } from './fade-animation'
import { setupHeroAnimation } from './hero-animation'
import { setupParallaxAnimation } from './parallax-animation'
import { setupProgressAnimation } from './progress-animation'
import { setupScaleAnimation } from './scale-animation'
import { setupStaggerAnimation } from './stagger-animation'

/**
 * ANIMATION SETUP HELPER
 * Sets up all animations for the page
 */
export const setupAnimations = (refs: {
  hero: HTMLDivElement | null
  fade: HTMLDivElement | null
  scale: HTMLDivElement | null
  parallax: HTMLDivElement | null
  stagger: HTMLDivElement | null
  progress: HTMLDivElement | null
}) => {
  if (refs.hero) setupHeroAnimation(refs.hero)
  if (refs.fade) setupFadeAnimation(refs.fade)
  if (refs.scale) setupScaleAnimation(refs.scale)
  if (refs.parallax) setupParallaxAnimation(refs.parallax)
  if (refs.stagger) setupStaggerAnimation(refs.stagger)
  if (refs.progress) setupProgressAnimation(refs.progress)
}
