import { NextRequest, NextResponse } from 'next/server'
import { createAppointment, getAppointments } from '@/lib/database'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Validate required fields
    const { name, email, phone, businessName, message, preferredDate, preferredTime } = body
    
    if (!name || !email || !phone) {
      return NextResponse.json(
        { error: 'Name, email, and phone are required' },
        { status: 400 }
      )
    }

    // Create appointment
    const appointment = await createAppointment({
      name,
      email,
      phone,
      businessName: businessName || '',
      businessType: '',
      creditCards: '',
      establishedBusiness: '',
      strongCreditScore: '',
      cleanHistory: '',
      message: message || '',
      preferredDate: preferredDate || '',
      preferredTime: preferredTime || '',
      timezone: '',
      isEligible: false,
      eligibilityReason: ''
    })

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
    const appointments = await getAppointments()
    return NextResponse.json(appointments)
  } catch (error) {
    console.error('Error fetching appointments:', error)
    return NextResponse.json(
      { error: 'Failed to fetch appointments' },
      { status: 500 }
    )
  }
}
