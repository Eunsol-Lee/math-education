import { Suspense } from 'react';
import PracticePageContent from './PracticePageContent';

export default function PracticePage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center py-20">
            <div className="text-2xl text-gray-600">Loading...</div>
          </div>
        </div>
      </div>
    }>
      <PracticePageContent />
    </Suspense>
  );
}