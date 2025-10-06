import PracticeMode from '@/components/PracticeMode';

export default function PracticePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-4">
      <div className="max-w-4xl mx-auto">
        <header className="text-center py-8">
          <h1 className="text-5xl font-bold text-gray-800 mb-2">
            구구단 연습
          </h1>
          <p className="text-xl text-gray-600">
            Practice Korean Multiplication Tables
          </p>
        </header>

        <main>
          <PracticeMode />
        </main>

        <footer className="text-center py-8 text-gray-500">
          <p>Keep practicing! 💪</p>
        </footer>
      </div>
    </div>
  );
}