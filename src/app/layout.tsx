import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { LenisProvider } from '@/components/lenis-provider'
import { LoadingProvider } from '@/components/loading-provider'
import './globals.css'

const _geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const _geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Raju - Full Stack Developer',
  description:
    'Passionate full stack developer focused on scalable applications, enriching user experiences, and impactful projects. Experienced in MERN Stack, Next.js, Go, and modern web technologies.',
  keywords: [
    'Full Stack Developer',
    'React',
    'Next.js',
    'JavaScript',
    'MERN Stack',
    'Go',
    'Web Developer',
  ],
  authors: [{ name: 'Raju' }],
  openGraph: {
    title: 'Raju - Full Stack Developer',
    description: 'Passionate developer creating scalable applications with modern technologies',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en'>
      <body className='antialiased'>
        <LoadingProvider>
          <LenisProvider>
            <div className='flex min-h-screen relative'>
              <SideBar />
              <main className='pt-16 w-full'>{children}</main>
            </div>
          </LenisProvider>
        </LoadingProvider>
      </body>
    </html>
  )
}

const SideBar = () => {
  return (
    <div className='fixed top-0 left-0 h-full w-14 z-40 flex flex-col items-center py-2'>
      <div className=''>
        <div className='flex h-12 items-center justify-between'>
          <div className='flex flex-col gap-1.5 relative group cursor-pointer'>
            <span className='w-6 h-0.5 rounded-full bg-neutral-200 relative overflow-hidden'>
              <span className='absolute bottom-0 -left-1 w-1 h-0.5 rounded-full bg-black translate-x-0 group-hover:translate-x-[650%] transition-transform duration-500 ease-in-out'></span>
            </span>
            <span className='w-4 h-0.5 rounded-full bg-neutral-200 relative overflow-hidden'>
              <span className='absolute bottom-0 -left-1 w-1 h-0.5 rounded-full bg-black translate-x-0 group-hover:translate-x-[500%] transition-transform duration-550 ease-in-out'></span>
            </span>

          </div>
        </div>
      </div>
    </div>
  )
}
