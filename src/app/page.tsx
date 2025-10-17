import Hero from '@/components/Hero'
import About from '@/components/About'
import BusinessFinancing from '@/components/BusinessFinancing'
import Features from '@/components/Features'
import FAQ from '@/components/FAQ'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'
import CTA from '@/components/CTA'
import type { Metadata } from 'next'

// Deshabilitar prerenderización estática
export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Get $50K-$150K Business Funding at 0% Interest | Credit with Rami',
  description: 'Former US Business Banker Rami Noureddine helps entrepreneurs access $50K-$150K in business capital at 0% interest for up to 12 months. No complicated paperwork, no impossible requirements—just results.',
  keywords: [
    'business funding',
    '0% interest business loans',
    'business capital',
    'entrepreneur funding',
    'business credit cards',
    'LLC funding',
    'corporation funding',
    'business credit building',
    'Rami Noureddine',
    'business banker',
    'small business loans',
    'business financing'
  ],
  openGraph: {
    title: 'Get $50K-$150K Business Funding at 0% Interest | Credit with Rami',
    description: 'Former US Business Banker Rami Noureddine helps entrepreneurs access $50K-$150K in business capital at 0% interest for up to 12 months. No complicated paperwork—just results.',
    images: [
      {
        url: '/images/rami/rami-hero.png',
        width: 1200,
        height: 630,
        alt: 'Rami Noureddine - Former US Business Banker helping entrepreneurs get business funding',
      },
    ],
  },
  twitter: {
    title: 'Get $50K-$150K Business Funding at 0% Interest | Credit with Rami',
    description: 'Former US Business Banker Rami Noureddine helps entrepreneurs access business capital at 0% interest. No complicated paperwork—just results.',
    images: ['/images/rami/rami-hero.png'],
  },
  alternates: {
    canonical: 'https://creditwithrami.com',
  },
}

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <BusinessFinancing />
      <Features />
      <CTA />
      <FAQ />
      <Contact />
      <Footer />
    </>
  )
}
