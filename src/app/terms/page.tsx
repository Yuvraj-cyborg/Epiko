import { Card } from "@/components/ui/card"

export default function TermsOfUsePage() {
  return (
    <div className="container mx-auto px-4 py-16 max-w-4xl">
      <div className="space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-foreground">Terms of Use</h1>
          <p className="text-muted-foreground">
            Last updated: {new Date().toLocaleDateString()}
          </p>
        </div>

        <Card className="p-8 space-y-6">
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-foreground">1. Acceptance of Terms</h2>
            <p className="text-muted-foreground leading-relaxed">
              By accessing and using Epiko (&quot;the Service&quot;), you accept and agree to be bound by the terms 
              and provisions of this agreement. If you do not agree to these Terms of Use, please do not 
              use the Service.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-foreground">2. Description of Service</h2>
            <p className="text-muted-foreground leading-relaxed">
              Epiko is an AI-powered assistant platform that provides automated services for Gmail, 
              Zoom, and Notion through specialized AI agents:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li><strong>Agent Dev:</strong> Gmail automation and email management</li>
              <li><strong>Agent Bob:</strong> Zoom meeting transcription and summarization</li>
              <li><strong>Agent Flow:</strong> Notion workspace organization and content creation</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-foreground">3. User Accounts and Authentication</h2>
            <p className="text-muted-foreground">
              To use our Service, you must:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>Provide accurate and complete information during registration</li>
              <li>Maintain the security of your account credentials</li>
              <li>Be responsible for all activities under your account</li>
              <li>Notify us immediately of any unauthorized use</li>
              <li>Be at least 13 years old to create an account</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-foreground">4. Third-Party Service Integration</h2>
            <p className="text-muted-foreground">
              Our Service integrates with Gmail, Notion, and Zoom through OAuth authentication. 
              By connecting these services, you:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>Grant us permission to access and interact with your connected accounts</li>
              <li>Acknowledge that your use of these services is governed by their respective terms</li>
              <li>Understand that we are not responsible for the functionality of third-party services</li>
              <li>Can revoke access permissions at any time through your account settings</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-foreground">5. Acceptable Use Policy</h2>
            <p className="text-muted-foreground">You agree not to use the Service to:</p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>Send spam, unsolicited emails, or malicious content</li>
              <li>Violate any applicable laws or regulations</li>
              <li>Infringe on intellectual property rights</li>
              <li>Transmit harmful, offensive, or inappropriate content</li>
              <li>Attempt to gain unauthorized access to our systems</li>
              <li>Interfere with the Service&apos;s operation or other users&apos; access</li>
              <li>Use the Service for commercial purposes without authorization</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-foreground">6. AI-Generated Content</h2>
            <p className="text-muted-foreground">
              Our AI agents generate content based on your instructions. You acknowledge that:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>AI-generated content may not always be accurate or appropriate</li>
              <li>You are responsible for reviewing content before use</li>
              <li>We do not guarantee the quality or accuracy of AI outputs</li>
              <li>You retain ownership of content you create using our Service</li>
              <li>You grant us permission to use anonymized data to improve our AI models</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-foreground">7. Privacy and Data Protection</h2>
            <p className="text-muted-foreground">
              Your privacy is important to us. Our collection and use of your information is governed 
              by our Privacy Policy, which is incorporated into these Terms by reference.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-foreground">8. Service Availability</h2>
            <p className="text-muted-foreground">
              We strive to maintain high service availability, but we do not guarantee uninterrupted 
              access. The Service may be temporarily unavailable due to:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>Scheduled maintenance</li>
              <li>Technical issues or system failures</li>
              <li>Third-party service disruptions</li>
              <li>Force majeure events</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-foreground">9. Intellectual Property</h2>
            <p className="text-muted-foreground">
              The Service, including its original content, features, and functionality, is owned by 
              Epiko and is protected by international copyright, trademark, and other intellectual 
              property laws.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-foreground">10. Limitation of Liability</h2>
            <p className="text-muted-foreground">
              TO THE MAXIMUM EXTENT PERMITTED BY LAW, EPIKO SHALL NOT BE LIABLE FOR ANY INDIRECT, 
              INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING WITHOUT LIMITATION, 
              LOSS OF PROFITS, DATA, USE, OR OTHER INTANGIBLE LOSSES.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-foreground">11. Disclaimers</h2>
            <p className="text-muted-foreground">
              THE SERVICE IS PROVIDED &quot;AS IS&quot; AND &quot;AS AVAILABLE&quot; WITHOUT WARRANTIES OF ANY KIND. 
              WE DISCLAIM ALL WARRANTIES, EXPRESS OR IMPLIED, INCLUDING MERCHANTABILITY, FITNESS 
              FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-foreground">12. Termination</h2>
            <p className="text-muted-foreground">
              We may terminate or suspend your account and access to the Service at our discretion, 
              without prior notice, for conduct that we believe violates these Terms or is harmful 
              to other users, us, or third parties.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-foreground">13. Governing Law</h2>
            <p className="text-muted-foreground">
              These Terms shall be governed by and construed in accordance with the laws of 
              India, without regard to its conflict of law principles.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-foreground">14. Changes to Terms</h2>
            <p className="text-muted-foreground">
              We reserve the right to modify these Terms at any time. We will notify users of material 
              changes via email or through the Service. Continued use of the Service after changes 
              constitutes acceptance of the new Terms.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-foreground">15. Contact Information</h2>
            <p className="text-muted-foreground">
              If you have any questions about these Terms, please contact us at:
            </p>
            <div className="bg-muted p-4 rounded-lg">
              <p className="text-muted-foreground">
                Email: [We will add later]<br />
                Address: Bhubaneshwar, Odisha, India<br />
                Phone: [We will add later]
              </p>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-foreground">16. Severability</h2>
            <p className="text-muted-foreground">
              If any provision of these Terms is found to be unenforceable, the remaining provisions 
              will remain in full force and effect.
            </p>
          </section>
        </Card>
      </div>
    </div>
  )
} 