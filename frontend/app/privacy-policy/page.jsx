import { ShieldCheck, Database, Share2, Cookie, UserCheck, Mail } from "lucide-react";
import PageHero from "@/components/PageHero";
import PageContainer from "@/components/PageContainer";
import SectionTitle from "@/components/SectionTitle";

export const metadata = {
  title: "Privacy Policy",
  description:
    "Read Readly Bookstore's Privacy Policy to understand what information we collect, how it's used, and the choices you have.",
};

const sections = [
  {
    icon: Database,
    title: "Information We Collect",
    body: "When you create an account, place an order, or contact support, we collect information such as your name, email address, shipping address, and payment details. We also automatically collect device and usage data — like browser type and pages visited — to help us improve the site.",
  },
  {
    icon: UserCheck,
    title: "How We Use Your Information",
    body: "We use your information to process orders, provide customer support, personalize your shopping experience, and send order updates. With your consent, we may also send marketing emails about new releases and promotions, which you can opt out of at any time.",
  },
  {
    icon: Share2,
    title: "How We Share Information",
    body: "We share information only as needed to fulfill your order — for example, with shipping carriers and payment processors. We never sell your personal information to third parties for their own marketing purposes.",
  },
  {
    icon: Cookie,
    title: "Cookies & Tracking",
    body: "We use cookies and similar technologies to keep you signed in, remember items in your cart, and understand how visitors use our site. You can control cookie preferences through your browser settings at any time.",
  },
];

export default function PrivacyPolicyPage() {
  return (
    <>
      <PageHero
        eyebrow="Policies"
        icon={ShieldCheck}
        title="Privacy Policy"
        subtitle="Last updated: January 15, 2026. Your privacy matters to us — here's exactly what we collect, how we use it, and the choices you have."
        breadcrumbItems={[{ label: "Privacy Policy" }]}
      />

      <section className="py-16 md:py-24">
        <PageContainer>
          <SectionTitle
            align="left"
            eyebrow="Overview"
            title="Our commitment to your privacy"
            subtitle="This policy explains how Readly Bookstore collects, uses, and protects your personal information when you use our website and services."
          />
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {sections.map((section) => (
              <div
                key={section.title}
                className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-700 dark:bg-slate-800"
              >
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 text-brand-700 dark:bg-brand-900/30 dark:text-amber-400">
                  <section.icon className="h-5 w-5" />
                </div>
                <h3 className="mb-2 text-lg font-semibold text-slate-900 dark:text-white">
                  {section.title}
                </h3>
                <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                  {section.body}
                </p>
              </div>
            ))}
          </div>
        </PageContainer>
      </section>

      <section className="bg-slate-50 py-16 md:py-24 dark:bg-slate-900/40">
        <PageContainer>
          <div className="mx-auto max-w-3xl">
            <SectionTitle align="left" eyebrow="Your Rights" title="Your rights and choices" />
            <div className="space-y-4 text-slate-600 dark:text-slate-300">
              <p>
                You may access, update, or delete your personal information at any time by
                signing in to your account settings. You can also request a copy of the data we
                hold about you or ask us to delete your account entirely by contacting our
                support team.
              </p>
              <p>
                Depending on where you live, you may have additional rights under laws such as the
                California Consumer Privacy Act (CCPA) or the General Data Protection Regulation
                (GDPR), including the right to object to certain processing and the right to data
                portability.
              </p>
              <p>
                We retain personal information only as long as necessary to fulfill the purposes
                described in this policy, comply with our legal obligations, and resolve disputes.
              </p>
            </div>
          </div>
        </PageContainer>
      </section>

      <section className="py-16 md:py-24">
        <PageContainer>
          <div className="mx-auto flex max-w-3xl flex-col items-start gap-4 rounded-2xl border border-slate-200 bg-white p-6 sm:flex-row sm:items-center dark:border-slate-700 dark:bg-slate-800">
            <span className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-700 dark:bg-brand-900/30 dark:text-amber-400">
              <Mail className="h-5 w-5" />
            </span>
            <div>
              <h3 className="font-semibold text-slate-900 dark:text-white">Questions about this policy?</h3>
              <p className="text-sm text-slate-600 dark:text-slate-300">
                Reach our privacy team at privacy@readlybookstore.com or through our{" "}
                <a href="/contact" className="font-medium text-brand-800 underline-offset-2 hover:underline dark:text-amber-400">
                  Contact page
                </a>
                .
              </p>
            </div>
          </div>
        </PageContainer>
      </section>
    </>
  );
}
