import { NextRequest, NextResponse } from 'next/server';
import { put, list } from '@vercel/blob';

const BLOB_FILENAME = 'products.json';

export async function POST(request: NextRequest) {
  try {
    console.log('POST /api/products - Starting save to Vercel Blob...');
    const body = await request.json();
    const { products } = body;

    if (!products || !Array.isArray(products)) {
      console.error('Invalid products data received');
      return NextResponse.json(
        { error: 'Invalid products data' },
        { status: 400 }
      );
    }

    console.log(`Saving ${products.length} products to Vercel Blob...`);

    // Get existing categories from blob or local file
    let categories = [];
    try {
      // Try to get existing data from blob to preserve categories
      const { blobs } = await list({
        prefix: BLOB_FILENAME,
        limit: 1,
      });
      
      if (blobs.length > 0) {
        const response = await fetch(blobs[0].downloadUrl);
        if (response.ok) {
          const existingData = await response.json();
          categories = existingData.categories || [];
          console.log('Preserved existing categories from blob');
        }
      }
    } catch (error) {
      console.log('No existing blob data, loading categories from local file');
      // If no existing data, load from local file
      const productsData = require('@/data/products.json');
      categories = productsData.categories || [];
    }

    // Prepare data to save
    const dataToSave = {
      products,
      categories,
    };

    // Upload to Vercel Blob
    console.log('Uploading to Vercel Blob...');
    const blob = await put(BLOB_FILENAME, JSON.stringify(dataToSave, null, 2), {
      access: 'private',
      addRandomSuffix: false,
      allowOverwrite: true,
    });

    console.log('✅ Successfully saved to Vercel Blob:', blob.url);
    return NextResponse.json({
      success: true,
      message: 'Products updated successfully',
      url: blob.url,
      productsCount: products.length,
    });
  } catch (error) {
    console.error('❌ Error updating products:', error);
    return NextResponse.json(
      {
        error: 'Failed to update products',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    // Try to get data from Vercel Blob first
    try {
      // List blobs to find our products file
      const { blobs } = await list({
        prefix: BLOB_FILENAME,
        limit: 1,
      });
      
      if (blobs.length > 0) {
        // Fetch the blob content using the download URL
        const response = await fetch(blobs[0].downloadUrl);
        if (response.ok) {
          const data = await response.json();
          console.log('Successfully loaded products from Vercel Blob');
          return NextResponse.json(data);
        }
      }
    } catch (blobError) {
      console.log('No blob data found or error accessing blob, using local file:', blobError);
    }

    // Fallback to local products.json if blob doesn't exist
    console.log('Loading products from local file');
    const productsData = require('@/data/products.json');
    return NextResponse.json(productsData);
  } catch (error) {
    console.error('Error reading products:', error);
    return NextResponse.json(
      {
        error: 'Failed to read products',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

// Made with Bob
