import { NextRequest, NextResponse } from 'next/server'
import { createAppointment as createAppointmentPrisma, getAppointments as getAppointmentsPrisma } from '@/lib/database-prisma'
import { createAppointment as createAppointmentLocal, getAllAppointments as getAppointmentsLocal } from '@/lib/database'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Validate required fields
    const { 
      name, 
      email, 
      phone, 
      businessName, 
      businessType,
      creditCards,
      establishedBusiness,
      strongCreditScore,
      cleanHistory,
      message, 
      preferredDate, 
      preferredTime,
      timezone,
      isEligible,
      eligibilityReason
    } = body
    
    if (!name || !email || !phone) {
      return NextResponse.json(
        { error: 'Name, email, and phone are required' },
        { status: 400 }
      )
    }

    // Try Prisma first, fallback to local database
    let appointment
    try {
      appointment = await createAppointmentPrisma({
        name,
        email,
        phone,
        businessName: businessName || '',
        businessType: businessType || '',
        creditCards: creditCards || '',
        establishedBusiness: establishedBusiness || '',
        strongCreditScore: strongCreditScore || '',
        cleanHistory: cleanHistory || '',
        message: message || '',
        preferredDate: preferredDate || '',
        preferredTime: preferredTime || '',
        timezone: timezone || 'EST',
        isEligible: isEligible || false,
        eligibilityReason: eligibilityReason || ''
      })
    } catch (prismaError) {
      console.log('Prisma not available, using local database:', prismaError.message)
      // Fallback to local database
      appointment = createAppointmentLocal({
        name,
        email,
        phone,
        businessName: businessName || '',
        businessType: businessType || '',
        creditCards: creditCards || '',
        establishedBusiness: establishedBusiness || '',
        strongCreditScore: strongCreditScore || '',
        cleanHistory: cleanHistory || '',
        message: message || '',
        preferredDate: preferredDate || '',
        preferredTime: preferredTime || '',
        timezone: timezone || 'EST',
        isEligible: isEligible || false,
        eligibilityReason: eligibilityReason || ''
      })
    }

    return NextResponse.json(appointment, { status: 201 })
  } catch (error) {
    console.error('Error creating appointment:', error)
    return NextResponse.json(
      { error: 'Failed to create appointment' },
      { status: 500 }
    )
  }
}

export async function GET() {
  try {
    // Try Prisma first, fallback to local database
    let appointments
    try {
      appointments = await getAppointmentsPrisma()
    } catch (prismaError) {
      console.log('Prisma not available, using local database:', prismaError.message)
      // Fallback to local database
      appointments = getAppointmentsLocal()
    }
    
    return NextResponse.json(appointments)
  } catch (error) {
    console.error('Error fetching appointments:', error)
    return NextResponse.json(
      { error: 'Failed to fetch appointments' },
      { status: 500 }
    )
  }
}
