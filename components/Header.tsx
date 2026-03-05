'use client';

import { Search, Menu, X, Home, Info, Phone } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

interface HeaderProps {
  onSearch: (query: string) => void;
}

export default function Header({ onSearch }: HeaderProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMobileMenuOpen(false);
      }
    };

    if (mobileMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [mobileMenuOpen]);

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    onSearch(value); // Update search in real-time
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchQuery);
  };

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md">
      <div className="bg-primary-600 text-white py-2 px-4 text-center text-sm">
        🌱 100% Organic Products | Free Delivery on Orders Above ₹500
      </div>
      
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between gap-4">
          {/* Logo */}
          <Link href="/?reset=true" className="flex items-center gap-2 hover:opacity-80 transition">
            <div className="text-3xl">🌿</div>
            <div>
              <h1 className="text-xl md:text-2xl font-bold text-primary-700">
                Amritam Natural
              </h1>
              <p className="text-xs text-gray-600 hidden md:block">Fresh & Healthy</p>
            </div>
          </Link>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="flex-1 max-w-2xl hidden md:flex">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search for organic products..."
                value={searchQuery}
                onChange={(e) => handleSearchChange(e.target.value)}
                className="w-full px-4 py-2 pr-12 border-2 border-primary-300 rounded-lg focus:outline-none focus:border-primary-500"
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-primary-600 text-white p-2 rounded-md hover:bg-primary-700 transition"
              >
                <Search size={20} />
              </button>
            </div>
          </form>

          {/* Menu Button */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 hover:bg-gray-100 rounded-lg"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Search */}
        <form onSubmit={handleSearch} className="mt-3 md:hidden">
          <div className="relative">
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => handleSearchChange(e.target.value)}
              className="w-full px-4 py-2 pr-12 border-2 border-primary-300 rounded-lg focus:outline-none focus:border-primary-500"
            />
            <button
              type="submit"
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-primary-600 text-white p-2 rounded-md"
            >
              <Search size={18} />
            </button>
          </div>
        </form>

        {/* Navigation Menu */}
        {mobileMenuOpen && (
          <div ref={menuRef} className="mt-4 pb-4 border-t border-gray-200">
            <nav className="flex flex-col space-y-2 pt-4">
              <Link
                href="/?reset=true"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-3 px-4 py-3 hover:bg-gray-100 rounded-lg transition"
              >
                <Home size={20} className="text-primary-600" />
                <span className="font-medium">Products</span>
              </Link>
              <Link
                href="/about"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-3 px-4 py-3 hover:bg-gray-100 rounded-lg transition"
              >
                <Info size={20} className="text-primary-600" />
                <span className="font-medium">About Us</span>
              </Link>
              <Link
                href="/contact"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-3 px-4 py-3 hover:bg-gray-100 rounded-lg transition"
              >
                <Phone size={20} className="text-primary-600" />
                <span className="font-medium">Contact</span>
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}

// Made with Bob
