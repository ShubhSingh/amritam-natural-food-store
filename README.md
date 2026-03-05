# 🌿 Amritam Natural

A modern, static single-page website for selling organic food products with an admin interface for easy product catalog management. Built with Next.js 16, React 19, TypeScript, and Tailwind CSS.

## ✨ Features

- 🎨 **Modern Indian E-commerce Design** - Amritam Natural inspired by Amazon, Flipkart, and Swiggy Instamart
- 📱 **Fully Responsive** - Works seamlessly on desktop, tablet, and mobile devices
- 🔍 **Advanced Search & Filtering** - Search products by name, category, or tags
- 🏷️ **Category-based Navigation** - Easy browsing by product categories
- ⭐ **Featured Products Section** - Highlight special products
- 💰 **Price Display with Discounts** - Show original price, discounted price, and savings
- 🛒 **Multi-platform Purchase Links** - Direct links to Amazon, Flipkart, and Swiggy Instamart
- 📊 **Product Ratings & Reviews** - Display ratings and review counts
- 🛠️ **Admin Panel** - Easy-to-use interface for managing products
- 📦 **Static Site Generation** - Fast loading and SEO-friendly
- 🎯 **Product Details Modal** - Detailed view with all product information

## 🚀 Tech Stack

- **Framework:** Next.js 16.1.1 (App Router)
- **UI Library:** React 19.2.3
- **Language:** TypeScript 5.6.2
- **Styling:** Tailwind CSS 4.1.18
- **CSS Processing:** PostCSS with Autoprefixer
- **Icons:** Lucide React

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js:** Version 18.x or higher (recommended: 20.x LTS)
- **npm:** Version 9.x or higher (comes with Node.js)
- **Git:** For version control

## 🛠️ Installation

