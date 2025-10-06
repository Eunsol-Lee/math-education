'use client';

import { useSearchParams } from 'next/navigation';
import PracticeMode from '@/components/PracticeMode';

export default function PracticePageContent() {
  const searchParams = useSearchParams();
  const mode = searchParams.get('mode') || 'multiply';

  const getModeTitle = (mode: string) => {
    switch (mode) {
      case 'multiply': return { korean: '구구단 연습', english: 'Multiplication Practice (2-9)' };
      case 'multiply-extended': return { korean: '확장 구구단 연습', english: 'Extended Multiplication Practice (2-12)' };
      case 'plus': return { korean: '덧셈 연습', english: 'Addition Practice' };
      case 'minus': return { korean: '뺄셈 연습', english: 'Subtraction Practice' };
      case 'divide': return { korean: '나눗셈 연습', english: 'Division Practice' };
      default: return { korean: '구구단 연습', english: 'Multiplication Practice' };
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
          <p>Keep practicing! 💪</p>
        </footer>
      </div>
    </div>
  );
}