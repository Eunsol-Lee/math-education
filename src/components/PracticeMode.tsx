'use client';

import { useState, useEffect, useCallback } from 'react';
import { getKoreanNumber } from '@/lib/korean-numbers';

interface Problem {
  dan: number;
  multiplier: number;
  answer: number;
}

export default function PracticeMode() {
  const [currentProblem, setCurrentProblem] = useState<Problem | null>(null);
  const [userAnswer, setUserAnswer] = useState('');
  const [feedback, setFeedback] = useState<'correct' | 'incorrect' | null>(null);
  const [score, setScore] = useState({ correct: 0, total: 0 });

  const generateProblem = (): Problem => {
    const dan = Math.floor(Math.random() * 8) + 2; // 2-9
    const multiplier = Math.floor(Math.random() * 9) + 1; // 1-9
    return {
      dan,
      multiplier,
      answer: dan * multiplier
    };
  };

  const startNewProblem = useCallback(() => {
    setCurrentProblem(generateProblem());
    setUserAnswer('');
    setFeedback(null);
  }, []);

  const checkAnswer = () => {
    if (!currentProblem) return;

    const userNum = parseInt(userAnswer);
    const isCorrect = userNum === currentProblem.answer;

    setFeedback(isCorrect ? 'correct' : 'incorrect');
    setScore(prev => ({
      correct: prev.correct + (isCorrect ? 1 : 0),
      total: prev.total + 1
    }));

    // Auto-advance to next problem after 2 seconds
    setTimeout(() => {
      startNewProblem();
    }, 2000);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && userAnswer.trim()) {
      checkAnswer();
    }
  };

  useEffect(() => {
    startNewProblem();
  }, [startNewProblem]);

  if (!currentProblem) return <div>Loading...</div>;

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6 border-2 border-green-200">
      <h2 className="text-3xl font-bold text-center mb-6 text-green-600">
        연습 모드 (Practice Mode)
      </h2>

      {/* Score Display */}
      <div className="text-center mb-6">
        <p className="text-lg text-gray-600">
          점수: {score.correct} / {score.total}
          {score.total > 0 && (
            <span className="ml-2 text-sm">
              ({Math.round((score.correct / score.total) * 100)}%)
            </span>
          )}
        </p>
      </div>

      {/* Problem Display */}
      <div className="text-center mb-6">
        <div className="text-6xl font-bold mb-4">
          <span className="text-blue-600">{currentProblem.dan}</span>
          <span className="text-gray-600 mx-4">×</span>
          <span className="text-green-600">{currentProblem.multiplier}</span>
          <span className="text-gray-600 mx-4">=</span>
          <span className="text-gray-400">?</span>
        </div>
        <div className="text-xl text-gray-500">
          ({getKoreanNumber(currentProblem.dan)} × {getKoreanNumber(currentProblem.multiplier)} = ?)
        </div>
      </div>

      {/* Answer Input */}
      <div className="text-center mb-6">
        <input
          type="number"
          value={userAnswer}
          onChange={(e) => setUserAnswer(e.target.value)}
          onKeyDown={handleKeyDown}
          className="text-4xl text-center w-32 p-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
          placeholder="답"
          disabled={feedback !== null}
        />
      </div>

      {/* Feedback */}
      {feedback && (
        <div className={`text-center text-2xl font-bold mb-4 ${
          feedback === 'correct'
            ? 'text-green-600'
            : 'text-red-600'
        }`}>
          {feedback === 'correct' ? '정답! 🎉' : `틀렸어요. 정답은 ${currentProblem.answer}입니다.`}
        </div>
      )}

      {/* Check Button */}
      <div className="text-center">
        <button
          onClick={checkAnswer}
          disabled={!userAnswer.trim() || feedback !== null}
          className="bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300 text-white font-bold py-3 px-6 rounded-lg text-xl transition-colors"
        >
          확인 (Check)
        </button>
      </div>
    </div>
  );
}