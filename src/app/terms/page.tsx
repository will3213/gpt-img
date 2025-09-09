import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function Terms() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors">
              <ArrowLeft className="w-4 h-4" />
              <span>Back to GPTImageMini</span>
            </Link>
            <h1 className="text-xl font-semibold text-gray-900">Terms of Service</h1>
          </div>
        </div>
      </header>

      <div className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">Terms of Service</h1>

          <div className="prose max-w-none">
            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4">1. Acceptance of Terms</h2>
              <p className="mb-4">
                By accessing and using GPTImageMini (&quot;Service&quot;), you accept and agree to be bound by the terms and provision of this agreement.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4">2. Service Description</h2>
              <p className="mb-4">
                GPTImageMini is a free AI-powered image generation service that converts text prompts into images. 
                <strong className="text-red-600 block mt-2 p-3 bg-red-50 rounded-lg"> 
                  ⚠️ IMPORTANT DISCLAIMER: This is NOT an official OpenAI product. We are an independent service provider.
                </strong>
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4">3. Acceptable Use</h2>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>You may use the service for legal purposes only</li>
                <li>You may not generate harmful, illegal, offensive, or inappropriate content</li>
                <li>You may not use the service to violate any laws or regulations</li>
                <li>You may not attempt to reverse engineer or abuse our systems</li>
                <li>You may not use the service for commercial purposes without proper licensing</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4">4. Intellectual Property</h2>
              <p className="mb-4">
                Generated images are provided to you for personal use. For commercial use, please ensure you comply 
                with applicable copyright laws and the terms of our underlying AI service providers.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4">5. Service Availability</h2>
              <p className="mb-4">
                We strive to maintain service availability but cannot guarantee uninterrupted access. 
                The service is provided &quot;as is&quot; without warranties of any kind.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4">6. Limitation of Liability</h2>
              <p className="mb-4">
                In no event shall GPTImageMini be liable for any indirect, incidental, special, consequential, 
                or punitive damages arising from your use of the service.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4">7. Changes to Terms</h2>
              <p className="mb-4">
                We reserve the right to modify these terms at any time. Continued use of the service constitutes 
                acceptance of modified terms.
              </p>
            </section>

            <div className="mt-8 pt-8 border-t border-gray-200">
              <p className="text-sm text-gray-600">
                Last updated: {new Date().toLocaleDateString('en-US')}
              </p>
            </div>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
}