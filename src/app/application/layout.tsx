import type { Metadata } from 'next'

// Deshabilitar prerenderización estática
export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Apply for Business Funding - Get $50K-$150K at 0% Interest',
  description: 'Apply for business funding with Credit with Rami. Get $50K-$150K in business capital at 0% interest for up to 12 months. Former US Business Banker helping entrepreneurs succeed.',
  keywords: [
    'business funding application',
    'apply for business loan',
    'business credit application',
    '0% interest business funding',
    'entrepreneur funding application',
    'business capital application',
    'LLC funding application',
    'corporation funding application'
  ],
  openGraph: {
    title: 'Apply for Business Funding - Get $50K-$150K at 0% Interest',
    description: 'Apply for business funding with Credit with Rami. Get $50K-$150K in business capital at 0% interest for up to 12 months. Former US Business Banker helping entrepreneurs succeed.',
    images: [
      {
        url: '/images/rami/rami-hero.png',
        width: 1200,
        height: 630,
        alt: 'Apply for Business Funding with Credit with Rami',
      },
    ],
  },
  twitter: {
    title: 'Apply for Business Funding - Get $50K-$150K at 0% Interest',
    description: 'Apply for business funding with Credit with Rami. Get $50K-$150K in business capital at 0% interest for up to 12 months.',
    images: ['/images/rami/rami-hero.png'],
  },
  alternates: {
    canonical: 'https://creditwithrami.com/application',
  },
}

export default function ApplicationLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
