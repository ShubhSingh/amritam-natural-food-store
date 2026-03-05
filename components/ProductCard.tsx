'use client';

import { Product } from '@/types/product';
import { Star, ShoppingCart } from 'lucide-react';
import { AmazonIcon, FlipkartIcon, SwiggyIcon, BlinkitIcon } from './PlatformIcons';
import Image from 'next/image';
import { useState, useEffect } from 'react';

interface ProductCardProps {
  product: Product;
  onViewDetails: (product: Product) => void;
}

const getCategoryIcon = (category: string) => {
  const icons: { [key: string]: string } = {
    'Fruits': '🍎',
    'Vegetables': '🥬',
    'Grains & Cereals': '🌾',
    'Pulses & Lentils': '🫘',
    'Sweeteners': '🍯',
  };
  return icons[category] || '🛒';
};

export default function ProductCard({ product, onViewDetails }: ProductCardProps) {
  const discountPercentage = product.discount || 0;
  const hasDiscount = discountPercentage > 0;
  const [imageError, setImageError] = useState(false);

  // Reset image error state when product image changes
  useEffect(() => {
    setImageError(false);
  }, [product.image]);

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden group">
      {/* Product Image */}
      <div className="relative h-48 bg-gray-100 overflow-hidden">
        {hasDiscount && (
          <div className="absolute top-2 left-2 bg-accent-500 text-white px-2 py-1 rounded-md text-sm font-bold z-10">
            {discountPercentage}% OFF
          </div>
        )}
        {product.featured && (
          <div className="absolute top-2 right-2 bg-primary-600 text-white px-2 py-1 rounded-md text-xs font-semibold z-10">
            ⭐ Featured
          </div>
        )}
        {!imageError ? (
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-300"
            onError={() => setImageError(true)}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-6xl group-hover:scale-110 transition-transform duration-300">
            {getCategoryIcon(product.category)}
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="p-4">
        {/* Category */}
        <p className="text-xs text-primary-600 font-semibold mb-1">{product.category}</p>
        
        {/* Product Name */}
        <h3 className="text-lg font-bold text-gray-800 mb-2 line-clamp-2 min-h-[3.5rem]">
          {product.name}
        </h3>

        {/* Rating */}
        {product.rating && (
          <div className="flex items-center gap-1 mb-2">
            <div className="flex items-center bg-primary-600 text-white px-2 py-0.5 rounded text-xs font-semibold">
              <Star size={12} fill="white" className="mr-1" />
              {product.rating}
            </div>
            <span className="text-xs text-gray-500">({product.reviewCount})</span>
          </div>
        )}

        {/* Weight */}
        <p className="text-sm text-gray-600 mb-2">
          Weight: <span className="font-semibold">{product.weightKg} kg</span>
        </p>

        {/* Price */}
        <div className="flex items-center gap-2 mb-3">
          <span className="text-2xl font-bold text-gray-900">
            ₹{product.priceRupees}
          </span>
          {hasDiscount && product.originalPrice && (
            <span className="text-sm text-gray-500 line-through">
              ₹{product.originalPrice}
            </span>
          )}
        </div>

        {/* Stock Status */}
        <div className="mb-3">
          {product.inStock ? (
            <span className="text-xs text-green-600 font-semibold">✓ In Stock</span>
          ) : (
            <span className="text-xs text-red-600 font-semibold">✗ Out of Stock</span>
          )}
        </div>

        {/* Action Buttons */}
        <div className="space-y-2">
          <button
            onClick={() => onViewDetails(product)}
            className="w-full bg-primary-600 text-white py-2 rounded-lg font-semibold hover:bg-primary-700 transition flex items-center justify-center gap-2"
          >
            <ShoppingCart size={18} />
            View Details
          </button>

          {/* Quick Buy Links */}
          <div className="grid grid-cols-2 gap-2">
            {product.purchaseLinks.map((link) => (
              link.available && (
                <a
                  key={link.platform}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-center py-1.5 text-xs border-2 border-gray-300 rounded-md hover:border-primary-500 hover:text-primary-600 transition font-medium flex items-center justify-center gap-1"
                  title={`Buy on ${link.platform}`}
                >
                  {link.platform === 'amazon' && (
                    <>
                      <AmazonIcon size={16} />
                      <span>Amazon</span>
                    </>
                  )}
                  {link.platform === 'flipkart' && (
                    <>
                      <FlipkartIcon size={16} />
                      <span>Flipkart</span>
                    </>
                  )}
                  {link.platform === 'swiggy' && (
                    <>
                      <SwiggyIcon size={16} />
                      <span>Swiggy</span>
                    </>
                  )}
                  {link.platform === 'blinkit' && (
                    <>
                      <BlinkitIcon size={16} />
                      <span>Blinkit</span>
                    </>
                  )}
                </a>
              )
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// Made with Bob
