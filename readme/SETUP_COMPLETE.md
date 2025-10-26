# 🎨 GSAP + Lenis Integration Complete!

Your Next.js project is now fully configured with **GSAP** and **Lenis** for smooth scrolling and advanced scroll-triggered animations.

## 📦 What's Been Added

### Dependencies
- ✅ GSAP v3.13.0 (already installed)
- ✅ Lenis v1.3.11 (already installed)

### Files Created

#### Core Setup
1. **`src/components/lenis-provider.tsx`**
   - Lenis initialization with GSAP ScrollTrigger integration
   - Automatic cleanup on unmount
   - Wraps your entire app for smooth scrolling

2. **`src/app/layout.tsx`** (updated)
   - Integrated LenisProvider
   - Applied to entire application

3. **`src/app/globals.css`** (updated)
   - Added Lenis recommended CSS styles
   - Ensures smooth scrolling works correctly

#### Example Components
4. **`src/components/scroll-example.tsx`**
   - Basic scroll animation examples
   - Fade in, scale, and rotate effects

5. **`src/components/animation-examples.tsx`**
   - 10 reusable animation components:
     - FadeIn
     - Parallax
     - PinSection
     - HorizontalScroll
     - StaggerReveal
     - ScaleOnScroll
     - RotateOnScroll
     - ScrollProgress
     - TextReveal
     - ClipPathReveal

6. **`src/app/examples/page.tsx`**
   - Full-page examples showcase
   - Demonstrates various animation patterns
   - Visit at `/examples`

#### Documentation
7. **`GSAP_LENIS_SETUP.md`**
   - Comprehensive setup guide
   - Usage examples and patterns
   - Common patterns and troubleshooting

8. **`QUICK_REFERENCE.md`**
   - Quick API reference
   - Common code snippets
   - Easing functions
   - Performance tips

## 🚀 Getting Started

### View the Examples
Your dev server is already running! Open your browser to:
- **Home page**: http://localhost:3000
- **Examples page**: http://localhost:3000/examples

### Basic Usage

```tsx
'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function MyComponent() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    gsap.fromTo(
      ref.current,
      { opacity: 0, y: 100 },
      {
        opacity: 1,
        y: 0,
        scrollTrigger: {
          trigger: ref.current,
          start: 'top 80%',
          end: 'top 50%',
          scrub: true,
        },
      }
    );
  }, []);

  return <div ref={ref}>Animated content</div>;
}
```

## 🎯 Key Features

### Lenis Configuration
- ✅ Smooth wheel scrolling
- ✅ Linear interpolation (lerp: 0.1)
- ✅ Custom easing function
- ✅ Anchor link support
- ✅ Auto-resize on window resize
- ✅ Automatic RAF loop

### GSAP Integration
- ✅ ScrollTrigger synchronized with Lenis
- ✅ No lag smoothing for perfect timing
- ✅ Automatic cleanup in React components
- ✅ Full access to GSAP's animation library

## 📚 Documentation

### Essential Reading
1. **Start here**: `GSAP_LENIS_SETUP.md` - Complete setup guide
2. **Quick help**: `QUICK_REFERENCE.md` - API reference and snippets
3. **Examples**: Visit `/examples` page to see live demos

### External Resources
- [GSAP Documentation](https://gsap.com/docs/v3/)
- [ScrollTrigger Docs](https://gsap.com/docs/v3/Plugins/ScrollTrigger/)
- [Lenis Documentation](https://lenis.darkroom.engineering/)

## 🎨 Animation Components

Use the pre-built components from `animation-examples.tsx`:

```tsx
import { FadeIn, Parallax, ScaleOnScroll } from '@/components/animation-examples';

export default function Page() {
  return (
    <>
      <FadeIn>
        <h1>This fades in on scroll</h1>
      </FadeIn>

      <Parallax speed={50}>
        <img src="/image.jpg" alt="Parallax" />
      </Parallax>

      <ScaleOnScroll from={0.8} to={1}>
        <div>Scales on scroll</div>
      </ScaleOnScroll>
    </>
  );
}
```

## 🔧 Configuration

### Lenis Settings
Edit in `src/components/lenis-provider.tsx`:

```javascript
const lenis = new Lenis({
  autoRaf: true,        // Auto animation frame
  smoothWheel: true,    // Smooth wheel events
  lerp: 0.1,           // Smoothness (0-1)
  duration: 1.2,       // Animation duration
  orientation: 'vertical',
  anchors: true,       // Enable anchor links
});
```

### Prevent Smooth Scroll
Add to any element that should scroll normally:

```html
<div data-lenis-prevent>
  Modal or nested scroll content
</div>
```

## 🎬 Next Steps

1. **Explore the examples**: Visit http://localhost:3000/examples
2. **Read the setup guide**: Open `GSAP_LENIS_SETUP.md`
3. **Try the components**: Import from `animation-examples.tsx`
4. **Customize**: Adjust Lenis settings in `lenis-provider.tsx`
5. **Build**: Create your own scroll animations!

## 💡 Tips

- Use `scrub: true` for smooth scroll-linked animations
- Add `markers: true` to ScrollTrigger for debugging
- Check the Quick Reference for common patterns
- All animations automatically cleanup on unmount
- Use `'use client'` directive for components with GSAP

## 🐛 Troubleshooting

If animations aren't working:
1. ✅ Ensure component has `'use client'` directive
2. ✅ Check that GSAP is registered: `gsap.registerPlugin(ScrollTrigger)`
3. ✅ Verify ref is not null before animating
4. ✅ Add cleanup in useEffect return
