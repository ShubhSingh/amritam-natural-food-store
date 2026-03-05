import { NextRequest, NextResponse } from 'next/server';
import { writeFile } from 'fs/promises';
import { join } from 'path';

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

    // Path to products.json file
    const filePath = join(process.cwd(), 'data', 'products.json');

    // Read existing data to preserve categories
    const fs = require('fs');
    const existingData = JSON.parse(
      fs.readFileSync(filePath, 'utf8')
    );

    // Update products while keeping categories
    const updatedData = {
      products,
      categories: existingData.categories,
    };

    // Write to file
    await writeFile(filePath, JSON.stringify(updatedData, null, 2), 'utf8');

    return NextResponse.json({
      success: true,
      message: 'Products updated successfully',
    });
  } catch (error) {
    console.error('Error updating products:', error);
    return NextResponse.json(
      { error: 'Failed to update products' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const filePath = join(process.cwd(), 'data', 'products.json');
    const fs = require('fs');
    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

    return NextResponse.json(data);
  } catch (error) {
    console.error('Error reading products:', error);
    return NextResponse.json(
      { error: 'Failed to read products' },
      { status: 500 }
    );
  }
}

// Made with Bob
