# GSAP + Lenis Setup Guide

This project is configured with **GSAP** and **Lenis** for smooth scrolling and scroll-triggered animations.

## What's Installed

- **Lenis** (`^1.3.11`) - Smooth scroll library
- **GSAP** (`^3.13.0`) - Animation library with ScrollTrigger

## Project Structure

```
src/
├── app/
│   ├── layout.tsx          # Root layout with LenisProvider
│   ├── page.tsx            # Home page with examples
│   └── globals.css         # Global styles with Lenis CSS
└── components/
    ├── lenis-provider.tsx  # Lenis + GSAP setup
    └── scroll-example.tsx  # Example scroll animations
```

## How It Works

### 1. Lenis Provider

The `LenisProvider` component wraps your entire app in `layout.tsx` and:
- Initializes Lenis with smooth scrolling
- Integrates with GSAP's ScrollTrigger
- Handles automatic cleanup

### 2. Configuration

Lenis is configured with these settings:
```javascript
{
  autoRaf: true,              // Automatic requestAnimationFrame
  smoothWheel: true,          // Smooth wheel events
  lerp: 0.1,                 // Linear interpolation intensity
  duration: 1.2,             // Animation duration in seconds
  orientation: 'vertical',   // Scroll direction
  anchors: true              // Support anchor links
}
```

### 3. GSAP ScrollTrigger Integration

The integration synchronizes Lenis with GSAP:
```javascript
lenis.on('scroll', ScrollTrigger.update);
gsap.ticker.add((time) => {
  lenis.raf(time * 1000);
});
gsap.ticker.lagSmoothing(0);
```

## Usage Examples

### Basic Scroll Animation

```tsx
'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function MyComponent() {
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!elementRef.current) return;

    gsap.fromTo(
      elementRef.current,
      { opacity: 0, y: 100 },
      {
        opacity: 1,
        y: 0,
        scrollTrigger: {
          trigger: elementRef.current,
          start: 'top 80%',
          end: 'top 50%',
          scrub: true,
        },
      }
    );
  }, []);

  return <div ref={elementRef}>Animated content</div>;
}
```

### Prevent Smooth Scroll on Specific Elements

Using HTML attributes:
```html
<!-- Prevent all scroll events -->
<div data-lenis-prevent>Scrollable modal content</div>

<!-- Prevent only wheel events -->
<div data-lenis-prevent-wheel>Content</div>

<!-- Prevent only touch events -->
<div data-lenis-prevent-touch>Content</div>
```

Using JavaScript:
```javascript
const lenis = new Lenis({
  prevent: (node) => node.classList.contains('no-smooth-scroll'),
});
```

### Scroll to Element

```javascript
// Using CSS selector
lenis.scrollTo('#section-id');

// Using DOM element
lenis.scrollTo(document.querySelector('.my-section'));

// With options
lenis.scrollTo('#section', {
  offset: -100,
  duration: 2,
  easing: (t) => t,
  onComplete: () => console.log('Scroll complete'),
});
```

### Lenis Methods

```javascript
// Stop scrolling
lenis.stop();

// Resume scrolling
lenis.start();

// Manually trigger resize (if autoResize: false)
lenis.resize();

// Destroy instance
lenis.destroy();
```

### Access Lenis Instance

To access the Lenis instance from other components:

```tsx
'use client';

import { useEffect } from 'react';

export function MyComponent() {
  useEffect(() => {
    // Get Lenis instance (if you need direct access)
    const lenis = (window as any).lenis;
    
    if (lenis) {
      lenis.on('scroll', (e) => {
        console.log('Scroll:', e.scroll);
      });
    }
  }, []);

  return <div>Content</div>;
}
```

## Common Patterns

### Parallax Effect

```tsx
gsap.to(elementRef.current, {
  y: 100,
  scrollTrigger: {
    trigger: elementRef.current,
    start: 'top bottom',
    end: 'bottom top',
    scrub: true,
  },
});
```

### Pin Element During Scroll

```tsx
ScrollTrigger.create({
  trigger: elementRef.current,
  start: 'top top',
  end: '+=500',
  pin: true,
  pinSpacing: true,
});
```

### Timeline with ScrollTrigger

```tsx
const tl = gsap.timeline({
  scrollTrigger: {
    trigger: containerRef.current,
    start: 'top top',
    end: 'bottom bottom',
    scrub: true,
  },
});

tl.to(element1, { x: 100 })
  .to(element2, { rotation: 360 }, '<')
  .to(element3, { scale: 2 });
```

## Resources

- [Lenis Documentation](https://lenis.darkroom.engineering/)
- [GSAP Documentation](https://gsap.com/docs/v3/)
- [ScrollTrigger Documentation](https://gsap.com/docs/v3/Plugins/ScrollTrigger/)


## Notes

- Lenis is automatically initialized on mount
- ScrollTrigger is automatically synchronized with Lenis
- Cleanup is handled automatically on unmount
- Use `'use client'` directive for components that use GSAP or access Lenis
