# Blob Storage Token Configuration

## Overview
All blob operations in this project now explicitly use the `BLOB_READ_WRITE_TOKEN` for authentication with the **private** Vercel Blob store. The store is configured with private access, and all operations use the token for authentication.

## Token Configuration

### Environment Variable
- **Variable Name**: `BLOB_READ_WRITE_TOKEN`
- **Location**: `.env.local`
- **Current Value**: `vercel_blob_rw_GyTQ1083Wl0PdYTu_CZHNaFjvmfzw57kwbbD4HIZJHQA3tU`

### Important Notes
- This token is required for all blob operations (read, write, list, delete)
- The token must be present in the environment for the application to function
- For production deployment, ensure this token is added to Vercel environment variables

## Updated Files

### 1. API Routes

#### [`app/api/products/route.ts`](app/api/products/route.ts)
- Added `getToken()` helper function to retrieve and validate token
- **Changed all blob access from 'public' to 'private'**
- Updated GET method to use `list()` and authenticated fetch with token
- Updated POST method to use `put()` with private access and token
- All blob operations now explicitly pass the token parameter

#### [`app/api/blob-status/route.ts`](app/api/blob-status/route.ts)
- Updated [`list()`](app/api/blob-status/route.ts:20) operation to use token
- Improved error handling with proper status code

#### [`app/api/migrate-blob/route.ts`](app/api/migrate-blob/route.ts)
- Added `getToken()` helper function
- **Changed blob access from 'public' to 'private'**
- Updated [`list()`](app/api/migrate-blob/route.ts:20) operation to use token
- Updated [`del()`](app/api/migrate-blob/route.ts:27) operation to use token
- Updated [`put()`](app/api/migrate-blob/route.ts:32) operation to use token

### 2. Scripts

#### [`scripts/migrate-to-blob.ts`](scripts/migrate-to-blob.ts)
- Added token validation before migration
- Updated [`put()`](scripts/migrate-to-blob.ts:21) operation to use token
- Added informative error message if token is missing

## Token Usage Pattern

All blob operations now follow this pattern:

```typescript
// Get token from environment
const token = process.env.BLOB_READ_WRITE_TOKEN;
if (!token) {
  throw new Error('BLOB_READ_WRITE_TOKEN is not configured');
}

// Use token in blob operations with PRIVATE access
await put(filename, content, {
  access: 'private',      // Must be 'private' for private blob stores
  addRandomSuffix: false, // Keep consistent filename
  allowOverwrite: true,   // Allow updating existing blobs
  token,
  ...otherOptions
});
await list({ prefix, token });
await del(url, { token });

// For reading private blobs, use authenticated fetch
const { blobs } = await list({ prefix: filename, token });
const response = await fetch(blobs[0].downloadUrl, {
  headers: { 'Authorization': `Bearer ${token}` }
});
```

## Verification Steps

To verify the token configuration is working:

1. **Check Environment Variable**
   ```bash
   # Ensure .env.local contains the token
   cat .env.local
   ```

2. **Test Blob Status API**
   ```bash
   curl http://localhost:3000/api/blob-status
   ```
   Should return success with blob information

3. **Test Products API**
   ```bash
   curl http://localhost:3000/api/products
   ```
   Should successfully read from blob storage

4. **Run Migration Script**
   ```bash
   npm run migrate-to-blob
   ```
   Should successfully upload data to blob storage

## Security Considerations

- ✅ Token is stored in `.env.local` (not committed to git)
- ✅ Token is validated before use in all operations
- ✅ Clear error messages when token is missing
- ✅ Token is passed explicitly to all blob operations
- ⚠️ Ensure `.env.local` is in `.gitignore`
- ⚠️ For production, add token to Vercel environment variables

## Deployment Checklist

Before deploying to production:

- [ ] Verify `.env.local` is in `.gitignore`
- [ ] Add `BLOB_READ_WRITE_TOKEN` to Vercel project environment variables
- [ ] Test all blob operations in production environment
- [ ] Verify token has appropriate permissions (read/write)
- [ ] Monitor blob storage usage and costs

## Troubleshooting

### Error: "BLOB_READ_WRITE_TOKEN is not configured"
- **Cause**: Token is missing from environment variables
- **Solution**: Add token to `.env.local` or Vercel environment variables

### Error: "Cannot use public access on a private store"
- **Cause**: Attempting to use `access: 'public'` on a private blob store
- **Solution**: Change all `put()` operations to use `access: 'private'`

### Error: "This blob already exists"
- **Cause**: Attempting to create a blob that already exists without `allowOverwrite: true`
- **Solution**: Add `allowOverwrite: true` to `put()` operations that need to update existing blobs

### Error: "Unauthorized" or 401 responses
- **Cause**: Invalid or expired token, or missing Authorization header
- **Solution**: Ensure token is valid and passed correctly in all operations

### Error: "Failed to fetch blob"
- **Cause**: Network issues or incorrect blob URL
- **Solution**: Check blob URL and network connectivity

## Additional Resources

- [Vercel Blob Documentation](https://vercel.com/docs/storage/vercel-blob)
- [Vercel Blob SDK](https://github.com/vercel/storage/tree/main/packages/blob)