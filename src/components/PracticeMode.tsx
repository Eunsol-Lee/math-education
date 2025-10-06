'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import Link from 'next/link';
import { getKoreanNumber } from '@/lib/korean-numbers';

interface Problem {
  id: number;
  dan: number;
  multiplier: number;
  answer: number;
  userAnswer?: number;
  isCorrect?: boolean;
  timeSpent: number;
}



const TOTAL_PROBLEMS = 10;
const TIME_PER_PROBLEM = 60; // seconds

interface PracticeModeProps {
  mode?: string;
}

export default function PracticeMode({ mode = 'multiply' }: PracticeModeProps) {
  const [problems, setProblems] = useState<Problem[]>([]);
  const [currentProblemIndex, setCurrentProblemIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [timeLeft, setTimeLeft] = useState(TIME_PER_PROBLEM);
  const [isActive, setIsActive] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [startTime, setStartTime] = useState<number>(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const generateProblems = useCallback((): Problem[] => {
    const newProblems: Problem[] = [];
    for (let i = 0; i < TOTAL_PROBLEMS; i++) {
      let dan: number, multiplier: number, answer: number;

      switch (mode) {
        case 'plus':
          dan = Math.floor(Math.random() * 99) + 1; // 1-99
          multiplier = Math.floor(Math.random() * 99) + 1; // 1-99
          answer = dan + multiplier;
          break;

        case 'minus':
          dan = Math.floor(Math.random() * 99) + 1; // 1-99 (minuend)
          multiplier = Math.floor(Math.random() * dan) + 1; // 1 to dan (subtrahend, ensures positive result)
          answer = dan - multiplier;
          break;

        case 'divide':
          multiplier = Math.floor(Math.random() * 8) + 2; // 2-9 (divisor)
          answer = Math.floor(Math.random() * 9) + 1; // 1-9 (quotient)
          dan = multiplier * answer; // dividend (ensures whole number division)
          break;

        case 'multiply-extended':
          dan = Math.floor(Math.random() * 11) + 2; // 2-12
          multiplier = Math.floor(Math.random() * 12) + 1; // 1-12
          answer = dan * multiplier;
          break;

        case 'multiply':
        default:
          dan = Math.floor(Math.random() * 8) + 2; // 2-9
          multiplier = Math.floor(Math.random() * 9) + 1; // 1-9
          answer = dan * multiplier;
          break;
      }

      newProblems.push({
        id: i + 1,
        dan,
        multiplier,
        answer,
        timeSpent: 0
      });
    }
    return newProblems;
  }, [mode]);

  const startPractice = () => {
    const newProblems = generateProblems();
    setProblems(newProblems);
    setCurrentProblemIndex(0);
    setUserAnswer('');
    setTimeLeft(TIME_PER_PROBLEM);
    setIsActive(true);
    setShowResults(false);
    setStartTime(Date.now());
  };

  const submitAnswer = useCallback(() => {
    if (!isActive || showResults) return;

    const currentProblem = problems[currentProblemIndex];
    const userNum = parseInt(userAnswer) || 0;
    const timeSpent = Math.round((Date.now() - startTime) / 1000);

    const updatedProblems = [...problems];
    updatedProblems[currentProblemIndex] = {
      ...currentProblem,
      userAnswer: userNum,
      isCorrect: userNum === currentProblem.answer,
      timeSpent
    };
    setProblems(updatedProblems);

    // Move to next problem or show results
    if (currentProblemIndex < TOTAL_PROBLEMS - 1) {
      setCurrentProblemIndex(currentProblemIndex + 1);
      setUserAnswer('');
      setTimeLeft(TIME_PER_PROBLEM);
      setStartTime(Date.now());
    } else {
      setIsActive(false);
      setShowResults(true);
    }
  }, [isActive, showResults, problems, currentProblemIndex, userAnswer, startTime]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && userAnswer.trim() && isActive && !showResults) {
      submitAnswer();
    }
  };

  // Timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isActive && timeLeft > 0 && !showResults) {
      interval = setInterval(() => {
        setTimeLeft((time) => {
          if (time <= 1) {
            // Time's up - submit empty answer
            submitAnswer();
            return 0;
          }
          return time - 1;
        });
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, timeLeft, showResults, submitAnswer]);

  // Focus input when problem changes
  useEffect(() => {
    if (inputRef.current && isActive && !showResults) {
      inputRef.current.focus();
    }
  }, [currentProblemIndex, isActive, showResults]);

  const currentProblem = problems[currentProblemIndex];
  const correctCount = problems.filter(p => p.isCorrect).length;
  const totalTime = problems.reduce((sum, p) => sum + p.timeSpent, 0);

  if (showResults) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6 border-2 border-blue-200">
        <h2 className="text-4xl font-bold text-center mb-6 text-blue-600">
          연습 결과 (Practice Results)
        </h2>

        {/* Overall Score */}
        <div className="text-center mb-8">
          <div className="text-6xl font-bold text-green-600 mb-2">
            {correctCount} / {TOTAL_PROBLEMS}
          </div>
          <div className="text-2xl text-gray-600">
            {Math.round((correctCount / TOTAL_PROBLEMS) * 100)}% 정답률
          </div>
          <div className="text-lg text-gray-500">
            총 시간: {totalTime}초
          </div>
        </div>

        {/* Detailed Results */}
        <div className="space-y-3 mb-8">
          <h3 className="text-xl font-bold text-center text-gray-700">문제별 결과</h3>
          {problems.map((problem) => (
            <div
              key={problem.id}
              className={`p-4 rounded-lg border-2 ${
                problem.isCorrect
                  ? 'bg-green-50 border-green-200'
                  : 'bg-red-50 border-red-200'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="text-lg">
                  <span className="font-semibold">#{problem.id}:</span>
                  <span className="ml-2">
                    {problem.dan} {mode === 'plus' ? '+' : mode === 'minus' ? '-' : mode === 'divide' ? '÷' : '×'} {problem.multiplier} = {problem.answer}
                  </span>
                  <span className="text-sm text-gray-500 ml-2">
                    ({getKoreanNumber(problem.dan)} {mode === 'plus' ? '+' : mode === 'minus' ? '-' : mode === 'divide' ? '÷' : '×'} {getKoreanNumber(problem.multiplier)})
                  </span>
                </div>
                <div className="text-right">
                  <div className={`font-bold ${problem.isCorrect ? 'text-green-600' : 'text-red-600'}`}>
                    {problem.isCorrect ? '✓ 정답' : `✗ 오답 (답: ${problem.userAnswer})`}
                  </div>
                  <div className="text-sm text-gray-500">
                    {problem.timeSpent}초
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="text-center space-y-4">
          <button
            onClick={startPractice}
            className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-8 rounded-lg text-xl transition-colors mr-4"
          >
            🔄 다시 연습 (Practice Again)
          </button>
          <Link
            href="/"
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-8 rounded-lg text-xl transition-colors inline-block"
          >
            🏠 메인으로 (Back to Main)
          </Link>
        </div>
      </div>
    );
  }

  if (!isActive) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6 border-2 border-green-200">
        <h2 className="text-4xl font-bold text-center mb-6 text-green-600">
          구구단 연습 모드
        </h2>

        <div className="text-center mb-8">
          <div className="text-xl text-gray-600 mb-4">
            총 {TOTAL_PROBLEMS}문제, 각 문제당 {TIME_PER_PROBLEM}초
          </div>
          <div className="text-lg text-gray-500 mb-2">
            {mode === 'plus' && '1~99 사이의 숫자 덧셈 연습'}
            {mode === 'minus' && '뺄셈 연습 (큰 수에서 작은 수를 빼기)'}
            {mode === 'divide' && '나눗셈 연습 (구구단 범위 내)'}
            {mode === 'multiply-extended' && '확장 구구단 2단~12단 연습'}
            {mode === 'multiply' && '구구단 2단~9단 연습'}
          </div>
          <div className="text-lg text-gray-500">
            시간 내에 답을 입력하세요!
          </div>
        </div>

        <div className="text-center">
          <button
            onClick={startPractice}
            className="bg-green-500 hover:bg-green-600 text-white font-bold py-4 px-8 rounded-lg text-2xl transition-colors"
          >
            🚀 연습 시작 (Start Practice)
          </button>
        </div>
      </div>
    );
  }

  if (!currentProblem) return <div>Loading...</div>;

  return (
    <div className="bg-white rounded-lg shadow-md p-6 border-2 border-green-200">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-green-600">
          연습 모드 (Practice Mode)
        </h2>
        <div className="text-right">
          <div className="text-2xl font-bold text-blue-600">
            {currentProblemIndex + 1} / {TOTAL_PROBLEMS}
          </div>
          <div className={`text-xl font-bold ${timeLeft <= 3 ? 'text-red-600' : 'text-gray-800'}`}>
            ⏱️ {timeLeft}초
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-gray-300 rounded-full h-4 mb-6">
        <div
          className="bg-green-500 h-4 rounded-full transition-all duration-300"
          style={{ width: `${((currentProblemIndex + 1) / TOTAL_PROBLEMS) * 100}%` }}
        ></div>
      </div>

      {/* Problem Display */}
      <div className="text-center mb-8">
        <div className="text-8xl font-bold mb-4">
          <span className="text-blue-600">{currentProblem.dan}</span>
          <span className="text-gray-600 mx-6">
            {mode === 'plus' ? '+' : mode === 'minus' ? '-' : mode === 'divide' ? '÷' : '×'}
          </span>
          <span className="text-green-600">{currentProblem.multiplier}</span>
          <span className="text-gray-600 mx-6">=</span>
          <span className="text-black">?</span>
        </div>
        <div className="text-2xl text-gray-700">
          {mode === 'plus' && `(${getKoreanNumber(currentProblem.dan)} + ${getKoreanNumber(currentProblem.multiplier)} = ?)`}
          {mode === 'minus' && `(${getKoreanNumber(currentProblem.dan)} - ${getKoreanNumber(currentProblem.multiplier)} = ?)`}
          {mode === 'divide' && `(${getKoreanNumber(currentProblem.dan)} ÷ ${getKoreanNumber(currentProblem.multiplier)} = ?)`}
          {mode === 'multiply' && `(${getKoreanNumber(currentProblem.dan)} × ${getKoreanNumber(currentProblem.multiplier)} = ?)`}
        </div>
      </div>

      {/* Answer Input */}
      <div className="text-center mb-6">
        <input
          ref={inputRef}
          type="number"
          value={userAnswer}
          onChange={(e) => setUserAnswer(e.target.value)}
          onKeyDown={handleKeyDown}
          className="text-5xl text-center w-40 p-4 border-4 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
          placeholder="답"
        />
      </div>

      {/* Submit Button */}
      <div className="text-center">
        <button
          onClick={submitAnswer}
          disabled={!userAnswer.trim()}
          className="bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300 text-white font-bold py-4 px-8 rounded-lg text-2xl transition-colors"
        >
          확인 (Submit)
        </button>
      </div>
    </div>
  );
}