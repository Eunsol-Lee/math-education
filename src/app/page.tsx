import Link from 'next/link';
import GugudanTable from '@/components/GugudanTable';

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

        {/* Mode Selection */}
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-700 mb-6">연습 모드 선택 (Choose Practice Mode)</h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 max-w-3xl mx-auto">
            <Link
              href="/practice?mode=multiply"
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-4 px-3 rounded-lg text-sm transition-colors flex flex-col items-center"
            >
              <span className="text-2xl mb-1">✖️</span>
              구구단<br/>(2-9)
            </Link>
            <Link
              href="/practice?mode=multiply-extended"
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-3 rounded-lg text-sm transition-colors flex flex-col items-center"
            >
              <span className="text-2xl mb-1">✖️✖️</span>
              확장구구단<br/>(2-12)
            </Link>
            <Link
              href="/practice?mode=plus"
              className="bg-green-500 hover:bg-green-600 text-white font-bold py-4 px-3 rounded-lg text-sm transition-colors flex flex-col items-center"
            >
              <span className="text-2xl mb-1">➕</span>
              덧셈<br/>(1-90+1-9)
            </Link>
            <Link
              href="/practice?mode=minus"
              className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 px-3 rounded-lg text-sm transition-colors flex flex-col items-center"
            >
              <span className="text-2xl mb-1">➖</span>
              뺄셈<br/>(10-99-1-9)
            </Link>
            <Link
              href="/practice?mode=divide"
              className="bg-purple-500 hover:bg-purple-600 text-white font-bold py-4 px-3 rounded-lg text-sm transition-colors flex flex-col items-center"
            >
              <span className="text-2xl mb-1">➗</span>
              나눗셈<br/>(Divide)
            </Link>
          </div>
        </div>

        <main className="space-y-6">
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
