/**
 * Migration script to upload initial products.json to Vercel Blob
 * Run this once to ensure all data is in Blob storage
 */

import { put } from '@vercel/blob';
import productsData from '../data/products.json';

async function migrateToBlob() {
  try {
    console.log('Starting migration to Vercel Blob...');
    
    const blob = await put('products.json', JSON.stringify(productsData, null, 2), {
      access: 'private',
      addRandomSuffix: false,
      allowOverwrite: true,
    });

    console.log('✅ Successfully migrated products to Vercel Blob!');
    console.log('Blob URL:', blob.url);
    console.log(`Migrated ${productsData.products.length} products`);
    console.log(`Migrated ${productsData.categories.length} categories`);
  } catch (error) {
    console.error('❌ Migration failed:', error);
    process.exit(1);
  }
}

migrateToBlob();

// Made with Bob
