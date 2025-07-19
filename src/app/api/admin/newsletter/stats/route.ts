import { NextResponse } from 'next/server';
import { newsletterDb } from '@/lib/db';

export async function GET() {
  try {
    const stats = newsletterDb.getSubscriberStats();

    return NextResponse.json({
      success: true,
      total: stats.total,
      recent: stats.recent
    });
  } catch (error) {
    console.error('Error fetching newsletter stats:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch newsletter stats' },
      { status: 500 }
    );
  }
} 