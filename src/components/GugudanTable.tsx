import { getKoreanNumber } from '@/lib/korean-numbers';

interface GugudanTableProps {
  dan: number; // The number for this 단 (2, 3, 4, ..., 9)
}

export default function GugudanTable({ dan }: GugudanTableProps) {
  const problems = Array.from({ length: 9 }, (_, i) => {
    const multiplier = i + 1;
    const result = dan * multiplier;
    return {
      multiplier,
      result,
      koreanMultiplier: getKoreanNumber(multiplier),
      koreanResult: getKoreanNumber(result)
    };
  });

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6 border-2 border-blue-200">
      <h2 className="text-3xl font-bold text-center mb-4 text-blue-600">
        {dan}단
      </h2>
      <div className="grid grid-cols-1 gap-3">
        {problems.map(({ multiplier, result, koreanMultiplier, koreanResult }) => (
          <div
            key={multiplier}
            className="flex items-center justify-center text-xl font-semibold bg-yellow-50 rounded-lg p-3 hover:bg-yellow-100 transition-colors"
          >
            <span className="text-blue-600 mr-2">{dan}</span>
            <span className="text-gray-600 mr-2">×</span>
            <span className="text-green-600 mr-2">{multiplier}</span>
            <span className="text-gray-600 mr-2">=</span>
            <span className="text-red-600 mr-4">{result}</span>
            <span className="text-sm text-gray-500">
              ({getKoreanNumber(dan)} × {koreanMultiplier} = {koreanResult})
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}