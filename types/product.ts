export interface PurchaseLink {
  platform: 'amazon' | 'flipkart' | 'swiggy' | 'blinkit';
  url: string;
  available: boolean;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  category: string;
  weightKg: number;
  priceRupees: number;
  originalPrice?: number;
  discount?: number;
  image: string;
  inStock: boolean;
  rating?: number;
  reviewCount?: number;
  purchaseLinks: PurchaseLink[];
  tags?: string[];
  featured?: boolean;
}

export interface ProductCategory {
  id: string;
  name: string;
  icon: string;
}

// Made with Bob
