'use client';

import { useState } from 'react';

export default function TestBlobPage() {
  const [status, setStatus] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const checkBlobStatus = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/blob-status');
      const data = await response.json();
      setStatus(data);
    } catch (error) {
      setStatus({ error: error instanceof Error ? error.message : 'Unknown error' });
    } finally {
      setLoading(false);
    }
  };

  const testSave = async () => {
    setLoading(true);
    try {
      const testProducts = [
        {
          id: 'test-1',
          name: 'Test Product',
          description: 'This is a test',
          category: 'Test',
          weightKg: 1,
          priceRupees: 100,
          image: '',
          inStock: true,
          purchaseLinks: [],
        }
      ];

      const response = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ products: testProducts }),
      });

      const data = await response.json();
      setStatus({ saveResult: data });
    } catch (error) {
      setStatus({ error: error instanceof Error ? error.message : 'Unknown error' });
    } finally {
      setLoading(false);
    }
  };

  const testRead = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/products');
      const data = await response.json();
      setStatus({ readResult: data });
    } catch (error) {
      setStatus({ error: error instanceof Error ? error.message : 'Unknown error' });
    } finally {
      setLoading(false);
    }
  };

  const migrateBlob = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/migrate-blob', {
        method: 'POST',
      });
      const data = await response.json();
      setStatus({ migrateResult: data });
    } catch (error) {
      setStatus({ error: error instanceof Error ? error.message : 'Unknown error' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Blob Storage Test</h1>
        
        <div className="bg-red-50 border-2 border-red-500 rounded-lg p-4 mb-6">
          <h2 className="text-xl font-bold text-red-700 mb-2">⚠️ IMPORTANT - Run This First!</h2>
          <p className="text-red-600 mb-3">
            Your blob is currently private and causing "Forbidden" errors. Click this button to migrate to public access:
          </p>
          <button
            onClick={migrateBlob}
            disabled={loading}
            className="bg-red-600 text-white px-8 py-3 rounded-lg hover:bg-red-700 disabled:opacity-50 font-bold"
          >
            🔄 Migrate Blob to Public Access
          </button>
        </div>
        
        <div className="space-y-4 mb-6">
          <button
            onClick={checkBlobStatus}
            disabled={loading}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 disabled:opacity-50"
          >
            Check Blob Status
          </button>
          
          <button
            onClick={testSave}
            disabled={loading}
            className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 disabled:opacity-50 ml-4"
          >
            Test Save to Blob
          </button>
          
          <button
            onClick={testRead}
            disabled={loading}
            className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 disabled:opacity-50 ml-4"
          >
            Test Read from Blob
          </button>
        </div>

        {loading && <p className="text-gray-600">Loading...</p>}

        {status && (
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-bold mb-4">Result:</h2>
            <pre className="bg-gray-100 p-4 rounded overflow-auto text-sm">
              {JSON.stringify(status, null, 2)}
            </pre>
          </div>
        )}

        <div className="mt-8 bg-yellow-50 border border-yellow-200 rounded-lg p-6">
          <h3 className="font-bold mb-2">Instructions:</h3>
          <ol className="list-decimal list-inside space-y-2 text-sm">
            <li>Click "Check Blob Status" to verify the token is working</li>
            <li>Click "Test Save to Blob" to save test data</li>
            <li>Click "Test Read from Blob" to read the saved data</li>
            <li>Open browser console (F12) to see detailed logs</li>
          </ol>
        </div>
      </div>
    </div>
  );
}

// Made with Bob
