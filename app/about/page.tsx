'use client';

import Header from '@/components/Header';
import { Heart, Leaf, Users, Award } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <Header onSearch={() => {}} />
      
      {/* Page Title */}
      <div className="bg-primary-600 text-white py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold">About Amritam Natural</h1>
          <p className="text-primary-100 mt-2">Your trusted partner in organic living</p>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Mission Section */}
          <div className="bg-white rounded-lg shadow-md p-8 mb-8">
            <div className="flex items-center gap-3 mb-4">
              <Heart className="text-primary-600" size={32} />
              <h2 className="text-3xl font-bold text-gray-900">Our Mission</h2>
            </div>
            <p className="text-gray-700 leading-relaxed mb-4">
              At Amritam Natural, we believe that healthy living starts with what you eat. Our mission is to make 100% organic, pesticide-free food accessible to every household in India. We partner with certified organic farmers and trusted suppliers to bring you the finest quality products.
            </p>
            <p className="text-gray-700 leading-relaxed">
              We don't maintain our own inventory or delivery system. Instead, we've partnered with India's leading e-commerce platforms - Amazon, Flipkart, Swiggy Instamart, and Blinkit - to ensure you get fresh, organic products delivered right to your doorstep with the convenience and reliability you trust.
            </p>
          </div>

          {/* Why Choose Us */}
          <div className="bg-white rounded-lg shadow-md p-8 mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Why Choose Us</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                    <Leaf className="text-primary-600" size={24} />
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">100% Organic</h3>
                  <p className="text-gray-600 text-sm">
                    All our products are certified organic, grown without harmful pesticides or chemicals.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                    <Award className="text-primary-600" size={24} />
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Quality Assured</h3>
                  <p className="text-gray-600 text-sm">
                    Every product is carefully selected and quality-checked before listing.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                    <Users className="text-primary-600" size={24} />
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Supporting Farmers</h3>
                  <p className="text-gray-600 text-sm">
                    We work directly with organic farmers, ensuring fair prices and sustainable practices.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                    <Heart className="text-primary-600" size={24} />
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Customer First</h3>
                  <p className="text-gray-600 text-sm">
                    Your health and satisfaction are our top priorities. We're here to help you live healthier.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Our Story */}
          <div className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Story</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Amritam Natural was born from a simple belief: everyone deserves access to pure, organic food. In a world where processed foods and harmful chemicals have become the norm, we wanted to create a platform that makes it easy for families to choose healthier alternatives.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              We started by curating the best organic products from across India - from fresh vegetables and fruits to wholesome grains, pulses, and natural sweeteners. Each product is carefully selected based on its quality, organic certification, and nutritional value.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Today, we're proud to partner with major e-commerce platforms to bring these products to your doorstep. Whether you prefer Amazon's reliability, Flipkart's deals, Swiggy's speed, or Blinkit's convenience - we've got you covered. Your journey to organic living is just a click away!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// Made with Bob