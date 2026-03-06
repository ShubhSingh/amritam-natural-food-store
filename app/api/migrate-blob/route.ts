import { NextResponse } from 'next/server';
import { put, del, list } from '@vercel/blob';

// Get token from environment
const getToken = () => {
  const token = process.env.BLOB_READ_WRITE_TOKEN;
  if (!token) {
    throw new Error('BLOB_READ_WRITE_TOKEN is not configured');
  }
  return token;
};

export async function POST() {
  try {
    console.log('Starting blob migration...');
    
    const token = getToken();
    
    // List all blobs with products.json prefix
    const { blobs } = await list({
      prefix: 'products.json',
      token,
    });
    
    console.log(`Found ${blobs.length} blobs to migrate`);
    
    // Get the local products data
    const productsData = require('@/data/products.json');
    
    // Delete old private blobs
    for (const blob of blobs) {
      console.log('Deleting old blob:', blob.url);
      await del(blob.url, { token });
    }
    
    // Create new private blob
    console.log('Creating new private blob...');
    const newBlob = await put('products.json', JSON.stringify(productsData, null, 2), {
      access: 'private',
      addRandomSuffix: false,
      allowOverwrite: true,
      token,
    });
    
    console.log('✅ Migration complete! New blob:', newBlob.url);
    
    return NextResponse.json({
      success: true,
      message: 'Migration complete',
      newBlobUrl: newBlob.url,
      deletedBlobs: blobs.length,
    });
  } catch (error) {
    console.error('❌ Migration failed:', error);
    return NextResponse.json(
      {
        error: 'Migration failed',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

// Made with Bob
