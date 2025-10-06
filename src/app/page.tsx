import GugudanTable from '@/components/GugudanTable';
import PracticeMode from '@/components/PracticeMode';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-4">
      <div className="max-w-4xl mx-auto">
        <header className="text-center py-8">
          <h1 className="text-5xl font-bold text-gray-800 mb-2">
            구구단
          </h1>
          <p className="text-xl text-gray-600">
            Korean Multiplication Tables for Kids
          </p>
        </header>

        <main className="space-y-6">
          {/* Practice Mode */}
          <PracticeMode />

          {/* Reference Tables */}
          <div className="text-center mb-4">
            <h2 className="text-2xl font-bold text-gray-700">구구단 표 (Reference Tables)</h2>
          </div>

          {/* Generate tables for 2단 through 9단 */}
          {Array.from({ length: 8 }, (_, i) => i + 2).map((dan) => (
            <GugudanTable key={dan} dan={dan} />
          ))}
        </main>

        <footer className="text-center py-8 text-gray-500">
          <p>Practice makes perfect! 🎓</p>
        </footer>
      </div>
    </div>
  );
}
