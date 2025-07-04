import { Card } from "@/components/ui/card"

export default function PrivacyPolicyPage() {
  return (
    <div className="container mx-auto px-4 py-16 max-w-4xl">
      <div className="space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-foreground">Privacy Policy</h1>
          <p className="text-muted-foreground">
            Last updated: {new Date().toLocaleDateString()}
          </p>
        </div>

        <Card className="p-8 space-y-6">
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-foreground">1. Introduction</h2>
            <p className="text-muted-foreground leading-relaxed">
              Welcome to Epiko (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;). This Privacy Policy explains how we collect, use, 
              disclose, and safeguard your information when you use our AI assistant platform that integrates 
              with Gmail, Zoom, and Notion services.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-foreground">2. Information We Collect</h2>
            
            <h3 className="text-xl font-medium text-foreground">2.1 Personal Information</h3>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>Email address and profile information from Google OAuth</li>
              <li>Notion workspace and user information from Notion OAuth</li>
              <li>Usage data and interaction logs with our AI agents</li>
            </ul>

            <h3 className="text-xl font-medium text-foreground">2.2 Service Data</h3>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>Email content you choose to send through Agent Dev</li>
              <li>Meeting transcripts you provide to Agent Bob for summarization</li>
              <li>Notion pages and content created through Agent Flow</li>
              <li>Chat messages and commands sent to our AI agents</li>
            </ul>

            <h3 className="text-xl font-medium text-foreground">2.3 Technical Information</h3>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>IP address, browser type, and device information</li>
              <li>Usage patterns and feature interactions</li>
              <li>Error logs and performance metrics</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-foreground">3. How We Use Your Information</h2>
            <p className="text-muted-foreground">We use your information to:</p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>Provide and operate our AI assistant services</li>
              <li>Send emails on your behalf through Gmail integration</li>
              <li>Create and manage Notion pages in your workspace</li>
              <li>Summarize Zoom meeting transcripts you provide</li>
              <li>Improve our AI models and service quality</li>
              <li>Communicate with you about service updates</li>
              <li>Ensure security and prevent misuse</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-foreground">4. Data Sharing and Disclosure</h2>
            <p className="text-muted-foreground">
              We do not sell, trade, or rent your personal information to third parties. We may share 
              your information only in the following circumstances:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>With your explicit consent</li>
              <li>To comply with legal obligations or court orders</li>
              <li>To protect our rights, property, or safety</li>
              <li>With service providers who assist in our operations (under strict confidentiality)</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-foreground">5. Third-Party Services</h2>
            <p className="text-muted-foreground">
              Our service integrates with Gmail, Notion, and Zoom through their respective APIs. 
              Your use of these integrations is also governed by:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>Google&apos;s Privacy Policy and Terms of Service</li>
              <li>Notion&apos;s Privacy Policy and Terms of Service</li>
              <li>Zoom&apos;s Privacy Policy and Terms of Service</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-foreground">6. Data Security</h2>
            <p className="text-muted-foreground">
              We implement appropriate technical and organizational security measures to protect your 
              information against unauthorized access, alteration, disclosure, or destruction. These include:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>Encryption of data in transit and at rest</li>
              <li>Regular security audits and updates</li>
              <li>Access controls and authentication</li>
              <li>Secure API integrations with OAuth 2.0</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-foreground">7. Data Retention</h2>
            <p className="text-muted-foreground">
              We retain your information only as long as necessary to provide our services and fulfill 
              the purposes outlined in this policy. You may request deletion of your data at any time.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-foreground">8. Your Rights</h2>
            <p className="text-muted-foreground">You have the right to:</p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>Access, update, or delete your personal information</li>
              <li>Revoke OAuth permissions for connected services</li>
              <li>Export your data in a portable format</li>
              <li>Object to processing of your information</li>
              <li>Receive information about data breaches affecting you</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-foreground">9. Children&apos;s Privacy</h2>
            <p className="text-muted-foreground">
              Our service is not intended for children under 13 years of age. We do not knowingly 
              collect personal information from children under 13.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-foreground">10. Changes to This Policy</h2>
            <p className="text-muted-foreground">
              We may update this Privacy Policy periodically. We will notify you of any material 
              changes by posting the new policy on this page and updating the &quot;Last updated&quot; date.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-foreground">11. Contact Us</h2>
            <p className="text-muted-foreground">
              If you have any questions about this Privacy Policy or our data practices, please contact us at:
            </p>
            <div className="bg-muted p-4 rounded-lg">
              <p className="text-muted-foreground">
                Email: [We will add later]<br />
                Address: Bhubaneshwar, Odisha, India<br />
                Phone: [We will add later]
              </p>
            </div>
          </section>
        </Card>
      </div>
    </div>
  )
} 