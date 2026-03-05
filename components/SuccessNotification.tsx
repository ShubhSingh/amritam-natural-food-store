'use client';

import { CheckCircle, X } from 'lucide-react';
import { useEffect } from 'react';

interface SuccessNotificationProps {
  show: boolean;
  productName: string;
  category: string;
  action: 'saved' | 'deleted';
  onClose: () => void;
}

export default function SuccessNotification({
  show,
  productName,
  category,
  action,
  onClose,
}: SuccessNotificationProps) {
  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => {
        onClose();
      }, 5000); // Auto-close after 5 seconds

      return () => clearTimeout(timer);
    }
  }, [show, onClose]);

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-2xl border-l-4 border-green-500 p-6 max-w-md mx-4 animate-scale-in">
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0">
            <CheckCircle className="text-green-500" size={24} />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-gray-900 mb-1">
              Product {action === 'saved' ? 'Saved' : 'Deleted'} Successfully!
            </h3>
            <p className="text-sm text-gray-600 mb-2">
              <span className="font-medium text-gray-900">{productName}</span>
              {' '}({category})
            </p>
            <p className="text-xs text-green-600 font-medium">
              ✓ Changes are live on the website
            </p>
          </div>
          <button
            onClick={onClose}
            className="flex-shrink-0 text-gray-400 hover:text-gray-600 transition"
          >
            <X size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}

// Made with Bob
