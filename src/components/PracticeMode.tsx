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

  // Selection states
  const [showSelection, setShowSelection] = useState(true);
  const [selectedDan, setSelectedDan] = useState<number | null>(null);
  const [selectedOrder, setSelectedOrder] = useState<'sequential' | 'random'>('sequential');
  const [selectedRange, setSelectedRange] = useState<{ min: number; max: number } | null>(null);

  const generateProblems = useCallback((): Problem[] => {
    const newProblems: Problem[] = [];
    for (let i = 0; i < TOTAL_PROBLEMS; i++) {
      let dan: number, multiplier: number, answer: number;

      switch (mode) {
        case 'plus':
          if (selectedRange) {
            dan = Math.floor(Math.random() * (selectedRange.max - selectedRange.min + 1)) + selectedRange.min;
            multiplier = Math.floor(Math.random() * 9) + 1; // 1-9
          } else {
            dan = Math.floor(Math.random() * 90) + 1; // 1-90
            multiplier = Math.floor(Math.random() * 9) + 1; // 1-9
          }
          answer = dan + multiplier;
          break;

        case 'minus':
          if (selectedRange) {
            dan = Math.floor(Math.random() * (selectedRange.max - selectedRange.min + 1)) + selectedRange.min;
            multiplier = Math.floor(Math.random() * 9) + 1; // 1-9 (subtrahend)
          } else {
            dan = Math.floor(Math.random() * 90) + 10; // 10-99 (ensures enough room for subtraction)
            multiplier = Math.floor(Math.random() * 9) + 1; // 1-9 (subtrahend)
          }
          answer = dan - multiplier;
          break;

        case 'divide':
          if (selectedRange) {
            multiplier = Math.floor(Math.random() * (selectedRange.max - selectedRange.min + 1)) + selectedRange.min; // divisor
            answer = Math.floor(Math.random() * 9) + 1; // 1-9 (quotient)
          } else {
            multiplier = Math.floor(Math.random() * 8) + 2; // 2-9 (divisor)
            answer = Math.floor(Math.random() * 9) + 1; // 1-9 (quotient)
          }
          dan = multiplier * answer; // dividend (ensures whole number division)
          break;

        case 'multiply-extended':
          dan = Math.floor(Math.random() * 11) + 2; // 2-12
          multiplier = Math.floor(Math.random() * 12) + 1; // 1-12
          answer = dan * multiplier;
          break;

        case 'multiply':
        default:
          if (selectedDan !== null) {
            // Specific dan selected
            dan = selectedDan;
            if (selectedOrder === 'sequential') {
              multiplier = (i % 9) + 1; // 1-9 in order
            } else {
              multiplier = Math.floor(Math.random() * 9) + 1; // 1-9 random
            }
          } else {
            // Random mode
            dan = Math.floor(Math.random() * 19) + 2; // 2-20
            multiplier = Math.floor(Math.random() * 9) + 1; // 1-9
          }
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
  }, [mode, selectedDan, selectedOrder, selectedRange]);

  const startPractice = () => {
    const newProblems = generateProblems();
    setProblems(newProblems);
    setCurrentProblemIndex(0);
    setUserAnswer('');
    setTimeLeft(TIME_PER_PROBLEM);
    setIsActive(true);
    setShowResults(false);
    setShowSelection(false);
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
          계산왕 이은우의 도전 결과!! (Math King Eunsol&apos;s Challenge Results!!)
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
    if (showSelection) {
      return (
        <div className="bg-white rounded-lg shadow-md p-6 border-2 border-green-200">
          <h2 className="text-4xl font-bold text-center mb-6 text-green-600">
            연습 설정 (Practice Settings)
          </h2>

          {mode === 'multiply' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-bold mb-4">몇 단을 연습하시겠습니까? (Which times table?)</h3>
                <div className="grid grid-cols-5 gap-2 mb-4">
                  {Array.from({ length: 19 }, (_, i) => i + 2).map((dan) => (
                    <button
                      key={dan}
                      onClick={() => setSelectedDan(dan)}
                      className={`py-2 px-4 rounded-lg font-bold transition-colors ${
                        selectedDan === dan
                          ? 'bg-blue-500 text-white'
                          : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
                      }`}
                    >
                      {dan}단
                    </button>
                  ))}
                </div>
                <button
                  onClick={() => setSelectedDan(null)}
                  className={`py-2 px-4 rounded-lg font-bold transition-colors mr-2 ${
                    selectedDan === null
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
                  }`}
                >
                  랜덤 (Random)
                </button>
              </div>

              {selectedDan !== null && (
                <div>
                  <h3 className="text-xl font-bold mb-4">연습 순서 (Practice Order)</h3>
                  <div className="space-x-4">
                    <button
                      onClick={() => setSelectedOrder('sequential')}
                      className={`py-2 px-4 rounded-lg font-bold transition-colors ${
                        selectedOrder === 'sequential'
                          ? 'bg-green-500 text-white'
                          : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
                      }`}
                    >
                      순서대로 (1→9)
                    </button>
                    <button
                      onClick={() => setSelectedOrder('random')}
                      className={`py-2 px-4 rounded-lg font-bold transition-colors ${
                        selectedOrder === 'random'
                          ? 'bg-green-500 text-white'
                          : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
                      }`}
                    >
                      랜덤 (Random)
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {(mode === 'plus' || mode === 'minus' || mode === 'divide') && (
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-bold mb-4">
                  {mode === 'plus' && '덧셈 범위 선택 (Addition Range)'}
                  {mode === 'minus' && '뺄셈 범위 선택 (Subtraction Range)'}
                  {mode === 'divide' && '나눗셈 범위 선택 (Division Range)'}
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">최소값 (Min)</label>
                    <input
                      type="number"
                      value={selectedRange?.min || ''}
                      onChange={(e) => setSelectedRange(prev => ({
                        min: parseInt(e.target.value) || 1,
                        max: prev?.max || 10
                      }))}
                      className="w-full p-2 border rounded-lg"
                      placeholder="1"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">최대값 (Max)</label>
                    <input
                      type="number"
                      value={selectedRange?.max || ''}
                      onChange={(e) => setSelectedRange(prev => ({
                        min: prev?.min || 1,
                        max: parseInt(e.target.value) || 10
                      }))}
                      className="w-full p-2 border rounded-lg"
                      placeholder="10"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="text-center mt-8">
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

    return (
      <div className="bg-white rounded-lg shadow-md p-6 border-2 border-green-200">
        <h2 className="text-4xl font-bold text-center mb-6 text-green-600">
          계산왕 이은우의 연습 도전!!
        </h2>

        <div className="text-center mb-8">
          <div className="text-xl text-gray-600 mb-4">
            총 {TOTAL_PROBLEMS}문제, 각 문제당 {TIME_PER_PROBLEM}초
          </div>
          <div className="text-lg text-gray-500 mb-2">
            {mode === 'plus' && `덧셈 연습: ${selectedRange ? `${selectedRange.min}~${selectedRange.max} + 1~9` : '1~90 + 1~9'}`}
            {mode === 'minus' && `뺄셈 연습: ${selectedRange ? `${selectedRange.min}~${selectedRange.max} - 1~9` : '10~99 - 1~9'}`}
            {mode === 'divide' && `나눗셈 연습: ${selectedRange ? `${selectedRange.min}~${selectedRange.max} 범위 내` : '구구단 범위 내'}`}
            {mode === 'multiply-extended' && '확장 구구단 2단~12단 연습'}
            {mode === 'multiply' && (selectedDan ? `${selectedDan}단 ${selectedOrder === 'sequential' ? '순서대로' : '랜덤'} 연습` : '구구단 2단~20단 랜덤 연습')}
          </div>
          <div className="text-lg text-gray-500">
            시간 내에 답을 입력하세요!
          </div>
        </div>

        <div className="text-center space-y-4">
          <button
            onClick={() => setShowSelection(true)}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-8 rounded-lg text-xl transition-colors mr-4"
          >
            🔄 설정 변경 (Change Settings)
          </button>
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
          계산왕 이은우의 도전!! (Math King Eunsol&apos;s Challenge!!)
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