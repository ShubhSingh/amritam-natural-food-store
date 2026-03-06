import { NextResponse } from 'next/server';
import { list } from '@vercel/blob';

export async function GET() {
  try {
    // Check if token exists
    const token = process.env.BLOB_READ_WRITE_TOKEN;
    const hasToken = !!token;
    
    if (!hasToken) {
      return NextResponse.json({
        status: 'error',
        message: 'BLOB_READ_WRITE_TOKEN not found in environment variables',
        hasToken: false,
      });
    }

    // Try to list blobs with token
    const { blobs } = await list({
      prefix: 'products.json',
      limit: 10,
      token,
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
    }, { status: 500 });
  }
}

// Made with Bob
