# GSAP + Lenis Quick Reference

## Lenis Methods

```javascript
// Scroll to target
lenis.scrollTo(target, options)
lenis.scrollTo('#section')
lenis.scrollTo(100) // pixels
lenis.scrollTo('.class', { offset: -100, duration: 2 })

// Control scrolling
lenis.start()  // Resume scrolling
lenis.stop()   // Pause scrolling

// Events
lenis.on('scroll', (e) => {
  console.log(e.scroll)      // Current scroll position
  console.log(e.limit)       // Max scroll value
  console.log(e.velocity)    // Current velocity
  console.log(e.direction)   // 1 (up) or -1 (down)
  console.log(e.progress)    // 0 to 1
})

// Cleanup
lenis.destroy()
```

## ScrollTrigger Basics

```javascript
// Basic trigger
ScrollTrigger.create({
  trigger: element,
  start: 'top center',  // "trigger scroller"
  end: 'bottom center',
  onEnter: () => {},
  onLeave: () => {},
  onEnterBack: () => {},
  onLeaveBack: () => {},
})

// With animation
gsap.to(element, {
  x: 100,
  scrollTrigger: {
    trigger: element,
    start: 'top 80%',
    end: 'top 30%',
    scrub: true,  // Smooth scrubbing
    markers: true,  // Debug markers
  }
})

// Pin element
ScrollTrigger.create({
  trigger: element,
  pin: true,
  start: 'top top',
  end: '+=500',
  pinSpacing: true,
})
```

## Common Start/End Values

```javascript
// Start positions
'top top'      // Trigger top hits scroller top
'top center'   // Trigger top hits scroller center
'top bottom'   // Trigger top hits scroller bottom
'center center'
'bottom top'
'top 80%'      // Trigger top hits 80% from top

// End positions
'bottom top'
'+=500'        // 500px after start
'bottom center'
```

## GSAP Animation Properties

```javascript
gsap.to(element, {
  // Position
  x: 100,
  y: 50,
  
  // Rotation
  rotation: 360,
  rotationX: 180,
  rotationY: 180,
  
  // Scale
  scale: 1.5,
  scaleX: 2,
  scaleY: 0.5,
  
  // Opacity
  opacity: 0.5,
  
  // Transform origin
  transformOrigin: 'center center',
  
  // Timing
  duration: 1,
  delay: 0.5,
  ease: 'power2.out',
  
  // Callbacks
  onStart: () => {},
  onComplete: () => {},
  onUpdate: () => {},
})
```

## Easing Functions

```javascript
// Power
'power1.in', 'power1.out', 'power1.inOut'
'power2.in', 'power2.out', 'power2.inOut'
'power3.in', 'power3.out', 'power3.inOut'
'power4.in', 'power4.out', 'power4.inOut'

// Back
'back.in', 'back.out', 'back.inOut'

// Elastic
'elastic.in', 'elastic.out', 'elastic.inOut'

// Bounce
'bounce.in', 'bounce.out', 'bounce.inOut'

// Circ
'circ.in', 'circ.out', 'circ.inOut'

// Expo
'expo.in', 'expo.out', 'expo.inOut'

// Sine
'sine.in', 'sine.out', 'sine.inOut'

// None
'none' or 'linear'
```

## Timeline

```javascript
const tl = gsap.timeline({
  scrollTrigger: {
    trigger: container,
    start: 'top top',
    end: 'bottom bottom',
    scrub: true,
  }
})

tl.to(el1, { x: 100 })
  .to(el2, { y: 100 }, '<')      // Same time as previous
  .to(el3, { rotation: 360 }, '-=0.5')  // 0.5s before previous ends
  .to(el4, { scale: 2 }, '+=1')  // 1s after previous ends
```

## Stagger

```javascript
gsap.to('.items', {
  y: 100,
  stagger: 0.1,  // 0.1s between each
  // OR
  stagger: {
    each: 0.1,
    from: 'start',  // 'start', 'center', 'end', 'edges'
    grid: [7, 15],  // For grid layouts
    axis: 'x',      // 'x' or 'y'
  }
})
```

## React Hooks Pattern

```tsx
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function Component() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!ref.current) return

    const ctx = gsap.context(() => {
      gsap.to(ref.current, {
        x: 100,
        scrollTrigger: {
          trigger: ref.current,
          start: 'top 80%',
          scrub: true,
        }
      })
    })

    return () => ctx.revert()
  }, [])

  return <div ref={ref}>Content</div>
}
```

## Debug Mode

```javascript
// Show markers for debugging
scrollTrigger: {
  markers: true,
  id: 'my-trigger',  // Label for marker
}

// Refresh all ScrollTriggers
ScrollTrigger.refresh()

// Kill all ScrollTriggers
ScrollTrigger.getAll().forEach(st => st.kill())
```

## Common Patterns

### Fade In on Scroll
```javascript
gsap.fromTo(element, 
  { opacity: 0, y: 50 },
  {
    opacity: 1,
    y: 0,
    scrollTrigger: {
      trigger: element,
      start: 'top 80%',
      end: 'top 50%',
      scrub: true,
    }
  }
)
```

### Parallax
```javascript
gsap.to(element, {
  y: 100,
  scrollTrigger: {
    trigger: element,
    start: 'top bottom',
    end: 'bottom top',
    scrub: true,
  }
})
```

### Horizontal Scroll
```javascript
gsap.to(elements, {
  xPercent: -100 * (elements.length - 1),
  ease: 'none',
  scrollTrigger: {
    trigger: container,
    pin: true,
    scrub: 1,
    end: () => `+=${container.offsetWidth}`,
  }
})
```

### Text Reveal
```javascript
gsap.fromTo(chars,
  { opacity: 0, y: 20 },
  {
    opacity: 1,
    y: 0,
    stagger: 0.03,
    scrollTrigger: {
      trigger: container,
      start: 'top 75%',
      scrub: true,
    }
  }
)
```

## Performance Tips

1. Use `will-change` CSS property for animated elements
2. Use `scrub: 1` instead of `scrub: true` for smoother performance
3. Avoid animating `height` or `width`, use `scaleY` and `scaleX`
4. Use `invalidateOnRefresh: true` if content changes
5. Batch DOM reads before writes
6. Use `gsap.context()` in React for automatic cleanup

## Prevent Scroll on Elements

```html
<!-- Prevent smooth scroll -->
<div data-lenis-prevent>Modal content</div>

<!-- Prevent wheel only -->
<div data-lenis-prevent-wheel>Content</div>

<!-- Prevent touch only -->
<div data-lenis-prevent-touch>Content</div>
```

## Resources

- [GSAP Cheat Sheet](https://gsap.com/cheatsheet/)
- [ScrollTrigger Demos](https://codepen.io/collection/DkvGzg)
- [Lenis Demos](https://github.com/darkroom-engineering/lenis#examples)
