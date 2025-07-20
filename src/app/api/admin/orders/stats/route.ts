import { NextResponse } from 'next/server';
import { orderDb } from '@/lib/db';

export async function GET() {
  try {
    const stats = orderDb.getOrderStats();

    return NextResponse.json({
      success: true,
      total: stats.total,
      recent: stats.recent
    });
  } catch (error) {
    console.error('Error fetching order stats:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch order stats' },
      { status: 500 }
    );
  }
} 