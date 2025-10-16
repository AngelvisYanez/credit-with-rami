import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // Create admin user
  const admin = await prisma.adminUser.upsert({
    where: { username: 'rami' },
    update: {},
    create: {
      username: 'rami',
      password: 'rami123', // In production, this should be hashed
      name: 'Rami',
      role: 'admin'
    }
  })

  console.log('Admin user created:', admin)

  // Create sample appointments
  const appointments = [
    {
      name: 'John Eligible Test',
      email: 'john.eligible@test.com',
      phone: '+1234567890',
      businessName: 'Eligible Business LLC',
      businessType: 'Restaurant',
      creditCards: 'Yes',
      establishedBusiness: 'Yes',
      strongCreditScore: 'Yes',
      cleanHistory: 'Yes',
      preferredDate: '2024-02-15',
      preferredTime: '10:00 AM',
      timezone: 'America/New_York',
      message: 'This is an eligible lead test case',
      isEligible: true,
      eligibilityReason: 'Meets all requirements',
      status: 'PENDING' as const
    },
    {
      name: 'Jane NonEligible Test',
      email: 'jane.noneligible@test.com',
      phone: '+1234567891',
      businessName: 'Non-Eligible Business Inc',
      businessType: 'Retail',
      creditCards: 'No',
      establishedBusiness: 'Yes',
      strongCreditScore: 'Yes',
      cleanHistory: 'Yes',
      preferredDate: '2024-02-16',
      preferredTime: '2:00 PM',
      timezone: 'America/New_York',
      message: 'This lead is missing credit cards',
      isEligible: false,
      eligibilityReason: 'Does not meet all eligibility requirements',
      status: 'PENDING' as const
    }
  ]

  for (const appointment of appointments) {
    await prisma.appointment.upsert({
      where: { email: appointment.email },
      update: {},
      create: appointment
    })
  }

  console.log('Sample appointments created')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
