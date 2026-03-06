# Migrating Data to Vercel Blob Storage

## Current Setup

Your application is now configured to use Vercel Blob Storage for all product data. Here's how it works:

### Data Flow

1. **API Route** ([`app/api/products/route.ts`](app/api/products/route.ts)):
   - **GET**: Reads from Vercel Blob first, falls back to local file only if blob doesn't exist
   - **POST**: Always saves to Vercel Blob

2. **Admin Page** ([`app/admin/page.tsx`](app/admin/page.tsx)):
   - Fetches products from API (which reads from Blob)
   - Saves changes to API (which writes to Blob)

3. **Customer Page** ([`components/HomeContent.tsx`](components/HomeContent.tsx)):
   - Fetches products from API (which reads from Blob)
   - Auto-refreshes every 5 seconds

### Local File Usage

The local [`data/products.json`](data/products.json) file is **only used as a fallback** when:
- Vercel Blob doesn't have any data yet (first-time setup)
- There's an error accessing Vercel Blob

## Ensuring All Data is in Blob Storage

### Option 1: Use the Admin Panel (Recommended)

1. Start your dev server (if PowerShell execution policy issue, use `start-dev.bat`)
2. Go to `http://localhost:3000/admin`
3. The admin panel will load products from the API
4. Click any product's "Edit" button
5. Click "Update Product" without making changes
6. This will save all products to Vercel Blob

### Option 2: Run Migration Script

If you want to ensure the initial data is uploaded to Blob storage:

```bash
# Install dependencies first
npm install

# Run the migration script
npm run migrate-to-blob
```

This script will:
- Read all products and categories from `data/products.json`
- Upload them to Vercel Blob storage
- Confirm successful migration

## Verifying Blob Storage is Being Used

### Check Console Logs

When you visit the customer or admin page, check the browser console or server logs:

- **"Successfully loaded products from Vercel Blob"** = Reading from Blob ✅
- **"Loading products from local file"** = Fallback to local file (blob doesn't exist yet)

### Test the Flow

1. Open admin panel: `http://localhost:3000/admin`
2. Edit any product and save
3. Refresh the page
4. If the changes persist, Blob storage is working! ✅

## Environment Variables

Make sure you have the Vercel Blob token in your `.env.local`:

```
BLOB_READ_WRITE_TOKEN="your_token_here"
```

This file is already in `.gitignore` so it won't be committed.

## Production Deployment

When deployed to Vercel:
1. Vercel automatically provides the `BLOB_READ_WRITE_TOKEN`
2. First request will load from local file
3. Any save from admin panel uploads to Blob
4. All subsequent requests read from Blob

## Summary

✅ **Admin page**: Now fetches from API → Blob Storage  
✅ **Customer page**: Already fetches from API → Blob Storage  
✅ **API GET**: Reads from Blob (fallback to local file)  
✅ **API POST**: Writes to Blob  
✅ **Local file**: Only used as initial fallback  

**All data is now stored in and loaded from Vercel Blob Storage!**