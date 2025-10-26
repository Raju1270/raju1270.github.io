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
  title: 'Raju',
  description: 'Portfolio',
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
