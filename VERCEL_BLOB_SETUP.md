# Vercel Blob Storage Setup Guide

## Problem
The "Failed to save products" error occurs because **Vercel's serverless functions run in a read-only filesystem**. You cannot write to files in production on Vercel.

## Solution
Use **Vercel Blob Storage** to store the products.json file in the cloud.

---

## Step 1: Set Up Vercel Blob Storage

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Select your project
3. Go to **Storage** tab
4. Click **Create Database**
5. Select **Blob** storage
6. Choose a name (e.g., "amritam-products-storage")
7. Click **Create**

Vercel will automatically add the `BLOB_READ_WRITE_TOKEN` environment variable to your project.

---

## Step 2: Code Changes (Already Done)

✅ Installed `@vercel/blob` package
✅ Updated `app/api/products/route.ts` to use Blob Storage

The updated API route now:
- **POST**: Saves products to Vercel Blob Storage
- **GET**: Reads from Blob Storage (falls back to local file if blob doesn't exist)

---

## Step 3: Deploy to Vercel

```bash
git add .
git commit -m "Add Vercel Blob Storage support"
git push
```

Vercel will automatically deploy your changes.

---

## Step 4: Test the Admin Panel

1. Go to your deployed site: `https://your-app.vercel.app/admin`
2. Add or edit a product
3. Click "Add Product" or "Update Product"
4. You should see a success message
5. Refresh the page - your changes should persist!

---

## How It Works

### First Time (No Blob Data)
1. Admin panel loads products from local `data/products.json`
2. When you save, it uploads to Vercel Blob Storage
3. Future requests read from Blob Storage

### After First Save
1. All reads come from Blob Storage
2. All writes update Blob Storage
3. Data persists across deployments

---

## Environment Variables

Automatically set by Vercel when you create Blob Storage:
- `BLOB_READ_WRITE_TOKEN` - Authentication token for Blob API

You can verify this in:
**Vercel Dashboard → Your Project → Settings → Environment Variables**

---

## Testing Locally

To test locally, you need the Blob token:

1. Get your token from Vercel Dashboard:
   - Go to Storage → Your Blob Storage → Settings
   - Copy the token

2. Create `.env.local` file:
   ```
   BLOB_READ_WRITE_TOKEN=your_token_here
   ```

3. Run locally:
   ```bash
   npm run dev
   ```

4. Test at `http://localhost:3000/admin`

---

## Troubleshooting

### Error: "Failed to save products"
**Check Vercel Logs:**
1. Go to Vercel Dashboard → Your Project → Deployments
2. Click on latest deployment
3. Go to "Functions" tab
4. Check logs for `/api/products`

**Common Issues:**
- `BLOB_READ_WRITE_TOKEN` not set → Create Blob Storage in Vercel
- Token expired → Regenerate token in Vercel Dashboard
- Network error → Check Vercel status page

### Products not persisting
- Clear browser cache
- Check if Blob Storage is created in Vercel
- Verify environment variable is set
- Redeploy the project

### Local development not working
- Make sure `.env.local` has the correct token
- Restart the dev server after adding `.env.local`
- Check token has read/write permissions

---

## Benefits of Vercel Blob Storage

✅ **Simple** - Just like working with files
✅ **Fast** - CDN-backed storage
✅ **Persistent** - Data survives deployments
✅ **Free Tier** - Generous free tier included
✅ **No Database** - Perfect for JSON data
✅ **Automatic Backups** - Vercel handles it

---

## File Structure

```
app/
├── api/
│   └── products/
│       └── route.ts          # Updated to use Blob Storage
├── admin/
│   └── page.tsx              # Admin panel (no changes needed)
data/
└── products.json             # Initial data (fallback)
```

---

## API Endpoints

### GET `/api/products`
Returns products and categories from Blob Storage (or local file as fallback)

**Response:**
```json
{
  "products": [...],
  "categories": [...]
}
```

### POST `/api/products`
Saves products to Blob Storage

**Request:**
```json
{
  "products": [...]
}
```

**Response:**
```json
{
  "success": true,
  "message": "Products updated successfully",
  "url": "https://blob.vercel-storage.com/..."
}
```

---

## Next Steps

1. ✅ Install `@vercel/blob` package (Done)
2. ✅ Update API route (Done)
3. 🔄 Create Blob Storage in Vercel Dashboard
4. 🔄 Deploy to Vercel
5. 🔄 Test admin panel

Your products will now be saved to Vercel Blob Storage! 🎉

---

## Migration from Local File

The first time you save products after deployment:
1. The API reads existing products from local `data/products.json`
2. Preserves categories from the local file
3. Uploads everything to Blob Storage
4. All future operations use Blob Storage

**No manual migration needed!** The system handles it automatically.