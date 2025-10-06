'use client';

import { useSearchParams } from 'next/navigation';
import PracticeMode from '@/components/PracticeMode';

export default function PracticePageContent() {
  const searchParams = useSearchParams();
  const mode = searchParams.get('mode') || 'multiply';

  const getModeTitle = (mode: string) => {
    switch (mode) {
      case 'multiply': return { korean: '계산왕 이은우의 구구단 도전!!', english: 'Math King Eunsol&apos;s Multiplication Challenge!! (2-20, Customizable)' };
      case 'multiply-extended': return { korean: '계산왕 이은우의 확장 구구단 도전!!', english: 'Math King Eunsol&apos;s Extended Multiplication Challenge!! (2-12)' };
      case 'plus': return { korean: '계산왕 이은우의 덧셈 도전!!', english: 'Math King Eunsol&apos;s Addition Challenge!! (Customizable Range)' };
      case 'minus': return { korean: '계산왕 이은우의 뺄셈 도전!!', english: 'Math King Eunsol&apos;s Subtraction Challenge!! (Customizable Range)' };
      case 'divide': return { korean: '계산왕 이은우의 나눗셈 도전!!', english: 'Math King Eunsol&apos;s Division Challenge!! (Customizable Range)' };
      default: return { korean: '계산왕 이은우의 구구단 도전!!', english: 'Math King Eunsol&apos;s Multiplication Challenge!!' };
    }
  };

  const modeTitle = getModeTitle(mode);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-4">
      <div className="max-w-4xl mx-auto">
        <header className="text-center py-8">
          <h1 className="text-5xl font-bold text-gray-800 mb-2">
            {modeTitle.korean}
          </h1>
          <p className="text-xl text-gray-600">
            {modeTitle.english}
          </p>
        </header>

        <main>
          <PracticeMode mode={mode} />
        </main>

        <footer className="text-center py-8 text-gray-500">
          <p>계산왕 이은우와 함께 도전하세요! 💪</p>
        </footer>
      </div>
    </div>
  );
}