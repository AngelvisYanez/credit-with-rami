import type { Metadata } from 'next'
import './globals.css'
import StructuredData from '@/components/StructuredData'
import MetaPixel from '@/components/MetaPixel'

export const metadata: Metadata = {
  metadataBase: new URL('https://creditwithrami.com'),
  title: {
    default: 'Credit with Rami - Get $50K-$150K Business Funding at 0% Interest',
    template: '%s | Credit with Rami'
  },
  description: 'Former US Business Banker helping entrepreneurs access $50K-$150K in business capital at 0% interest for up to 12 months. No complicated paperwork, no impossible requirements—just results.',
  keywords: [
    'business funding',
    'business credit',
    '0% interest business loans',
    'business capital',
    'credit building',
    'business credit cards',
    'entrepreneur funding',
    'small business loans',
    'business financing',
    'credit repair',
    'Credit with Rami',
    'Rami Noureddine',
    'business banker',
    'business credit score',
    'LLC funding',
    'corporation funding'
  ],
  authors: [{ name: 'Rami Noureddine', url: 'https://creditwithrami.com' }],
  creator: 'Credit with Rami',
  publisher: 'Credit with Rami',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code', // Reemplazar con el código real
  },
  alternates: {
    canonical: 'https://creditwithrami.com',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://creditwithrami.com',
    title: 'Credit with Rami - Get $50K-$150K Business Funding at 0% Interest',
    description: 'Former US Business Banker helping entrepreneurs access $50K-$150K in business capital at 0% interest for up to 12 months. No complicated paperwork, no impossible requirements—just results.',
    siteName: 'Credit with Rami',
    images: [
      {
        url: '/images/rami/rami-hero.png',
        width: 1200,
        height: 630,
        alt: 'Rami Noureddine - Former US Business Banker helping entrepreneurs get business funding',
        type: 'image/png',
      },
      {
        url: '/images/rami/rami-1.png',
        width: 1200,
        height: 630,
        alt: 'Credit with Rami - Business Funding Expert',
        type: 'image/png',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@creditwithrami',
    creator: '@creditwithrami',
    title: 'Credit with Rami - Get $50K-$150K Business Funding at 0% Interest',
    description: 'Former US Business Banker helping entrepreneurs access business capital at 0% interest. No complicated paperwork—just results.',
    images: ['/images/rami/rami-hero.png'],
  },
  category: 'Business & Finance',
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#3b82f6',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="icon" href="/favicon.png" type="image/png" />
        <link rel="alternate icon" href="/favicon.svg" type="image/svg+xml" />
      </head>
      <body className="font-sans antialiased">
        <MetaPixel />
        <StructuredData />
        <div id="root">
          {children}
        </div>
      </body>
    </html>
  )
}
