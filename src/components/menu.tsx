'use client'

import { gsap } from 'gsap'
import Link from 'next/link'
import { useEffect, useRef } from 'react'

interface MenuProps {
  isOpen: boolean
  onClose: () => void
}

const menuItems = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Work', href: '/work' },
  { name: 'Contact', href: '/contact' },
]

export function Menu({ isOpen, onClose }: MenuProps) {
  const menuRef = useRef<HTMLDivElement>(null)
  const overlayRef = useRef<HTMLButtonElement>(null)
  const itemsRef = useRef<(HTMLElement | null)[]>([])

  useEffect(() => {
    if (!menuRef.current || !overlayRef.current) return

    if (isOpen) {
      // ENTRY ANIMATION
      const tl = gsap.timeline()

      // SHOW OVERLAY
      tl.to(overlayRef.current, {
        opacity: 1,
        duration: 0.3,
        ease: 'power2.out',
      })

      // SLIDE IN MENU
      tl.to(
        menuRef.current,
        {
          x: 0,
          duration: 0.6,
          ease: 'power3.out',
        },
        '-=0.2'
      )

      // STAGGER MENU ITEMS
      tl.fromTo(
        itemsRef.current.filter(Boolean),
        {
          opacity: 0,
          y: 30,
          rotateX: -15,
        },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          duration: 0.5,
          stagger: 0.1,
          ease: 'power2.out',
        },
        '-=0.3'
      )
    } else {
      // EXIT ANIMATION
      const tl = gsap.timeline()

      // HIDE MENU ITEMS
      tl.to(itemsRef.current.filter(Boolean), {
        opacity: 0,
        y: -20,
        duration: 0.3,
        stagger: 0.05,
        ease: 'power2.in',
      })

      // SLIDE OUT MENU
      tl.to(
        menuRef.current,
        {
          x: '100%',
          duration: 0.5,
          ease: 'power3.in',
        },
        '-=0.2'
      )

      // HIDE OVERLAY
      tl.to(
        overlayRef.current,
        {
          opacity: 0,
          duration: 0.3,
          ease: 'power2.in',
        },
        '-=0.4'
      )
    }
  }, [isOpen])

  if (!isOpen && menuRef.current) {
    const style = window.getComputedStyle(menuRef.current)
    if (style.opacity === '0') return null
  }

  return (
    <>
      {/* OVERLAY */}
      <button
        ref={overlayRef}
        type='button'
        className='fixed inset-0 bg-black/60 backdrop-blur-sm z-998 opacity-0 w-full h-full border-none cursor-default'
        onClick={onClose}
        style={{ pointerEvents: isOpen ? 'auto' : 'none' }}
        aria-label='Close menu'
      />

      {/* MENU PANEL */}
      <div
        ref={menuRef}
        className='fixed top-0 right-0 h-full w-full md:w-[500px] bg-(--background) z-999 translate-x-full'
        style={{ willChange: 'transform' }}
      >
        {/* CLOSE BUTTON */}
        <div className='absolute top-8 right-8'>
          <button
            type='button'
            onClick={onClose}
            className='w-12 h-12 flex items-center justify-center rounded-full border border-neutral-700 hover:border-(--text) transition-colors group'
            aria-label='Close menu'
          >
            <div className='relative w-6 h-6'>
              <span className='absolute top-1/2 left-0 w-full h-0.5 bg-(--text) rotate-45 origin-center group-hover:rotate-90 transition-transform duration-300'></span>
              <span className='absolute top-1/2 left-0 w-full h-0.5 bg-(--text) -rotate-45 origin-center group-hover:-rotate-90 transition-transform duration-300'></span>
            </div>
          </button>
        </div>

        {/* MENU CONTENT */}
        <div className='flex flex-col justify-center h-full px-16 md:px-20'>
          <nav>
            <ul className='space-y-2'>
              {menuItems.map((item, index) => (
                <li
                  key={item.href}
                  ref={(el) => {
                    itemsRef.current[index] = el
                  }}
                  className='opacity-0'
                  style={{ perspective: '1000px' }}
                >
                  <Link
                    href={item.href}
                    onClick={onClose}
                    className='group relative block py-4 overflow-hidden'
                  >
                    <span className='relative text-6xl md:text-7xl font-bold text-(--text) inline-block transition-transform duration-500 group-hover:translate-x-4'>
                      {item.name}
                    </span>
                    <span className='absolute bottom-0 left-0 w-0 h-0.5 bg-(--primary) transition-all duration-500 group-hover:w-full'></span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* FOOTER INFO */}
          <div
            className='mt-16 space-y-4 opacity-0'
            ref={(el) => {
              itemsRef.current[menuItems.length] = el
            }}
          >
            <div className='flex gap-6 text-sm text-neutral-400'>
              <Link href='https://github.com' className='hover:text-(--text) transition-colors'>
                GitHub
              </Link>
              <Link href='https://linkedin.com' className='hover:text-(--text) transition-colors'>
                LinkedIn
              </Link>
              <Link href='https://twitter.com' className='hover:text-(--text) transition-colors'>
                Twitter
              </Link>
            </div>
            <p className='text-xs text-neutral-500'>
              © {new Date().getFullYear()} Raju. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </>
  )
}
