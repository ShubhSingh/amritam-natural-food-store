import { NextRequest, NextResponse } from 'next/server';
import { put, list } from '@vercel/blob';

const BLOB_FILENAME = 'products.json';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { products } = body;

    if (!products || !Array.isArray(products)) {
      return NextResponse.json(
        { error: 'Invalid products data' },
        { status: 400 }
      );
    }

    // Get existing data to preserve categories
    let categories = [];
    try {
      const existingBlob = await fetch(
        `${process.env.BLOB_READ_WRITE_TOKEN ? 'https://' + process.env.VERCEL_URL : ''}/api/products`
      );
      if (existingBlob.ok) {
        const existingData = await existingBlob.json();
        categories = existingData.categories || [];
      }
    } catch (error) {
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
    const blob = await put(BLOB_FILENAME, JSON.stringify(dataToSave, null, 2), {
      access: 'private',
      addRandomSuffix: false,
      allowOverwrite: true,
    });

    return NextResponse.json({
      success: true,
      message: 'Products updated successfully',
      url: blob.url,
    });
  } catch (error) {
    console.error('Error updating products:', error);
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
