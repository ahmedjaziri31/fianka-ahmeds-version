import { NextRequest, NextResponse } from 'next/server';
import { orderDb } from '@/lib/db';
import { CreateOrderData } from '@/types';

export async function POST(request: NextRequest) {
  try {
    const orderData: CreateOrderData = await request.json();

    // Validate required fields
    if (!orderData.items || orderData.items.length === 0) {
      return NextResponse.json(
        { error: 'Order items are required' },
        { status: 400 }
      );
    }

    if (!orderData.shipping_address) {
      return NextResponse.json(
        { error: 'Shipping address is required' },
        { status: 400 }
      );
    }

    // Validate shipping address fields
    const requiredFields = ['firstName', 'lastName', 'email', 'phone', 'address', 'city', 'postalCode'];
    for (const field of requiredFields) {
      if (!orderData.shipping_address[field as keyof typeof orderData.shipping_address]) {
        return NextResponse.json(
          { error: `${field} is required in shipping address` },
          { status: 400 }
        );
      }
    }

    // Validate items have required product data
    for (const item of orderData.items) {
      if (!item.product || !item.product.id) {
        return NextResponse.json(
          { error: 'Invalid item - missing product information' },
          { status: 400 }
        );
      }
    }

    // Create the order with user ID if provided
    const order = orderDb.createOrder(orderData, orderData.user_id);

    return NextResponse.json({ 
      order,
      message: 'Order created successfully' 
    }, { status: 201 });
  } catch (error) {
    console.error('Error creating order:', error);
    return NextResponse.json(
      { 
        error: 'Internal server error',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');

    if (!userId) {
      return NextResponse.json(
        { error: 'User ID is required' },
        { status: 400 }
      );
    }

    const orders = orderDb.getOrdersByUserId(parseInt(userId));

    return NextResponse.json({ orders });
  } catch (error) {
    console.error('Error fetching orders:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 