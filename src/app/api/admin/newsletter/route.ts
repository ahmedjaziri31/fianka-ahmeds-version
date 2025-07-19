import { NextResponse } from 'next/server';
import { newsletterDb } from '@/lib/db';

export async function GET() {
  try {
    const subscribers = newsletterDb.getAllSubscribers();

    return NextResponse.json({
      success: true,
      subscribers
    });
  } catch (error) {
    console.error('Error fetching subscribers:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch subscribers' },
      { status: 500 }
    );
  }
} 