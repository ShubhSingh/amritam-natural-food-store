'use client';

import { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import Header from '@/components/Header';
import CategoryFilter from '@/components/CategoryFilter';
import ProductCard from '@/components/ProductCard';
import ProductModal from '@/components/ProductModal';
import { AmazonIcon, FlipkartIcon, SwiggyIcon, BlinkitIcon } from '@/components/PlatformIcons';
import { Product, ProductCategory } from '@/types/product';

export default function HomeContent() {
  const searchParams = useSearchParams();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<ProductCategory[]>([]);
  const [loading, setLoading] = useState(true);

  // Check URL parameter to reset category filter and scroll to top
  useEffect(() => {
    const resetFilter = searchParams.get('reset');
    if (resetFilter === 'true') {
      setSelectedCategory('all');
      setSearchQuery('');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [searchParams]);

  // Fetch products on mount and set up polling for updates
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('/api/products');
        const data = await response.json();
        setProducts(data.products || []);
        setCategories(data.categories || []);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();

    // Poll for updates every 1 minute
    const interval = setInterval(fetchProducts, 60000);

    return () => clearInterval(interval);
  }, []);

  // Filter products based on category and search
  const filteredProducts = useMemo(() => {
    let filtered = products;

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(
        (product) => product.category === selectedCategory
      );
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (product) =>
          product.name.toLowerCase().includes(query) ||
          product.description.toLowerCase().includes(query) ||
          product.category.toLowerCase().includes(query) ||
          product.tags?.some((tag) => tag.toLowerCase().includes(query))
      );
    }

    return filtered;
  }, [products, selectedCategory, searchQuery]);

  // Separate featured and regular products
  const featuredProducts = filteredProducts.filter((p) => p.featured);
  const regularProducts = filteredProducts.filter((p) => !p.featured);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">🌿</div>
          <p className="text-xl font-semibold text-gray-700">Loading Amritam Natural...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header onSearch={setSearchQuery} />

      <main className="container mx-auto px-4 py-8">
        {/* Hero Section - Compact */}
        <div className="bg-gradient-to-r from-primary-600 to-primary-700 rounded-xl p-4 md:p-6 mb-6 text-white">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold mb-1">
                Fresh Organic Products
              </h1>
              <p className="text-sm md:text-base text-primary-50">
                100% certified organic food delivered to your doorstep. Healthy living starts here!
              </p>
            </div>
            <div className="flex gap-4 text-xs md:text-sm flex-shrink-0">
              <div className="flex items-center gap-1">
                <span className="text-lg">✓</span>
                <span>Pesticide Free</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="text-lg">✓</span>
                <span>Farm Fresh</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="text-lg">✓</span>
                <span>Quality Assured</span>
              </div>
            </div>
          </div>
        </div>

        {/* Category Filter */}
        <CategoryFilter
          categories={categories}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />

        {/* Search Results Info */}
        {searchQuery && (
          <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-blue-800">
              Found <strong>{filteredProducts.length}</strong> products for "{searchQuery}"
            </p>
          </div>
        )}

        {/* Featured Products */}
        {featuredProducts.length > 0 && !searchQuery && (
          <div className="mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <span>⭐</span>
              Featured Products
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {featuredProducts.map((product) => (
                <ProductCard
                  key={`${product.id}-${product.image}`}
                  product={product}
                  onViewDetails={setSelectedProduct}
                />
              ))}
            </div>
          </div>
        )}

        {/* All Products */}
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
            {searchQuery
              ? 'Search Results'
              : selectedCategory === 'all'
              ? 'All Products'
              : selectedCategory}
          </h2>
          
          {/* Show all filtered products when searching, otherwise show only regular products */}
          {(searchQuery ? filteredProducts : regularProducts).length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {(searchQuery ? filteredProducts : regularProducts).map((product) => (
                <ProductCard
                  key={`${product.id}-${product.image}`}
                  product={product}
                  onViewDetails={setSelectedProduct}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">
                No products found
              </h3>
              <p className="text-gray-500">
                Try adjusting your search or filter to find what you're looking for.
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <footer className="mt-16 pt-8 border-t border-gray-200">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <h3 className="font-bold text-lg mb-3 flex items-center gap-2">
                <span className="text-2xl">🌿</span>
                Amritam Natural
              </h3>
              <p className="text-gray-600 text-sm">
                Your trusted source for 100% organic and fresh food products.
                Healthy living made easy!
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Quick Links</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/about" className="text-gray-600 hover:text-primary-600 transition">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-gray-600 hover:text-primary-600 transition">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Buy From</h4>
              <div className="flex gap-4">
                <a
                  href="https://www.amazon.in/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary-600 hover:text-primary-700 hover:scale-110 transition"
                  title="Amazon"
                >
                  <AmazonIcon size={32} />
                </a>
                <a
                  href="https://www.flipkart.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary-600 hover:text-primary-700 hover:scale-110 transition"
                  title="Flipkart"
                >
                  <FlipkartIcon size={32} />
                </a>
                <a
                  href="https://www.swiggyinstamart.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary-600 hover:text-primary-700 hover:scale-110 transition"
                  title="Swiggy Instamart"
                >
                  <SwiggyIcon size={32} />
                </a>
                <a
                  href="https://blinkit.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary-600 hover:text-primary-700 hover:scale-110 transition"
                  title="Blinkit"
                >
                  <BlinkitIcon size={32} />
                </a>
              </div>
            </div>
          </div>
          <div className="text-center text-sm text-gray-500 pt-6 border-t border-gray-200">
            <p>© 2024 Amritam Natural. All rights reserved.</p>
          </div>
        </footer>
      </main>

      {/* Product Modal */}
      <ProductModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
    </div>
  );
}

// Made with Bob