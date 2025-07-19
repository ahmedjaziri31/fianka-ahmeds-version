import { NextRequest, NextResponse } from 'next/server';
import { sendWelcomeEmail } from '@/lib/email';
import { newsletterDb } from '@/lib/db';

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    // Validate email
    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { error: 'Email valide requis' },
        { status: 400 }
      );
    }

    const promoCode = 'FIANKEWI-OVERT31';

    // Store subscriber in database
    const subscriber = newsletterDb.addSubscriber(email, promoCode);

    // Send welcome email with promo code
    const emailResult = await sendWelcomeEmail(email, promoCode);

    if (!emailResult.success) {
      console.error('Failed to send email:', emailResult.error);
      return NextResponse.json(
        { error: 'Erreur lors de l\'envoi de l\'email' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Inscription réussie ! Vérifiez votre email pour votre code promo.',
      messageId: emailResult.messageId,
      subscriber
    });

  } catch (error) {
    console.error('Newsletter subscription error:', error);
    return NextResponse.json(
      { error: 'Erreur serveur interne' },
      { status: 500 }
    );
  }
}

// Test endpoint for email functionality
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const testEmail = searchParams.get('email');

  if (!testEmail) {
    return NextResponse.json(
      { error: 'Email parameter required for testing' },
      { status: 400 }
    );
  }

  try {
    const emailResult = await sendWelcomeEmail(testEmail, 'FIANKEWI-OVERT31');
    
    return NextResponse.json({
      success: emailResult.success,
      message: emailResult.success ? 'Test email sent successfully' : 'Failed to send test email',
      error: emailResult.error || null,
      messageId: emailResult.messageId || null
    });
  } catch (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}