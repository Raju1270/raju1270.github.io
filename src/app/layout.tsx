import type { Metadata } from 'next'
import { LenisProvider } from '@/components/lenis-provider'
import { LoadingProvider } from '@/components/loading-provider'
import { SideBar } from '@/components/sidebar'
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
        <LoadingProvider sidebar={<SideBar />}>
          <LenisProvider>
            <main className='w-full'>{children}</main>
          </LenisProvider>
        </LoadingProvider>
      </body>
    </html>
  )
}
