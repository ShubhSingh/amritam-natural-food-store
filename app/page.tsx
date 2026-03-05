import { Suspense } from 'react';
import HomeContent from '@/components/HomeContent';

export default function Home() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">🌿</div>
          <p className="text-xl font-semibold text-gray-700">Loading Amritam Natural...</p>
        </div>
      </div>
    }>
      <HomeContent />
    </Suspense>
  );
}

// Made with Bob
