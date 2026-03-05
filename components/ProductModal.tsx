'use client';

import { Product } from '@/types/product';
import { X, Star, ShoppingBag, ExternalLink } from 'lucide-react';
import { AmazonIcon, FlipkartIcon, SwiggyIcon, BlinkitIcon } from './PlatformIcons';
import Image from 'next/image';
import { useState, useEffect } from 'react';

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
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

export default function ProductModal({ product, onClose }: ProductModalProps) {
  if (!product) return null;

  const discountPercentage = product.discount || 0;
  const hasDiscount = discountPercentage > 0;
  const [imageError, setImageError] = useState(false);

  // Reset image error state when product changes
  useEffect(() => {
    setImageError(false);
  }, [product.image]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition z-10"
        >
          <X size={24} />
        </button>

        <div className="grid md:grid-cols-2 gap-6 p-6">
          {/* Product Image */}
          <div className="relative">
            <div className="bg-gray-100 rounded-lg h-96 overflow-hidden">
              {!imageError ? (
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover"
                  onError={() => setImageError(true)}
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-9xl">
                  {getCategoryIcon(product.category)}
                </div>
              )}
            </div>
            {hasDiscount && (
              <div className="absolute top-4 left-4 bg-accent-500 text-white px-3 py-2 rounded-md text-lg font-bold">
                {discountPercentage}% OFF
              </div>
            )}
            {product.featured && (
              <div className="absolute top-4 right-4 bg-primary-600 text-white px-3 py-2 rounded-md text-sm font-semibold">
                ⭐ Featured Product
              </div>
            )}
          </div>

          {/* Product Details */}
          <div className="flex flex-col">
            {/* Category */}
            <p className="text-sm text-primary-600 font-semibold mb-2">{product.category}</p>

            {/* Product Name */}
            <h2 className="text-3xl font-bold text-gray-900 mb-3">{product.name}</h2>

            {/* Rating */}
            {product.rating && (
              <div className="flex items-center gap-2 mb-4">
                <div className="flex items-center bg-primary-600 text-white px-3 py-1 rounded text-sm font-semibold">
                  <Star size={16} fill="white" className="mr-1" />
                  {product.rating}
                </div>
                <span className="text-sm text-gray-600">
                  {product.reviewCount} ratings
                </span>
              </div>
            )}

            {/* Price */}
            <div className="flex items-center gap-3 mb-4">
              <span className="text-4xl font-bold text-gray-900">
                ₹{product.priceRupees}
              </span>
              {hasDiscount && product.originalPrice && (
                <>
                  <span className="text-xl text-gray-500 line-through">
                    ₹{product.originalPrice}
                  </span>
                  <span className="text-lg text-green-600 font-semibold">
                    Save ₹{product.originalPrice - product.priceRupees}
                  </span>
                </>
              )}
            </div>

            {/* Weight */}
            <div className="mb-4 p-3 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600">
                Weight: <span className="font-bold text-gray-900 text-lg">{product.weightKg} kg</span>
              </p>
            </div>

            {/* Description */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2">Product Description</h3>
              <p className="text-gray-700 leading-relaxed">{product.description}</p>
            </div>

            {/* Tags */}
            {product.tags && product.tags.length > 0 && (
              <div className="mb-6">
                <div className="flex flex-wrap gap-2">
                  {product.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm font-medium"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Stock Status */}
            <div className="mb-6">
              {product.inStock ? (
                <div className="flex items-center gap-2 text-green-600 font-semibold">
                  <div className="w-3 h-3 bg-green-600 rounded-full"></div>
                  In Stock - Ready to Ship
                </div>
              ) : (
                <div className="flex items-center gap-2 text-red-600 font-semibold">
                  <div className="w-3 h-3 bg-red-600 rounded-full"></div>
                  Out of Stock
                </div>
              )}
            </div>

            {/* Purchase Links */}
            <div className="border-t pt-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <ShoppingBag size={20} />
                Buy from Your Favorite Platform
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {product.purchaseLinks.map((link) => (
                  <a
                    key={link.platform}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex flex-col items-center justify-center p-4 rounded-lg border-2 transition ${
                      link.available
                        ? 'border-primary-300 hover:border-primary-500 hover:bg-primary-50 cursor-pointer'
                        : 'border-gray-200 bg-gray-50 cursor-not-allowed opacity-60'
                    }`}
                  >
                    <div className="text-primary-600 mb-2">
                      {link.platform === 'amazon' && <AmazonIcon size={40} />}
                      {link.platform === 'flipkart' && <FlipkartIcon size={40} />}
                      {link.platform === 'swiggy' && <SwiggyIcon size={40} />}
                      {link.platform === 'blinkit' && <BlinkitIcon size={40} />}
                    </div>
                    <p className="font-semibold text-gray-900 capitalize text-center">
                      {link.platform}
                    </p>
                    <p className="text-xs text-gray-600 text-center mt-1">
                      {link.available ? 'Available Now' : 'Unavailable'}
                    </p>
                    {link.available && (
                      <ExternalLink size={16} className="text-primary-600 mt-2" />
                    )}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Made with Bob
