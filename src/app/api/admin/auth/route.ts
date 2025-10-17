import { NextRequest, NextResponse } from 'next/server'
import { authenticateAdmin } from '@/lib/database-prisma'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { username, password } = body

    if (!username || !password) {
      return NextResponse.json(
        { success: false, error: 'Username and password are required' },
        { status: 400 }
      )
    }

    // Try Prisma first, fallback to local database
    let admin
    try {
      admin = await authenticateAdmin(username, password)
    } catch (prismaError) {
      console.log('Prisma not available, using local database:', prismaError.message)
      // Fallback to local database
      const { authenticateAdmin: authenticateAdminLocal } = await import('@/lib/database')
      admin = authenticateAdminLocal(username, password)
    }

    if (admin) {
      // Remove password from response
      const { password: _, ...adminWithoutPassword } = admin
      
      return NextResponse.json({
        success: true,
        admin: adminWithoutPassword
      })
    } else {
      return NextResponse.json(
        { success: false, error: 'Invalid credentials' },
        { status: 401 }
      )
    }
  } catch (error) {
    console.error('Error in admin authentication:', error)
    return NextResponse.json(
      { success: false, error: 'Authentication failed' },
      { status: 500 }
    )
  }
}
