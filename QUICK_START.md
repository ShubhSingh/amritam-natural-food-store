# 🚀 Amritam Natural - Quick Start Guide

## Get Started in 3 Steps

### 1️⃣ Install Dependencies
```bash
cd organic-food-store
npm install
```

### 2️⃣ Start Development Server
```bash
npm run dev
```
Or double-click `start-dev.bat` (Windows)

### 3️⃣ Open in Browser
- **Main Website:** http://localhost:3000
- **Admin Panel:** http://localhost:3000/admin

## 📝 Quick Tasks

### View the Website
1. Open http://localhost:3000
2. Browse products, search, and filter by category
3. Click "View Details" on any product
4. Try the purchase links

### Manage Products (Admin)
1. Open http://localhost:3000/admin
2. Click "Add Product" to create new products
3. Fill in product details (name, price, weight, etc.)
4. Add purchase links for Amazon/Flipkart/Swiggy
5. Click "Export JSON" to download products.json
6. Replace `data/products.json` with exported file
7. Rebuild: `npm run build`

### Build for Production
```bash
npm run build
```
Static files will be in the `out/` directory

## 🎯 Key Features

✅ **8 Sample Products** included (rice, tomatoes, mangoes, etc.)
✅ **5 Categories** (Fruits, Vegetables, Grains, Pulses, Sweeteners)
✅ **Search & Filter** functionality
✅ **Responsive Design** (mobile, tablet, desktop)
✅ **Admin Panel** for easy product management
✅ **Multi-platform Links** (Amazon, Flipkart, Swiggy)
✅ **Static Export** ready for deployment

## 📱 Test Responsive Design

- Desktop: Default view
- Tablet: Resize browser to ~768px
- Mobile: Resize browser to ~375px

## 🛠️ Common Commands

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

## 📦 Project Structure

```
organic-food-store/
├── app/
│   ├── page.tsx           # Homepage
│   └── admin/page.tsx     # Admin panel
├── components/            # React components
├── data/products.json     # Product catalog
├── types/product.ts       # TypeScript types
└── README.md             # Full documentation
```

## 🎨 Customization

### Change Colors
Edit `tailwind.config.ts` - modify primary/accent colors

### Add Products
Use admin panel at http://localhost:3000/admin

### Update Categories
Edit `data/products.json` - add to categories array

## 🆘 Troubleshooting

**Port 3000 already in use?**
```bash
# Use different port
npm run dev -- -p 3001
```

**Build errors?**
```bash
# Clean install
rm -rf node_modules .next
npm install
npm run build
```

**TypeScript errors?**
These are warnings and won't prevent the site from running.

## 📚 Full Documentation

See [README.md](README.md) for complete documentation.

---

**Happy Building! 🌿**