# Quick Deployment Steps for Vercel

## ✅ Code Changes Complete

The code has been updated to use Vercel Blob Storage instead of filesystem writes.

---

## 🚀 Deploy to Vercel

### Step 1: Create Blob Storage
1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Select your project
3. Click **Storage** tab
4. Click **Create Database**
5. Select **Blob**
6. Name it (e.g., "products-storage")
7. Click **Create**

### Step 2: Deploy Your Code
```bash
git add .
git commit -m "Fix: Use Vercel Blob Storage for products"
git push
```

### Step 3: Test
1. Visit `https://your-app.vercel.app/admin`
2. Add or edit a product
3. Save it
4. Refresh the page - changes should persist! ✅

---

## 📝 What Changed

- ✅ Installed `@vercel/blob` package
- ✅ Updated `/api/products` route to use Blob Storage
- ✅ Automatic fallback to local `data/products.json` on first load
- ✅ All saves go to Blob Storage (persistent across deployments)

---

## 🔍 Troubleshooting

If you still see "Failed to save products":

1. **Check Blob Storage exists:**
   - Vercel Dashboard → Storage → Should see your Blob storage

2. **Check Environment Variable:**
   - Vercel Dashboard → Settings → Environment Variables
   - Should see `BLOB_READ_WRITE_TOKEN`

3. **Redeploy:**
   ```bash
   git commit --allow-empty -m "Trigger redeploy"
   git push
   ```

4. **Check Logs:**
   - Vercel Dashboard → Deployments → Latest → Functions
   - Look for errors in `/api/products`

---

## 📚 Full Documentation

See [`VERCEL_BLOB_SETUP.md`](./VERCEL_BLOB_SETUP.md) for complete details.