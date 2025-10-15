import { NextRequest, NextResponse } from 'next/server';
import { getAppointmentById, updateAppointment, updateAppointmentStatus } from '@/lib/database';

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const { 
      preferredDate, 
      preferredTime, 
      status,
      // Complete lead update fields
      name,
      email,
      phone,
      businessName,
      businessType,
      creditCards,
      establishedBusiness,
      strongCreditScore,
      cleanHistory,
      timezone,
      message,
      isEligible,
      eligibilityReason
    } = body;
    
    console.log(`API PUT request for appointment ${params.id}`);
    console.log('Request body:', body);
    
    // Get the appointment first
    const appointment = getAppointmentById(params.id);
    if (!appointment) {
      console.error(`Appointment with ID ${params.id} not found`);
      return NextResponse.json(
        { error: 'Appointment not found' },
        { status: 404 }
      );
    }
    
    console.log('Found appointment:', appointment);
    
    let updatedAppointment;
    
    // If updating status only, use the updateAppointmentStatus function
    if (status && ['pending', 'confirmed', 'completed', 'cancelled'].includes(status) && 
        !name && !email && !phone && !businessName) {
      console.log(`Updating status to: ${status}`);
      updatedAppointment = updateAppointmentStatus(params.id, status);
    } else if (preferredDate && preferredTime && 
               !name && !email && !phone && !businessName) {
      // For date/time updates only, use the general updateAppointment function
      console.log(`Updating date/time: ${preferredDate} ${preferredTime}`);
      updatedAppointment = updateAppointment(params.id, {
        preferredDate,
        preferredTime
      });
    } else if (name && email && phone && businessName) {
      // For complete lead update
      console.log(`Updating complete lead data`);
      updatedAppointment = updateAppointment(params.id, {
        name,
        email,
        phone,
        businessName,
        businessType,
        creditCards,
        establishedBusiness,
        strongCreditScore,
        cleanHistory,
        preferredDate,
        preferredTime,
        timezone,
        message,
        isEligible,
        eligibilityReason
      });
    } else {
      return NextResponse.json(
        { error: 'Missing required fields for update' },
        { status: 400 }
      );
    }
    
    if (!updatedAppointment) {
      console.error(`Failed to update appointment ${params.id}`);
      return NextResponse.json(
        { error: 'Failed to update appointment' },
        { status: 500 }
      );
    }
    
    console.log(`Appointment ${params.id} successfully updated`);
    console.log('Updated appointment:', updatedAppointment);
    
    return NextResponse.json({
      success: true,
      appointment: updatedAppointment,
      message: 'Appointment updated successfully'
    });
    
  } catch (error) {
    console.error('Error updating appointment:', error);
    return NextResponse.json(
      { error: 'Internal server error', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}