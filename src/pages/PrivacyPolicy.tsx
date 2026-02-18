import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageTransition from "@/components/PageTransition";

const PrivacyPolicy = () => {
  return (
    <PageTransition>
      <div className="min-h-screen overflow-x-hidden">
        <Navbar />
        <main className="max-w-4xl mx-auto px-4 md:px-6 py-12 md:py-16">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">Privacy Policy</h1>
          <p className="text-muted-foreground mb-10 text-sm">Last updated: February 18, 2026</p>

          <div className="prose prose-gray max-w-none space-y-8">

            <section>
              <h2 className="text-xl font-semibold text-foreground mt-0 mb-3">1. Introduction</h2>
              <p className="text-muted-foreground leading-relaxed mb-3">
                Welcome to Society<span className="text-primary font-semibold">Ji</span> ("we," "our," or "us"). We are committed to protecting your personal information
                and your right to privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard
                your information when you use our mobile application ("SocietyJi App") and related services.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                By using SocietyJi, you agree to the collection and use of information in accordance with this policy.
                If you do not agree with the terms of this privacy policy, please do not access the application.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">2. Information We Collect</h2>

              <h3 className="text-base font-medium text-foreground mt-5 mb-2">2.1 Personal Information</h3>
              <p className="text-muted-foreground leading-relaxed mb-2">We may collect the following personal information:</p>
              <ul className="list-disc pl-6 space-y-1 text-muted-foreground">
                <li>Name, phone number, and email address</li>
                <li>Residential address (building name, flat number)</li>
                <li>Family member details (name and phone number)</li>
                <li>Vehicle information (registration number, type, model)</li>
                <li>Profile photo (optional)</li>
                <li>Society membership and role information</li>
              </ul>

              <h3 className="text-base font-medium text-foreground mt-5 mb-2">2.2 Usage Data</h3>
              <p className="text-muted-foreground leading-relaxed mb-2">We automatically collect certain information when you use the app:</p>
              <ul className="list-disc pl-6 space-y-1 text-muted-foreground">
                <li>Device information (device type, operating system)</li>
                <li>App usage patterns and feature interactions</li>
                <li>Push notification tokens (for delivering notifications)</li>
                <li>IP address and general location data</li>
              </ul>

              <h3 className="text-base font-medium text-foreground mt-5 mb-2">2.3 Financial Information</h3>
              <p className="text-muted-foreground leading-relaxed">
                For maintenance payment features, we may process payment-related data through secure third-party
                payment gateways. We do not store credit/debit card numbers or banking credentials on our servers.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">3. How We Use Your Information</h2>
              <p className="text-muted-foreground leading-relaxed mb-2">We use the collected information for the following purposes:</p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li><span className="font-medium text-foreground">Society Management:</span> To manage resident directories, flat assignments, and society operations</li>
                <li><span className="font-medium text-foreground">Communication:</span> To send announcements, notices, and important updates from your society</li>
                <li><span className="font-medium text-foreground">Security:</span> To manage visitor entry/exit logs, guard verification, and gated access</li>
                <li><span className="font-medium text-foreground">Parking Management:</span> To manage vehicle registrations and parking allocations</li>
                <li><span className="font-medium text-foreground">Amenity Booking:</span> To facilitate booking of society amenities</li>
                <li><span className="font-medium text-foreground">Maintenance:</span> To manage maintenance payments and track dues</li>
                <li><span className="font-medium text-foreground">Complaints &amp; Polls:</span> To handle resident complaints and conduct society polls</li>
                <li><span className="font-medium text-foreground">Notifications:</span> To send push notifications for relevant activities</li>
                <li><span className="font-medium text-foreground">Service Improvement:</span> To analyze usage patterns and improve our services</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">4. Data Sharing and Disclosure</h2>
              <p className="text-muted-foreground leading-relaxed mb-2">We may share your information in the following situations:</p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li><span className="font-medium text-foreground">Within Your Society:</span> Your basic resident information (name, flat number) is visible to other residents and society administrators for community management purposes</li>
                <li><span className="font-medium text-foreground">Society Administrators:</span> Society admins have access to resident data necessary for managing society operations</li>
                <li><span className="font-medium text-foreground">Security Guards:</span> Guards can access visitor logs and resident verification data for security purposes</li>
                <li><span className="font-medium text-foreground">Service Providers:</span> We may share data with third-party service providers who assist in operating our platform (e.g., cloud hosting, SMS services, push notifications)</li>
                <li><span className="font-medium text-foreground">Legal Requirements:</span> We may disclose information if required by law, regulation, or legal process</li>
              </ul>
              <p className="text-muted-foreground leading-relaxed mt-3">
                We do <span className="font-medium text-foreground">not</span> sell, rent, or trade your personal information to third parties for marketing purposes.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">5. Data Security</h2>
              <p className="text-muted-foreground leading-relaxed mb-2">
                We implement appropriate technical and organizational security measures to protect your personal information, including:
              </p>
              <ul className="list-disc pl-6 space-y-1 text-muted-foreground">
                <li>Encrypted data transmission (HTTPS/TLS)</li>
                <li>Secure server infrastructure hosted on AWS</li>
                <li>OTP-based phone number verification for authentication</li>
                <li>Role-based access controls (admin, resident, guard, tenant)</li>
                <li>Regular security audits and updates</li>
              </ul>
              <p className="text-muted-foreground leading-relaxed mt-3">
                While we strive to protect your personal information, no method of transmission over the Internet or
                electronic storage is 100% secure. We cannot guarantee absolute security.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">6. Data Retention</h2>
              <p className="text-muted-foreground leading-relaxed">
                We retain your personal information for as long as your account is active or as needed to provide
                our services. If you leave a society or deactivate your account, we may retain certain information
                as required for legal compliance, dispute resolution, or legitimate business purposes.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">7. Your Rights</h2>
              <p className="text-muted-foreground leading-relaxed mb-2">You have the following rights regarding your personal data:</p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li><span className="font-medium text-foreground">Access:</span> You can request access to your personal data stored with us</li>
                <li><span className="font-medium text-foreground">Correction:</span> You can update or correct inaccurate personal information through the app</li>
                <li><span className="font-medium text-foreground">Deletion:</span> You can request deletion of your account and associated data</li>
                <li><span className="font-medium text-foreground">Portability:</span> You can request a copy of your data in a structured format</li>
                <li><span className="font-medium text-foreground">Opt-out:</span> You can opt out of non-essential notifications through app settings</li>
              </ul>
              <p className="text-muted-foreground leading-relaxed mt-3">
                To exercise any of these rights, please contact us at the details provided below.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">8. Children's Privacy</h2>
              <p className="text-muted-foreground leading-relaxed">
                SocietyJi is not intended for use by children under the age of 13. We do not knowingly collect
                personal information from children under 13. If we become aware that a child under 13 has provided
                us with personal information, we will take steps to delete such information.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">9. Third-Party Services</h2>
              <p className="text-muted-foreground leading-relaxed mb-2">Our app may use the following third-party services:</p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li><span className="font-medium text-foreground">Firebase Cloud Messaging (FCM):</span> For push notifications</li>
                <li><span className="font-medium text-foreground">AWS (Amazon Web Services):</span> For cloud hosting and data storage</li>
                <li><span className="font-medium text-foreground">SMS Gateways:</span> For OTP verification and notification delivery</li>
              </ul>
              <p className="text-muted-foreground leading-relaxed mt-3">
                These third-party services have their own privacy policies, and we encourage you to review them.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">10. Changes to This Privacy Policy</h2>
              <p className="text-muted-foreground leading-relaxed">
                We may update this Privacy Policy from time to time. We will notify you of any material changes by
                posting the updated policy on this page and updating the "Last updated" date. Your continued use of
                the app after changes constitutes acceptance of the updated policy.
              </p>
            </section>

            <section className="pb-4">
              <h2 className="text-xl font-semibold text-foreground mb-3">11. Contact Us</h2>
              <p className="text-muted-foreground leading-relaxed mb-3">
                If you have any questions or concerns about this Privacy Policy or our data practices, please contact us:
              </p>
              <ul className="space-y-2 text-muted-foreground">
                <li><span className="font-medium text-foreground">App Name:</span> SocietyJi</li>
                <li><span className="font-medium text-foreground">Email:</span> <a href="mailto:support@societyji.com" className="text-primary hover:underline">support@societyji.com</a></li>
                <li><span className="font-medium text-foreground">Website:</span> <a href="https://societyji.com" className="text-primary hover:underline">societyji.com</a></li>
              </ul>
            </section>

          </div>
        </main>
        <Footer />
      </div>
    </PageTransition>
  );
};

export default PrivacyPolicy;