1. **Clone or navigate to the project directory:**
   ```bash
   cd organic-food-store
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Run the development server:**
   ```bash
   npm run dev
   ```

4. **Open your browser and visit:**
   ```
   http://localhost:3000
   ```

## 📁 Project Structure

```
organic-food-store/
├── app/
│   ├── admin/
│   │   └── page.tsx          # Admin panel for product management
│   ├── globals.css            # Global styles
│   ├── layout.tsx             # Root layout
│   └── page.tsx               # Main homepage
├── components/
│   ├── CategoryFilter.tsx     # Category filter component
│   ├── Header.tsx             # Header with search
│   ├── ProductCard.tsx        # Product card component
│   └── ProductModal.tsx       # Product detail modal
├── data/
│   └── products.json          # Product catalog data
├── types/
│   └── product.ts             # TypeScript type definitions
├── public/
│   └── images/                # Product images (placeholder)
├── next.config.js             # Next.js configuration
├── tailwind.config.ts         # Tailwind CSS configuration
├── tsconfig.json              # TypeScript configuration
└── package.json               # Project dependencies
```

## 🎯 Usage

### For End Users (Customers)

1. **Browse Products:**
   - View all products on the homepage
   - Use category filters to narrow down products
   - Search for specific products using the search bar

2. **View Product Details:**
   - Click "View Details" on any product card
   - See complete product information, ratings, and descriptions
   - Check availability on different platforms

3. **Purchase Products:**
   - Click on platform-specific buttons (Amazon, Flipkart, Swiggy)
   - You'll be redirected to the respective platform to complete the purchase

### For Admins (Product Management)

1. **Access Admin Panel:**
   ```
   http://localhost:3000/admin
   ```

2. **Add New Products:**
   - Click "Add Product" button
   - Fill in all required fields:
     - Product name, description, category
     - Weight (in kg) and price (in ₹)
     - Optional: Original price, discount, rating, review count
     - Purchase links for Amazon, Flipkart, and Swiggy
     - Tags for better searchability
     - Stock status and featured flag

3. **Edit Existing Products:**
   - Click the edit icon (✏️) next to any product
   - Modify the fields as needed
   - Click "Update Product"

4. **Delete Products:**
   - Click the delete icon (🗑️) next to any product
   - Confirm the deletion

5. **Export Product Catalog:**
   - Click "Export JSON" button
   - Save the downloaded `products.json` file
   - Replace the content of `data/products.json` with the exported file
   - Rebuild the site to see changes

## 🔧 Configuration

### Adding New Categories

Edit `data/products.json` and add to the `categories` array:

```json
{
  "id": "cat-006",
  "name": "Dairy Products",
  "icon": "🥛"
}
```

### Customizing Colors

Edit `tailwind.config.ts` to change the color scheme:

```typescript
colors: {
  primary: {
    // Your custom green shades
  },
  accent: {
    // Your custom orange shades
  }
}
```

### Modifying Product Schema

Edit `types/product.ts` to add or modify product fields:

```typescript
export interface Product {
  // Add your custom fields here
  customField?: string;
}
```

## 📦 Building for Production

1. **Build the static site:**
   ```bash
   npm run build
   ```

2. **The static files will be generated in the `out/` directory**

3. **Deploy the `out/` directory to any static hosting service:**
   - Vercel
   - Netlify
   - GitHub Pages
   - AWS S3
   - Any web server

## 🚀 Deployment

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Visit [vercel.com](https://vercel.com)
3. Import your repository
4. Vercel will automatically detect Next.js and deploy

### Deploy to Netlify

1. Build the project: `npm run build`
2. Drag and drop the `out/` folder to Netlify
3. Or connect your Git repository for automatic deployments

### Deploy to GitHub Pages

1. Build the project: `npm run build`
2. Push the `out/` directory to the `gh-pages` branch
3. Enable GitHub Pages in repository settings

## 🎨 Customization

### Adding Product Images

1. Place images in the `public/images/` directory
2. Update the `image` field in `data/products.json`:
   ```json
   "image": "/images/your-product.jpg"
   ```

### Changing Platform Links

Update the `purchaseLinks` array in each product:

```json
"purchaseLinks": [
  {
    "platform": "amazon",
    "url": "https://www.amazon.in/your-product-link",
    "available": true
  }
]
```

## 📱 Responsive Design

The website is fully responsive and optimized for:
- 📱 Mobile devices (320px and up)
- 📱 Tablets (768px and up)
- 💻 Desktops (1024px and up)
- 🖥️ Large screens (1280px and up)

## 🔍 SEO Optimization

The site includes:
- Semantic HTML structure
- Meta tags for social sharing
- Fast loading times with static generation
- Mobile-friendly design
- Structured data ready

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit your changes: `git commit -m 'Add feature'`
4. Push to the branch: `git push origin feature-name`
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For issues or questions:
- Create an issue in the repository
- Check existing documentation
- Review the code comments

## 🎯 Roadmap

Future enhancements:
- [ ] Shopping cart functionality
- [ ] User authentication
- [ ] Order management
- [ ] Payment gateway integration
- [ ] Product reviews and ratings system
- [ ] Wishlist feature
- [ ] Email notifications
- [ ] Multi-language support
- [ ] Dark mode

## 📸 Screenshots

### Homepage
- Hero section with organic food branding
- Category filters
- Featured products section
- Product grid with cards

### Product Card
- Product image with emoji placeholder
- Category badge
- Rating display
- Price with discount
- Stock status
- Quick buy links

### Product Modal
- Large product image
- Detailed description
- Complete specifications
- Platform-specific purchase buttons

### Admin Panel
- Product management interface
- Add/Edit/Delete products
- Export to JSON
- Real-time preview

## 🌟 Key Features Explained

### Static Site Generation
The website uses Next.js static export, meaning:
- All pages are pre-rendered at build time
- No server required for hosting
- Lightning-fast page loads
- SEO-friendly

### Product Catalog Management
- Admin interface for easy product management
- Export products to JSON
- Update catalog without code changes
- Rebuild site to reflect changes

### Multi-Platform Integration
- Direct links to Amazon, Flipkart, and Swiggy Instamart
- Platform availability status
- Easy switching between platforms

## 💡 Tips

1. **Regular Updates:** Keep your product catalog updated through the admin panel
2. **Image Optimization:** Use optimized images for faster loading
3. **SEO:** Add relevant keywords in product descriptions
4. **Testing:** Test on multiple devices before deployment
5. **Backup:** Always backup your `products.json` before making changes

## 🔐 Security Notes

- The admin panel is client-side only
- For production, implement proper authentication
- Protect the admin route with password or authentication
- Use environment variables for sensitive data

---

**Built with ❤️ by Amritam Natural**

🌿 Eat Organic, Live Healthy! 🌿