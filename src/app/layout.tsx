import type { Metadata } from 'next'
import { LenisProvider } from '@/components/lenis-provider'
import { LoadingProvider } from '@/components/loading-provider'
import './globals.css'

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
    <html lang='en' suppressHydrationWarning>
      <body className='antialiased'>
        {/* <Cursor /> */}
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
    <div className='fixed top-0 left-0 h-full w-14 z-40 flex flex-col items-center py-3'>
      <div className=''>
        <div className='flex h-12 items-center justify-between'>
          <div className='flex flex-col gap-2'>
            <div className='w-6 h-0.5 rounded-full bg-neutral-300'></div>
            <div className='w-3 h-0.5 rounded-full bg-neutral-300'></div>
          </div>
        </div>
      </div>
    </div>
  )
}
