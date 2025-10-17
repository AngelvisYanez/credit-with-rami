import type { Metadata } from 'next'

// Deshabilitar prerenderización estática
export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Admin Dashboard - Credit with Rami',
  description: 'Administrative dashboard for Credit with Rami business funding platform. Manage appointments, clients, and business operations.',
  robots: {
    index: false,
    follow: false,
  },
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
