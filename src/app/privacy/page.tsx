import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function Privacy() {
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
            <h1 className="text-xl font-semibold text-gray-900">Privacy Policy</h1>
          </div>
        </div>
      </header>

      <div className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">Privacy Policy</h1>

          <div className="prose max-w-none">
            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4">1. Information We Collect</h2>
              <div className="mb-4">
                <h3 className="font-medium mb-2">Information You Provide:</h3>
                <ul className="list-disc pl-6 mb-4 space-y-1">
                  <li>Text prompts you enter for image generation</li>
                  <li>Language preferences</li>
                </ul>
                
                <h3 className="font-medium mb-2">Automatically Collected Information:</h3>
                <ul className="list-disc pl-6 mb-4 space-y-1">
                  <li>Browser type and version</li>
                  <li>Device information</li>
                  <li>IP address (for rate limiting and abuse prevention)</li>
                  <li>Usage patterns and preferences</li>
                </ul>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4">2. How We Use Your Information</h2>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>To provide image generation services</li>
                <li>To improve our service quality and user experience</li>
                <li>To prevent abuse and ensure service security</li>
                <li>To analyze usage patterns (anonymized data only)</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4">3. Data Storage and Security</h2>
              <p className="mb-4">
                We implement appropriate technical and organizational measures to protect your personal data:
              </p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>Text prompts are processed in real-time and not permanently stored</li>
                <li>Generated images are temporarily cached but not linked to personal identifiers</li>
                <li>We use secure HTTPS connections for all data transmission</li>
                <li>Access to any collected data is strictly limited to authorized personnel</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4">4. Third-Party Services</h2>
              <p className="mb-4">
                We use third-party AI services to generate images. Your prompts may be processed by:
              </p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>RapidAPI and underlying AI service providers</li>
                <li>Cloudflare (for CDN and security services)</li>
                <li>Vercel (for hosting and performance optimization)</li>
              </ul>
              <p className="mb-4">
                These services have their own privacy policies and we encourage you to review them.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4">5. GDPR Compliance (EU Users)</h2>
              <p className="mb-4">
                If you are located in the European Union, you have the following rights:
              </p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li><strong>Right to Access:</strong> Request information about your personal data</li>
                <li><strong>Right to Rectification:</strong> Correct inaccurate personal data</li>
                <li><strong>Right to Erasure:</strong> Request deletion of your personal data</li>
                <li><strong>Right to Portability:</strong> Receive your data in a machine-readable format</li>
                <li><strong>Right to Object:</strong> Object to processing of your personal data</li>
              </ul>
              <p className="mb-4">
                <strong>Legal basis for processing:</strong> Legitimate interest in providing and improving our services.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4">6. Cookies and Tracking</h2>
              <p className="mb-4">
                We use minimal cookies and tracking:
              </p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li><strong>Essential cookies:</strong> For language preferences and basic functionality</li>
                <li><strong>No advertising cookies:</strong> We do not use advertising or marketing cookies</li>
                <li><strong>No cross-site tracking:</strong> We do not track users across other websites</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4">7. Data Retention</h2>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>Text prompts: Processed in real-time, not stored permanently</li>
                <li>Generated images: Temporarily cached for performance, automatically deleted</li>
                <li>Usage logs: Retained for 90 days for security and abuse prevention</li>
                <li>Analytics data: Anonymized and retained indefinitely for service improvement</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4">8. International Data Transfers</h2>
              <p className="mb-4">
                Your data may be processed in countries outside the EU/EEA. We ensure appropriate safeguards 
                are in place for international data transfers.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4">9. Children&apos;s Privacy</h2>
              <p className="mb-4">
                Our service is not intended for children under 13. We do not knowingly collect personal 
                information from children under 13.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4">10. Changes to This Policy</h2>
              <p className="mb-4">
                We may update this privacy policy from time to time. We will notify users of any material 
                changes by posting the new policy on this page.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4">11. Contact Information</h2>
              <p className="mb-4">
                If you have any questions about this Privacy Policy or wish to exercise your rights, 
                please contact us through our website contact form.
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