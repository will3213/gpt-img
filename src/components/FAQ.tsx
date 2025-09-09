'use client';

import { useState } from 'react';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';
import { getTranslation } from '@/lib/translations';

interface FAQItem {
  question: string;
  answer: string;
}

export default function FAQ({ locale }: { locale: string }) {
  const [openItems, setOpenItems] = useState<number[]>([]);

  const toggleItem = (index: number) => {
    setOpenItems(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  const faqItems: FAQItem[] = [
    {
      question: getTranslation(locale, 'faq_q1') || 'Is GPTImageMini really free?',
      answer: getTranslation(locale, 'faq_a1') || 'Yes! GPTImageMini is completely free to use. No registration, no credit card required. Just enter your text and generate images instantly.'
    },
    {
      question: getTranslation(locale, 'faq_q2') || 'Is this an official OpenAI product?',
      answer: getTranslation(locale, 'faq_a2') || 'No, GPTImageMini is not an official OpenAI product. We are an independent service that provides AI-powered image generation using third-party APIs.'
    },
    {
      question: getTranslation(locale, 'faq_q3') || 'What types of images can I generate?',
      answer: getTranslation(locale, 'faq_a3') || 'You can generate various types of images including landscapes, portraits, abstract art, objects, and more. Please ensure your prompts comply with our terms of service.'
    },
    {
      question: getTranslation(locale, 'faq_q4') || 'How long does it take to generate an image?',
      answer: getTranslation(locale, 'faq_a4') || 'Image generation typically takes 2-5 seconds, depending on the complexity of your prompt and server load.'
    },
    {
      question: getTranslation(locale, 'faq_q5') || 'Can I use the generated images commercially?',
      answer: getTranslation(locale, 'faq_a5') || 'Generated images are provided for personal use. For commercial use, please review our terms of service and ensure compliance with applicable copyright laws.'
    },
    {
      question: getTranslation(locale, 'faq_q6') || 'Do you store my prompts or images?',
      answer: getTranslation(locale, 'faq_a6') || 'No, we do not permanently store your text prompts or generated images. Images are temporarily cached for performance but automatically deleted. See our privacy policy for details.'
    },
    {
      question: getTranslation(locale, 'faq_q7') || 'What languages are supported?',
      answer: getTranslation(locale, 'faq_a7') || 'GPTImageMini supports 17 languages including English, Chinese, Japanese, Korean, German, Spanish, French, Italian, Portuguese, Vietnamese, Turkish, Arabic, Thai, and Hindi.'
    },
    {
      question: getTranslation(locale, 'faq_q8') || 'Why can\'t I generate certain types of content?',
      answer: getTranslation(locale, 'faq_a8') || 'To ensure safety and comply with ethical guidelines, we restrict content that is harmful, illegal, offensive, or inappropriate. This helps create a positive experience for all users.'
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <HelpCircle className="h-8 w-8 text-blue-600 mr-2" />
            <h2 className="text-3xl font-bold text-gray-900">
              {getTranslation(locale, 'faq_title') || 'Frequently Asked Questions'}
            </h2>
          </div>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {getTranslation(locale, 'faq_subtitle') || 'Everything you need to know about GPTImageMini'}
          </p>
        </div>

        <div className="space-y-4">
          {faqItems.map((item, index) => (
            <div 
              key={index} 
              className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow"
            >
              <button
                onClick={() => toggleItem(index)}
                className="w-full px-6 py-4 text-left bg-gray-50 hover:bg-gray-100 transition-colors flex items-center justify-between"
                aria-expanded={openItems.includes(index)}
              >
                <span className="font-medium text-gray-900 pr-4">
                  {item.question}
                </span>
                {openItems.includes(index) ? (
                  <ChevronUp className="h-5 w-5 text-gray-500 flex-shrink-0" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-gray-500 flex-shrink-0" />
                )}
              </button>
              
              {openItems.includes(index) && (
                <div className="px-6 py-4 bg-white border-t border-gray-100">
                  <p className="text-gray-700 leading-relaxed">
                    {item.answer}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <div className="bg-blue-50 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              {getTranslation(locale, 'faq_more_questions') || 'Still have questions?'}
            </h3>
            <p className="text-gray-600 mb-4">
              {getTranslation(locale, 'faq_contact_text') || 'We\'re here to help! Check our terms and privacy policy for more information.'}
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a 
                href="/terms"
                className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                {getTranslation(locale, 'faq_view_terms') || 'View Terms of Service'}
              </a>
              <a 
                href="/privacy"
                className="inline-flex items-center px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors"
              >
                {getTranslation(locale, 'faq_view_privacy') || 'View Privacy Policy'}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}