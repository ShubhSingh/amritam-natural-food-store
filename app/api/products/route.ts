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
    const token = getToken();
    
    try {
      const { blobs } = await list({
        prefix: BLOB_FILENAME,
        limit: 1,
        token,
      });
      
      if (blobs.length > 0) {
        const response = await fetch(blobs[0].downloadUrl, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        if (response.ok) {
          const existingData = await response.json();
          categories = existingData.categories || [];
          console.log('Preserved existing categories from blob');
        }
      } else {
        console.log('⚠️ No existing blob found - categories must be provided or blob must be initialized first');
      }
    } catch (error) {
      console.error('Error getting existing categories:', error);
    }

    // Prepare data to save
    const dataToSave = {
      products,
      categories,
    };

    // Upload to Vercel Blob with private access
    console.log('Uploading to Vercel Blob...');
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
        console.log('✅ Successfully loaded products from Vercel Blob:', data.products?.length, 'products,', data.categories?.length, 'categories');
        return NextResponse.json(data);
      }
      
      throw new Error(`Failed to fetch blob: ${response.statusText}`);
    }
    
    // If blob doesn't exist, return error - blob must be initialized first
    console.error('❌ No blob found - please initialize blob storage first');
    return NextResponse.json(
      {
        error: 'Blob storage not initialized',
        details: 'Please run the migration script or use the admin panel to initialize the blob storage',
        products: [],
        categories: []
      },
      { status: 404 }
    );
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
