import { NextResponse } from 'next/server';
import { list } from '@vercel/blob';

export async function GET() {
  try {
    // Check if token exists
    const hasToken = !!process.env.BLOB_READ_WRITE_TOKEN;
    
    if (!hasToken) {
      return NextResponse.json({
        status: 'error',
        message: 'BLOB_READ_WRITE_TOKEN not found in environment variables',
        hasToken: false,
      });
    }

    // Try to list blobs
    const { blobs } = await list({
      prefix: 'products.json',
      limit: 10,
    });

    return NextResponse.json({
      status: 'success',
      hasToken: true,
      blobsFound: blobs.length,
      blobs: blobs.map(b => ({
        pathname: b.pathname,
        size: b.size,
        uploadedAt: b.uploadedAt,
      })),
    });
  } catch (error) {
    return NextResponse.json({
      status: 'error',
      message: error instanceof Error ? error.message : 'Unknown error',
      hasToken: !!process.env.BLOB_READ_WRITE_TOKEN,
    });
  }
}

// Made with Bob
