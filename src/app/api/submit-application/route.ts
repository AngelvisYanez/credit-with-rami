import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Log the application data (in production, you would send this to an email service)
    console.log('Application submitted:', {
      name: body.name,
      email: body.email,
      phone: body.phone,
      businessName: body.businessName,
      isEligible: body.isEligible,
      eligibilityReason: body.eligibilityReason,
      timestamp: new Date().toISOString()
    })

    // In a real implementation, you would:
    // 1. Send email notification to admin
    // 2. Send confirmation email to user
    // 3. Integrate with email service (SendGrid, Resend, etc.)
    
    // For now, we'll just return success
    return NextResponse.json({
      success: true,
      message: 'Application submitted successfully',
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    console.error('Error submitting application:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to submit application' 
      },
      { status: 500 }
    )
  }
}
