import { NextRequest, NextResponse } from 'next/server';
import { productDb } from '@/lib/db';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q');

    if (!query || query.trim().length === 0) {
      return NextResponse.json({
        products: [],
        message: 'No search query provided'
      });
    }

    const searchQuery = query.trim().toLowerCase();

    // Get all products
    const allProducts = productDb.getAllProducts();

    // Filter products based on search query
    const filteredProducts = allProducts.filter(product => {
      const nameMatch = product.name.toLowerCase().includes(searchQuery);
      const descriptionMatch = product.description.toLowerCase().includes(searchQuery);
      const categoryMatch = product.category.toLowerCase().includes(searchQuery);
      
      return nameMatch || descriptionMatch || categoryMatch;
    });

    // Sort by relevance (name matches first, then description, then category)
    const sortedProducts = filteredProducts.sort((a, b) => {
      const aNameMatch = a.name.toLowerCase().includes(searchQuery);
      const bNameMatch = b.name.toLowerCase().includes(searchQuery);
      
      if (aNameMatch && !bNameMatch) return -1;
      if (!aNameMatch && bNameMatch) return 1;
      
      return 0;
    });

    // Limit results to 20 products
    const limitedResults = sortedProducts.slice(0, 20);

    return NextResponse.json({
      products: limitedResults,
      count: limitedResults.length,
      query: searchQuery
    });

  } catch (error) {
    console.error('Search error:', error);
    return NextResponse.json(
      { 
        error: 'Internal server error',
        products: []
      },
      { status: 500 }
    );
  }
} 