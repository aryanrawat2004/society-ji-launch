import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageTransition from "@/components/PageTransition";
import { Trash2, Mail, AlertTriangle, CheckCircle2, Database, ShieldOff } from "lucide-react";

const DeleteAccount = () => {
  return (
    <PageTransition>
      <div className="min-h-screen overflow-x-hidden">
        <Navbar />
        <main className="max-w-3xl mx-auto px-4 md:px-6 py-12 md:py-16">
          {/* Header */}
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 rounded-full bg-destructive/10">
              <Trash2 className="w-6 h-6 text-destructive" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground">Delete Your Account</h1>
          </div>
          <p className="text-muted-foreground mb-10 text-sm">SocietyJi — Account & Data Deletion Request</p>

          {/* Warning Banner */}
          <div className="flex gap-3 p-4 rounded-lg border border-destructive/30 bg-destructive/5 mb-8">
            <AlertTriangle className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
            <p className="text-sm text-foreground leading-relaxed">
              <span className="font-semibold">This action is permanent and irreversible.</span> Once your account is
              deleted, all your data will be permanently removed and cannot be recovered.
            </p>
          </div>

          {/* Steps */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-foreground mb-5">How to Request Account Deletion</h2>
            <div className="space-y-4">
              {[
                {
                  step: "1",
                  title: "Send a Deletion Request Email",
                  desc: (
                    <>
                      Email us at{" "}
                      <a href="mailto:hello@societyji.com" className="text-primary font-medium hover:underline">
                        hello@societyji.com
                      </a>{" "}
                      with the subject line: <span className="font-medium text-foreground">"Account Deletion Request"</span>
                    </>
                  ),
                },
                {
                  step: "2",
                  title: "Provide Your Account Details",
                  desc: "Include your registered phone number and the society name you belong to so we can identify your account.",
                },
                {
                  step: "3",
                  title: "Confirmation",
                  desc: "We will send you a confirmation email within 2 business days before proceeding with deletion.",
                },
                {
                  step: "4",
                  title: "Account Deleted",
                  desc: "Your account and all associated data will be permanently deleted within 7 business days of confirmation.",
                },
              ].map(({ step, title, desc }) => (
                <div key={step} className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">
                    {step}
                  </div>
                  <div className="pt-1">
                    <p className="font-medium text-foreground mb-0.5">{title}</p>
                    <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* What gets deleted */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-foreground mb-5">What Data Will Be Deleted</h2>
            <div className="grid sm:grid-cols-2 gap-3">
              {[
                "Name, phone number & email address",
                "Residential & flat information",
                "Family member details",
                "Vehicle registration data",
                "Profile photo",
                "Visitor entry/exit logs",
                "Maintenance payment history",
                "Complaint & poll records",
                "Amenity booking history",
                "Push notification tokens",
              ].map((item) => (
                <div key={item} className="flex items-center gap-2 text-sm text-muted-foreground">
                  <CheckCircle2 className="w-4 h-4 text-destructive flex-shrink-0" />
                  {item}
                </div>
              ))}
            </div>
          </section>

          {/* What may be retained */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-foreground mb-4">Data That May Be Retained</h2>
            <div className="space-y-3 p-4 rounded-lg border border-border bg-muted/30">
              <div className="flex gap-3">
                <Database className="w-5 h-5 text-muted-foreground flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-foreground mb-1">Legal & Financial Records</p>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Certain transactional records (e.g., maintenance payment receipts) may be retained for up to{" "}
                    <span className="font-medium text-foreground">7 years</span> as required by Indian financial
                    regulations. This data is anonymized where possible.
                  </p>
                </div>
              </div>
              <div className="flex gap-3">
                <ShieldOff className="w-5 h-5 text-muted-foreground flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-foreground mb-1">Dispute Resolution</p>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    If there is an active dispute or legal proceeding involving your account, relevant records may be
                    retained until the matter is resolved.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Contact CTA */}
          <section className="p-6 rounded-xl border border-border bg-card text-center">
            <Mail className="w-8 h-8 text-primary mx-auto mb-3" />
            <h3 className="text-lg font-semibold text-foreground mb-1">Ready to Delete Your Account?</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Send your deletion request to our support team and we'll handle it promptly.
            </p>
            <a
              href="mailto:hello@societyji.com?subject=Account%20Deletion%20Request"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg bg-destructive text-white text-sm font-medium hover:bg-destructive/90 transition-colors"
            >
              <Trash2 className="w-4 h-4" />
              Request Account Deletion
            </a>
            <p className="text-xs text-muted-foreground mt-4">
              Or email us directly at{" "}
              <a href="mailto:hello@societyji.com" className="text-primary hover:underline">
                hello@societyji.com
              </a>
            </p>
          </section>
        </main>
        <Footer />
      </div>
    </PageTransition>
  );
};

export default DeleteAccount;
