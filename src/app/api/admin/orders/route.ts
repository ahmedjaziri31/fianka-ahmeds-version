import { NextResponse } from 'next/server';
import { orderDb } from '@/lib/db';

export async function GET() {
  try {
    const orders = orderDb.getAllOrders();

    // Transform orders to match admin interface expectations
    const transformedOrders = orders.map(order => ({
      id: order.id.toString(),
      customerName: `${order.shipping_address.firstName} ${order.shipping_address.lastName}`,
      customerEmail: order.shipping_address.email,
      customerPhone: order.shipping_address.phone,
      shippingAddress: {
        street: order.shipping_address.address,
        city: order.shipping_address.city,
        postalCode: order.shipping_address.postalCode,
        country: 'Tunisia'
      },
      items: order.items.map(item => ({
        id: item.id,
        productId: item.product.id.toString(),
        productName: item.product.name,
        quantity: item.quantity,
        price: item.product.price,
        size: item.size || 'N/A',
        color: item.color || 'N/A'
      })),
      total: order.total,
      status: order.status,
      createdAt: order.created_at,
      promoCode: order.promo_code,
      discount: order.discount
    }));

    return NextResponse.json({
      success: true,
      orders: transformedOrders
    });
  } catch (error) {
    console.error('Error fetching orders:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch orders' },
      { status: 500 }
    );
  }
} 