import { NextRequest, NextResponse } from 'next/server';
import { orderDb } from '@/lib/db';
import { sendInvoiceEmail } from '@/lib/email';

export async function POST(request: NextRequest) {
  try {
    const { orderId } = await request.json();

    if (!orderId) {
      return NextResponse.json(
        { error: 'Order ID is required' },
        { status: 400 }
      );
    }

    // Get the order
    const order = orderDb.getOrderById(orderId);
    
    if (!order) {
      return NextResponse.json(
        { error: 'Order not found' },
        { status: 404 }
      );
    }

    // Send invoice email
    const emailResult = await sendInvoiceEmail(order);

    if (!emailResult.success) {
      return NextResponse.json(
        { 
          success: false,
          error: 'Failed to send invoice email',
          details: emailResult.error 
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Invoice email sent successfully',
      messageId: emailResult.messageId
    });

  } catch (error) {
    console.error('Error sending invoice email:', error);
    return NextResponse.json(
      { 
        success: false,
        error: 'Internal server error',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
} 