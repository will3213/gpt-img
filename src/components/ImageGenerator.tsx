'use client';

import { useState, useEffect } from 'react';
import { Download, Loader } from 'lucide-react';
import Image from 'next/image';
import { getTranslation } from '@/lib/translations';
import SimpleCaptcha from './SimpleCaptcha';

export default function ImageGenerator({ locale }: { locale: string }) {
  const [prompt, setPrompt] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState('');
  const [mounted, setMounted] = useState(false);
  const [lastRequestTime, setLastRequestTime] = useState(0);
  const [requestCount, setRequestCount] = useState(0);
  const [isCaptchaValid, setIsCaptchaValid] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const generateImage = async () => {
    if (!prompt.trim()) return;
    
    // 验证码检查
    if (!isCaptchaValid) {
      setError('请先完成验证码');
      return;
    }

    // 客户端频率限制：每10秒最多1次请求
    const now = Date.now();
    const minInterval = 10000; // 10秒
    
    if (now - lastRequestTime < minInterval) {
      const remainingTime = Math.ceil((minInterval - (now - lastRequestTime)) / 1000);
      setError(`请等待 ${remainingTime} 秒后再试`);
      return;
    }
    
    // 每小时最多5次请求
    const hourlyLimit = 5;
    const storedRequests = localStorage.getItem('image_requests');
    const requests = storedRequests ? JSON.parse(storedRequests) : [];
    const oneHourAgo = now - 60 * 60 * 1000;
    
    // 清理1小时前的请求记录
    const recentRequests = requests.filter((time: number) => time > oneHourAgo);
    
    if (recentRequests.length >= hourlyLimit) {
      setError('每小时最多生成5张图片，请稍后再试');
      return;
    }

    setIsGenerating(true);
    setError('');
    setLastRequestTime(now);

    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt }),
      });

      const data = await response.json();

      if (data.success && data.imageUrl) {
        setImageUrl(data.imageUrl);
        
        // 记录成功的请求时间
        recentRequests.push(now);
        localStorage.setItem('image_requests', JSON.stringify(recentRequests));
      } else {
        setError(data.error || getTranslation(locale, 'error'));
      }
    } catch (err) {
      setError(getTranslation(locale, 'error'));
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setPrompt(suggestion);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      generateImage();
    }
  };

  const downloadImage = async () => {
    if (!imageUrl) return;

    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `gptimagemin-${Date.now()}.jpg`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (err) {
      console.error('Download failed:', err);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto space-y-6">
      <div className="space-y-4">
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder={getTranslation(locale, 'placeholder')}
          className="w-full h-32 p-4 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          disabled={isGenerating}
        />
        
        <div className="mt-3">
          <p className="text-sm text-gray-600 mb-2">{getTranslation(locale, 'quick_suggestions')}</p>
          <div className="flex flex-wrap gap-2">
            {[1, 2, 3].map((num) => (
              <button
                key={num}
                type="button"
                onClick={() => handleSuggestionClick(getTranslation(locale, `suggestion_${num}`))}
                className="px-3 py-1.5 text-sm bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-md transition-colors duration-200 flex-shrink-0"
                disabled={isGenerating}
              >
                {getTranslation(locale, `suggestion_${num}`)}
              </button>
            ))}
          </div>
        </div>
        
        <SimpleCaptcha 
          onVerify={setIsCaptchaValid}
          disabled={isGenerating}
        />
        
        <button
          onClick={generateImage}
          disabled={isGenerating || !prompt.trim() || !isCaptchaValid}
          className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2"
        >
          {isGenerating ? (
            <>
              <Loader className="w-5 h-5 animate-spin" />
              <span>{getTranslation(locale, 'generating')}</span>
            </>
          ) : (
            <span>{getTranslation(locale, 'generate')}</span>
          )}
        </button>
      </div>

      {error && (
        <div className="p-4 bg-red-100 border border-red-300 text-red-700 rounded-lg">
          {error}
        </div>
      )}

      {imageUrl && (
        <div className="space-y-4">
          <div className="relative bg-gray-100 rounded-lg overflow-hidden">
            <Image
              src={imageUrl}
              alt={prompt}
              width={512}
              height={512}
              className="w-full h-auto"
              unoptimized
            />
          </div>
          
          <button
            onClick={downloadImage}
            className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2"
          >
            <Download className="w-5 h-5" />
            <span>{getTranslation(locale, 'download')}</span>
          </button>
        </div>
      )}
    </div>
  );
}