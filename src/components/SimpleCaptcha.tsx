'use client';

import { useState, useEffect } from 'react';
import { RefreshCw } from 'lucide-react';

interface SimpleCaptchaProps {
  onVerify: (isValid: boolean) => void;
  disabled?: boolean;
}

export default function SimpleCaptcha({ onVerify, disabled = false }: SimpleCaptchaProps) {
  const [num1, setNum1] = useState(0);
  const [num2, setNum2] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [isValid, setIsValid] = useState(false);

  const generateNumbers = () => {
    const n1 = Math.floor(Math.random() * 9) + 1;
    const n2 = Math.floor(Math.random() * 9) + 1;
    setNum1(n1);
    setNum2(n2);
    setUserAnswer('');
    setIsValid(false);
    onVerify(false);
  };

  useEffect(() => {
    generateNumbers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleAnswerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const answer = e.target.value;
    setUserAnswer(answer);
    
    const correctAnswer = num1 + num2;
    const isCorrect = parseInt(answer) === correctAnswer;
    setIsValid(isCorrect);
    onVerify(isCorrect);
  };

  return (
    <div className="flex items-center space-x-2 p-3 bg-gray-50 rounded-lg border">
      <span className="text-sm text-gray-600">验证：</span>
      <span className="font-mono text-lg">{num1} + {num2} = </span>
      <input
        type="number"
        value={userAnswer}
        onChange={handleAnswerChange}
        disabled={disabled}
        className="w-16 px-2 py-1 border border-gray-300 rounded text-center focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
        placeholder="?"
      />
      <button
        type="button"
        onClick={generateNumbers}
        disabled={disabled}
        className="p-1 text-gray-500 hover:text-gray-700 disabled:opacity-50"
        title="刷新验证码"
      >
        <RefreshCw className="w-4 h-4" />
      </button>
      {isValid && (
        <span className="text-green-600 text-sm">✓</span>
      )}
    </div>
  );
}