'use client';

interface ConfirmDialogProps {
  isOpen: boolean;
  title: string;
  message: string;
  productName?: string;
  productCategory?: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function ConfirmDialog({
  isOpen,
  title,
  message,
  productName,
  productCategory,
  onConfirm,
  onCancel,
}: ConfirmDialogProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-md w-full p-6 shadow-xl">
        <h3 className="text-xl font-bold text-gray-900 mb-4">{title}</h3>
        <p className="text-gray-700 mb-2">{message}</p>
        {productName && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
            <p className="font-bold text-red-900 text-lg mb-1">{productName}</p>
            {productCategory && (
              <p className="text-sm text-red-700">
                Category: <span className="font-semibold">{productCategory}</span>
              </p>
            )}
          </div>
        )}
        <div className="flex gap-3 justify-end">
          <button
            onClick={onCancel}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition font-medium"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition font-medium"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

// Made with Bob
