import { NextRequest, NextResponse } from 'next/server';
import { put, list, head } from '@vercel/blob';

const BLOB_FILENAME = 'products.json';

// Get token from environment
const getToken = () => {
  const token = process.env.BLOB_READ_WRITE_TOKEN;
  if (!token) {
    throw new Error('BLOB_READ_WRITE_TOKEN is not configured');
  }
  return token;
};

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

    // Get existing categories from blob
    let categories = [];
    try {
      const token = getToken();
      const { blobs } = await list({
        prefix: BLOB_FILENAME,
        limit: 1,
        token,
      });
      
      if (blobs.length > 0) {
        const response = await fetch(blobs[0].downloadUrl);
        if (response.ok) {
          const existingData = await response.json();
          categories = existingData.categories || [];
          console.log('Preserved existing categories from blob');
        }
      } else {
        // First time setup - get categories from local file
        console.log('First time setup - loading categories from local file');
        const productsData = require('@/data/products.json');
        categories = productsData.categories || [];
      }
    } catch (error) {
      console.error('Error getting existing categories:', error);
      // First time setup - get categories from local file
      const productsData = require('@/data/products.json');
      categories = productsData.categories || [];
    }

    // Prepare data to save
    const dataToSave = {
      products,
      categories,
    };

    // Upload to Vercel Blob with private access
    console.log('Uploading to Vercel Blob...');
    const token = getToken();
    const blob = await put(BLOB_FILENAME, JSON.stringify(dataToSave, null, 2), {
      access: 'private',
      addRandomSuffix: false,
      allowOverwrite: true,
      token,
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
    console.log('GET /api/products - Reading from Vercel Blob...');
    
    const token = getToken();
    
    // List blobs to find the products.json file
    try {
      const { blobs } = await list({
        prefix: BLOB_FILENAME,
        limit: 1,
        token,
      });
      
      if (blobs.length > 0) {
        // Fetch the blob content using the download URL with token
        const response = await fetch(blobs[0].downloadUrl, {
          cache: 'no-store',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        
        if (response.ok) {
          const data = await response.json();
          console.log('✅ Successfully loaded products from Vercel Blob:', data.products?.length, 'products');
          return NextResponse.json(data);
        }
        
        throw new Error(`Failed to fetch blob: ${response.statusText}`);
      }
      
      // If blob doesn't exist, initialize from local file
      console.log('⚠️ No blob found - initializing from local file');
      const productsData = require('@/data/products.json');
      
      // Save to blob with private access
      const blob = await put(BLOB_FILENAME, JSON.stringify(productsData, null, 2), {
        access: 'private',
        addRandomSuffix: false,
        allowOverwrite: true,
        token,
      });
      
      console.log('✅ Initialized blob from local file:', blob.url);
      return NextResponse.json(productsData);
    } catch (fetchError) {
      console.error('Error fetching from blob:', fetchError);
      // Fallback to local file
      console.log('Falling back to local file');
      const productsData = require('@/data/products.json');
      return NextResponse.json(productsData);
    }
  } catch (error) {
    console.error('❌ Error reading products:', error);
    return NextResponse.json(
      {
        error: 'Failed to read products from blob storage',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

// Made with Bob
