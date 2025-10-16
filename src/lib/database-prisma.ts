import { prisma } from './prisma'
import { Appointment, AdminUser, Status } from '@prisma/client'

// Types for compatibility with existing code
export type { Appointment, AdminUser, Status }

// Appointment functions
export const createAppointment = async (appointmentData: {
  name: string
  email: string
  phone: string
  businessName: string
  businessType?: string
  creditCards?: string
  establishedBusiness?: string
  strongCreditScore?: string
  cleanHistory?: string
  preferredDate?: string
  preferredTime?: string
  timezone?: string
  message?: string
  isEligible?: boolean
  eligibilityReason?: string
}): Promise<Appointment> => {
  return await prisma.appointment.create({
    data: {
      ...appointmentData,
      status: 'PENDING' as Status
    }
  })
}

export const getAllAppointments = async (): Promise<Appointment[]> => {
  return await prisma.appointment.findMany({
    orderBy: {
      createdAt: 'desc'
    }
  })
}

export const getAppointments = getAllAppointments // Alias for API compatibility

export const getAppointmentById = async (id: string): Promise<Appointment | null> => {
  return await prisma.appointment.findUnique({
    where: { id }
  })
}

export const updateAppointment = async (id: string, updates: Partial<Appointment>): Promise<Appointment | null> => {
  try {
    return await prisma.appointment.update({
      where: { id },
      data: updates
    })
  } catch (error) {
    console.error('Error updating appointment:', error)
    return null
  }
}

export const updateAppointmentStatus = async (id: string, status: Status): Promise<Appointment | null> => {
  try {
    return await prisma.appointment.update({
      where: { id },
      data: { status }
    })
  } catch (error) {
    console.error('Error updating appointment status:', error)
    return null
  }
}

export const deleteAppointment = async (id: string): Promise<boolean> => {
  try {
    await prisma.appointment.delete({
      where: { id }
    })
    return true
  } catch (error) {
    console.error('Error deleting appointment:', error)
    return false
  }
}

export const getAppointmentsByDate = async (date: string): Promise<Appointment[]> => {
  return await prisma.appointment.findMany({
    where: {
      preferredDate: date
    },
    orderBy: {
      preferredTime: 'asc'
    }
  })
}

export const getAppointmentsByDateRange = async (startDate: string, endDate: string): Promise<Appointment[]> => {
  return await prisma.appointment.findMany({
    where: {
      preferredDate: {
        gte: startDate,
        lte: endDate
      }
    },
    orderBy: {
      preferredDate: 'asc'
    }
  })
}

// Admin authentication functions
export const authenticateAdmin = async (username: string, password: string): Promise<AdminUser | null> => {
  const admin = await prisma.adminUser.findUnique({
    where: { username }
  })
  
  if (admin && admin.password === password) {
    return admin
  }
  
  return null
}

export const getAdminById = async (id: string): Promise<AdminUser | null> => {
  return await prisma.adminUser.findUnique({
    where: { id }
  })
}

// Statistics functions
export const getAppointmentStats = async () => {
  const [
    total,
    eligible,
    pending,
    confirmed,
    completed,
    cancelled
  ] = await Promise.all([
    prisma.appointment.count(),
    prisma.appointment.count({ where: { isEligible: true } }),
    prisma.appointment.count({ where: { status: 'PENDING' } }),
    prisma.appointment.count({ where: { status: 'CONFIRMED' } }),
    prisma.appointment.count({ where: { status: 'COMPLETED' } }),
    prisma.appointment.count({ where: { status: 'CANCELLED' } })
  ])

  return {
    total,
    eligible,
    pending,
    confirmed,
    completed,
    cancelled,
    eligibilityRate: total > 0 ? (eligible / total) * 100 : 0
  }
}

// Function to reload appointments (for compatibility)
export const reloadAppointments = async (): Promise<Appointment[]> => {
  return await getAllAppointments()
}
