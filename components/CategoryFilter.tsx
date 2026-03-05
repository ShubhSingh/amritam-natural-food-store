'use client';

import { ProductCategory } from '@/types/product';

interface CategoryFilterProps {
  categories: ProductCategory[];
  selectedCategory: string;
  onSelectCategory: (categoryId: string) => void;
}

export default function CategoryFilter({
  categories,
  selectedCategory,
  onSelectCategory,
}: CategoryFilterProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-6">
      <h2 className="text-lg font-bold text-gray-800 mb-4">Categories</h2>
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => onSelectCategory('all')}
          className={`px-4 py-2 rounded-lg font-medium transition ${
            selectedCategory === 'all'
              ? 'bg-primary-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          All Products
        </button>
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => onSelectCategory(category.name)}
            className={`px-4 py-2 rounded-lg font-medium transition flex items-center gap-2 ${
              selectedCategory === category.name
                ? 'bg-primary-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <span>{category.icon}</span>
            <span>{category.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

// Made with Bob
