import { NextRequest, NextResponse } from 'next/server'
import { updateAppointmentStatus, getAppointmentById } from '@/lib/database-prisma'

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params
    const body = await request.json()
    const { action, status, notes } = body

    if (!action) {
      return NextResponse.json(
        { error: 'Action is required' },
        { status: 400 }
      )
    }

    let appointment
    let updatedAppointment

    // Try Prisma first, fallback to local database
    try {
      switch (action) {
        case 'confirm':
          updatedAppointment = await updateAppointmentStatus(id, 'CONFIRMED')
          break
        case 'complete':
          updatedAppointment = await updateAppointmentStatus(id, 'COMPLETED')
          break
        case 'cancel':
          updatedAppointment = await updateAppointmentStatus(id, 'CANCELLED')
          break
        case 'pending':
          updatedAppointment = await updateAppointmentStatus(id, 'PENDING')
          break
        case 'update_status':
          if (!status) {
            return NextResponse.json(
              { error: 'Status is required for update_status action' },
              { status: 400 }
            )
          }
          updatedAppointment = await updateAppointmentStatus(id, status as any)
          break
        default:
          return NextResponse.json(
            { error: 'Invalid action' },
            { status: 400 }
          )
      }

      if (!updatedAppointment) {
        return NextResponse.json(
          { error: 'Appointment not found' },
          { status: 404 }
        )
      }

      appointment = updatedAppointment
    } catch (prismaError) {
      console.log('Prisma not available, using local database:', prismaError.message)
      // Fallback to local database
      const { updateAppointmentStatus: updateAppointmentStatusLocal, getAppointmentById: getAppointmentByIdLocal } = await import('@/lib/database')
      
      // Get the appointment first
      const allAppointments = await import('@/lib/database').then(m => m.getAllAppointments())
      const foundAppointment = allAppointments.find(apt => apt.id === id)
      
      if (!foundAppointment) {
        return NextResponse.json(
          { error: 'Appointment not found' },
          { status: 404 }
        )
      }

      // Update status locally
      let newStatus = foundAppointment.status
      switch (action) {
        case 'confirm':
          newStatus = 'confirmed'
          break
        case 'complete':
          newStatus = 'completed'
          break
        case 'cancel':
          newStatus = 'cancelled'
          break
        case 'pending':
          newStatus = 'pending'
          break
        case 'update_status':
          if (!status) {
            return NextResponse.json(
              { error: 'Status is required for update_status action' },
              { status: 400 }
            )
          }
          newStatus = status.toLowerCase()
          break
        default:
          return NextResponse.json(
            { error: 'Invalid action' },
            { status: 400 }
          )
      }

      // Update the appointment
      const updatedAppointmentLocal = {
        ...foundAppointment,
        status: newStatus as any,
        updatedAt: new Date().toISOString()
      }

      // Save to local storage
      if (typeof window !== 'undefined') {
        const appointments = allAppointments.map(apt => 
          apt.id === id ? updatedAppointmentLocal : apt
        )
        localStorage.setItem('appointments', JSON.stringify(appointments))
      }

      appointment = updatedAppointmentLocal
    }

    return NextResponse.json({
      success: true,
      appointment,
      action,
      message: `Appointment ${action} successfully`
    })
  } catch (error) {
    console.error('Error performing appointment action:', error)
    return NextResponse.json(
      { error: 'Failed to perform action' },
      { status: 500 }
    )
  }
}
