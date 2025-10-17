import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET() {
  try {
    // Test database connection
    await prisma.$connect()
    
    // Test basic queries
    const appointmentCount = await prisma.appointment.count()
    const adminCount = await prisma.adminUser.count()
    
    // Test admin authentication
    const admin = await prisma.adminUser.findFirst({
      where: { username: 'rami' }
    })
    
    return NextResponse.json({
      success: true,
      message: 'Database connection successful',
      data: {
        appointmentCount,
        adminCount,
        adminExists: !!admin,
        adminUsername: admin?.username || null,
        timestamp: new Date().toISOString()
      }
    })
  } catch (error) {
    console.error('Database test error:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: 'Database connection failed',
        details: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    )
  } finally {
    await prisma.$disconnect()
  }
}