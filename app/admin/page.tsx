'use client';

import { useState, useEffect, useRef } from 'react';
import { Product, PurchaseLink } from '@/types/product';
import { Download, Plus, Edit, Trash2, Upload } from 'lucide-react';
import ConfirmDialog from '@/components/ConfirmDialog';
import SuccessNotification from '@/components/SuccessNotification';

export default function AdminPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const formRef = useRef<HTMLDivElement>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<{ show: boolean; product: Product | null }>({
    show: false,
    product: null,
  });
  const [successNotification, setSuccessNotification] = useState<{
    show: boolean;
    productName: string;
    category: string;
    action: 'saved' | 'deleted';
  }>({
    show: false,
    productName: '',
    category: '',
    action: 'saved',
  });

  // Load existing products from API on mount
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        console.log('Fetching products from API...');
        const response = await fetch('/api/products');
        const data = await response.json();
        
        console.log('API Response:', data);
        
        if (data.error) {
          console.error('API Error:', data.error, data.details);
          alert(`Error loading products: ${data.error}\n${data.details || ''}`);
        }
        
        setProducts(data.products || []);
        console.log('Loaded products:', data.products?.length || 0);
      } catch (error) {
        console.error('Error fetching products:', error);
        alert(`Failed to load products: ${error instanceof Error ? error.message : 'Unknown error'}`);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const [formData, setFormData] = useState<Partial<Product>>({
    name: '',
    description: '',
    category: '',
    weightKg: 0,
    priceRupees: 0,
    originalPrice: 0,
    discount: 0,
    image: '',
    inStock: true,
    rating: 0,
    reviewCount: 0,
    purchaseLinks: [
      { platform: 'amazon', url: '', available: false },
      { platform: 'flipkart', url: '', available: false },
      { platform: 'swiggy', url: '', available: false },
      { platform: 'blinkit', url: '', available: false },
    ],
    tags: [],
    featured: false,
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : type === 'number' ? parseFloat(value) : value,
    }));
  };

  const handlePurchaseLinkChange = (
    platform: 'amazon' | 'flipkart' | 'swiggy' | 'blinkit',
    field: 'url' | 'available',
    value: string | boolean
  ) => {
    setFormData((prev) => ({
      ...prev,
      purchaseLinks: prev.purchaseLinks?.map((link) =>
        link.platform === platform ? { ...link, [field]: value } : link
      ),
    }));
  };

  const handleTagsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const tags = e.target.value.split(',').map((tag) => tag.trim());
    setFormData((prev) => ({ ...prev, tags }));
  };

  const saveProducts = async (updatedProducts: Product[]) => {
    try {
      console.log('Saving products to API...', updatedProducts.length);
      const response = await fetch('/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ products: updatedProducts }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Save failed:', errorData);
        throw new Error(errorData.error || 'Failed to save products');
      }

      const result = await response.json();
      console.log('✅ Save successful:', result);
      return true;
    } catch (error) {
      console.error('❌ Error saving products:', error);
      alert('Failed to save products. Please try again. Check console for details.');
      return false;
    }
  };

  const refetchProducts = async () => {
    try {
      console.log('Refetching products from API...');
      const response = await fetch('/api/products');
      const data = await response.json();
      setProducts(data.products || []);
      console.log('✅ Refetched products:', data.products?.length);
    } catch (error) {
      console.error('❌ Error refetching products:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // When editing, preserve all existing fields and only update what's in formData
    const newProduct: Product = editingProduct
      ? {
          ...editingProduct,
          ...formData,
          id: editingProduct.id, // Always keep original ID
        } as Product
      : {
          id: `prod-${Date.now()}`,
          name: formData.name || '',
          description: formData.description || '',
          category: formData.category || '',
          weightKg: formData.weightKg || 0,
          priceRupees: formData.priceRupees || 0,
          originalPrice: formData.originalPrice,
          discount: formData.discount,
          image: formData.image || '',
          inStock: formData.inStock !== undefined ? formData.inStock : true,
          rating: formData.rating,
          reviewCount: formData.reviewCount,
          purchaseLinks: formData.purchaseLinks || [],
          tags: formData.tags,
          featured: formData.featured,
        } as Product;

    let updatedProducts: Product[];
    if (editingProduct) {
      updatedProducts = products.map((p) => (p.id === editingProduct.id ? newProduct : p));
    } else {
      updatedProducts = [...products, newProduct];
    }

    const saved = await saveProducts(updatedProducts);
    if (saved) {
      // Update local state immediately
      setProducts(updatedProducts);
      
      // Refetch from API to confirm it was saved to blob
      await refetchProducts();
      
      setSuccessNotification({
        show: true,
        productName: newProduct.name,
        category: newProduct.category,
        action: 'saved',
      });
      resetForm();
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      category: '',
      weightKg: 0,
      priceRupees: 0,
      originalPrice: 0,
      discount: 0,
      image: '',
      inStock: true,
      rating: 0,
      reviewCount: 0,
      purchaseLinks: [
        { platform: 'amazon', url: '', available: false },
        { platform: 'flipkart', url: '', available: false },
        { platform: 'swiggy', url: '', available: false },
        { platform: 'blinkit', url: '', available: false },
      ],
      tags: [],
      featured: false,
    });
    setEditingProduct(null);
    setShowForm(false);
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setFormData(product);
    setShowForm(true);
    
    // Scroll to form after a brief delay to ensure it's rendered
    setTimeout(() => {
      formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  const handleDeleteClick = (product: Product) => {
    setDeleteConfirm({ show: true, product });
  };

  const handleDeleteConfirm = async () => {
    if (!deleteConfirm.product) return;

    const updatedProducts = products.filter((p) => p.id !== deleteConfirm.product!.id);
    const saved = await saveProducts(updatedProducts);
    if (saved) {
      // Update local state immediately
      setProducts(updatedProducts);
      
      // Refetch from API to confirm it was saved to blob
      await refetchProducts();
      
      setSuccessNotification({
        show: true,
        productName: deleteConfirm.product.name,
        category: deleteConfirm.product.category,
        action: 'deleted',
      });
      setDeleteConfirm({ show: false, product: null });
    }
  };

  const handleDeleteCancel = () => {
    setDeleteConfirm({ show: false, product: null });
  };

  const downloadJSON = () => {
    const dataStr = JSON.stringify({ products }, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'products.json';
    link.click();
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <SuccessNotification
        show={successNotification.show}
        productName={successNotification.productName}
        category={successNotification.category}
        action={successNotification.action}
        onClose={() => setSuccessNotification({ ...successNotification, show: false })}
      />
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                🛠️ Amritam Natural Admin Panel
              </h1>
              <p className="text-gray-600">
                Manage your organic food product catalog
              </p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => {
                  if (!showForm) {
                    setShowForm(true);
                  }
                  setTimeout(() => {
                    formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }, 100);
                }}
                className="flex items-center gap-2 bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition"
              >
                <Plus size={20} />
                Add Product
              </button>
              <button
                onClick={downloadJSON}
                disabled={products.length === 0}
                className="flex items-center gap-2 bg-accent-600 text-white px-4 py-2 rounded-lg hover:bg-accent-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Download size={20} />
                Export JSON
              </button>
            </div>
          </div>
        </div>

        {/* Products List */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-2xl font-bold mb-4">
            Products ({products.length})
          </h2>
          {loading ? (
            <div className="text-center py-12 text-gray-500">
              <div className="text-6xl mb-4">🌿</div>
              <p className="text-lg mb-2">Loading products...</p>
            </div>
          ) : products.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              <p className="text-lg mb-2">No products added yet</p>
              <p className="text-sm">Click "Add Product" to create your first product</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-semibold">Name</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold">Category</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold">Price</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold">Weight</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold">Status</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {products.map((product) => (
                    <tr key={product.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3">
                        <div className="font-medium">{product.name}</div>
                        {product.featured && (
                          <span className="text-xs bg-primary-100 text-primary-700 px-2 py-0.5 rounded">
                            Featured
                          </span>
                        )}
                      </td>
                      <td className="px-4 py-3 text-sm">{product.category}</td>
                      <td className="px-4 py-3 text-sm font-semibold">₹{product.priceRupees}</td>
                      <td className="px-4 py-3 text-sm">{product.weightKg} kg</td>
                      <td className="px-4 py-3">
                        <span
                          className={`text-xs px-2 py-1 rounded ${
                            product.inStock
                              ? 'bg-green-100 text-green-700'
                              : 'bg-red-100 text-red-700'
                          }`}
                        >
                          {product.inStock ? 'In Stock' : 'Out of Stock'}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleEdit(product)}
                            className="p-2 text-blue-600 hover:bg-blue-50 rounded transition"
                          >
                            <Edit size={18} />
                          </button>
                          <button
                            onClick={() => handleDeleteClick(product)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded transition"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Product Form */}
        {showForm && (
          <div ref={formRef} className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-2xl font-bold mb-4">
              {editingProduct ? 'Edit Product' : 'Add New Product'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Product Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Category *</label>
                  <input
                    type="text"
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Description *</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  required
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary-500"
                />
              </div>

              <div className="grid md:grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Weight (kg) *</label>
                  <input
                    type="number"
                    name="weightKg"
                    value={formData.weightKg}
                    onChange={handleInputChange}
                    required
                    step="0.1"
                    min="0"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Price (₹) *</label>
                  <input
                    type="number"
                    name="priceRupees"
                    value={formData.priceRupees}
                    onChange={handleInputChange}
                    required
                    min="0"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Original Price (₹)</label>
                  <input
                    type="number"
                    name="originalPrice"
                    value={formData.originalPrice || ''}
                    onChange={handleInputChange}
                    min="0"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Discount (%)</label>
                  <input
                    type="number"
                    name="discount"
                    value={formData.discount || ''}
                    onChange={handleInputChange}
                    min="0"
                    max="100"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary-500"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Rating</label>
                  <input
                    type="number"
                    name="rating"
                    value={formData.rating || ''}
                    onChange={handleInputChange}
                    min="0"
                    max="5"
                    step="0.1"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Review Count</label>
                  <input
                    type="number"
                    name="reviewCount"
                    value={formData.reviewCount || ''}
                    onChange={handleInputChange}
                    min="0"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Image URL</label>
                  <input
                    type="text"
                    name="image"
                    value={formData.image}
                    onChange={handleInputChange}
                    placeholder="https://example.com/image.jpg"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Tags (comma-separated)</label>
                <input
                  type="text"
                  value={formData.tags?.join(', ') || ''}
                  onChange={handleTagsChange}
                  placeholder="organic, fresh, premium"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary-500"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium">Purchase Links</label>
                {formData.purchaseLinks?.map((link) => (
                  <div key={link.platform} className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                    <span className="font-medium capitalize w-24">{link.platform}</span>
                    <input
                      type="url"
                      placeholder="URL"
                      value={link.url}
                      onChange={(e) =>
                        handlePurchaseLinkChange(link.platform, 'url', e.target.value)
                      }
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary-500"
                    />
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={link.available}
                        onChange={(e) =>
                          handlePurchaseLinkChange(link.platform, 'available', e.target.checked)
                        }
                        className="w-4 h-4"
                      />
                      <span className="text-sm">Available</span>
                    </label>
                  </div>
                ))}
              </div>

              <div className="flex gap-4">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    name="inStock"
                    checked={formData.inStock}
                    onChange={handleInputChange}
                    className="w-4 h-4"
                  />
                  <span className="text-sm font-medium">In Stock</span>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    name="featured"
                    checked={formData.featured}
                    onChange={handleInputChange}
                    className="w-4 h-4"
                  />
                  <span className="text-sm font-medium">Featured Product</span>
                </label>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  className="bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700 transition"
                >
                  {editingProduct ? 'Update Product' : 'Add Product'}
                </button>
                <button
                  type="button"
                  onClick={resetForm}
                  className="bg-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-400 transition"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Instructions */}
        <div className="bg-green-50 border border-green-200 rounded-lg p-6 mt-6">
          <h3 className="font-bold text-lg mb-3 text-green-900">✨ How It Works</h3>
          <div className="space-y-3 text-sm text-gray-700">
            <div className="flex items-start gap-2">
              <span className="text-green-600 font-bold">1.</span>
              <p><strong>Add or Edit Products:</strong> Use the form above to create new products or click the edit icon to modify existing ones.</p>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-green-600 font-bold">2.</span>
              <p><strong>Automatic Save:</strong> Changes are automatically saved to the database when you click "Add Product" or "Update Product".</p>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-green-600 font-bold">3.</span>
              <p><strong>Live Updates:</strong> The customer website automatically refreshes every 5 seconds to show your latest changes.</p>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-green-600 font-bold">4.</span>
              <p><strong>No Manual Steps:</strong> No need to export, replace files, or rebuild. Everything happens automatically!</p>
            </div>
          </div>
          <div className="mt-4 p-3 bg-white rounded border border-green-300">
            <p className="text-xs text-gray-600">
              💡 <strong>Tip:</strong> Keep the customer website open in another tab to see your changes appear in real-time.
            </p>
          </div>
        </div>
      </div>

      {/* Confirmation Dialog */}
      <ConfirmDialog
        isOpen={deleteConfirm.show}
        title="Delete Product"
        message="Are you sure you want to delete this product?"
        productName={deleteConfirm.product?.name}
        productCategory={deleteConfirm.product?.category}
        onConfirm={handleDeleteConfirm}
        onCancel={handleDeleteCancel}
      />
    </div>
  );
}

// Made with Bob
