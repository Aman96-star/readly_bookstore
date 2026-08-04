import { Lock, CreditCard, ShieldAlert, Eye, KeyRound, Server } from "lucide-react";
import PageHero from "@/components/PageHero";
import PageContainer from "@/components/PageContainer";
import SectionTitle from "@/components/SectionTitle";
import FeatureCard from "@/components/FeatureCard";
import FAQCard from "@/components/FAQCard";

export const metadata = {
  title: "Secure Shopping",
  description:
    "Learn how Readly Bookstore protects your personal and payment information with industry-standard security measures.",
};

const protections = [
  { icon: Lock, title: "256-bit SSL Encryption", description: "Every page on our site is encrypted end-to-end, protecting your data in transit." },
  { icon: CreditCard, title: "PCI-DSS Compliant", description: "We never store full card numbers. Payments are processed by certified, compliant providers." },
  { icon: ShieldAlert, title: "Fraud Monitoring", description: "Automated systems flag unusual order activity before it's processed." },
  { icon: Eye, title: "Privacy by Design", description: "We collect only what's needed to fulfill your order — nothing more." },
  { icon: KeyRound, title: "Secure Account Access", description: "Optional two-factor authentication adds an extra layer of protection to your account." },
  { icon: Server, title: "Protected Infrastructure", description: "Our servers are monitored 24/7 with regular security audits and patching." },
];

const faqs = [
  {
    question: "Is it safe to save my card on file?",
    answer:
      "Yes. Saved cards are tokenized and stored by our PCI-compliant payment processor — we never have access to your full card number on our own servers.",
  },
  {
    question: "How do I know a checkout page is secure?",
    answer:
      "Look for the padlock icon in your browser's address bar and confirm the URL begins with https://. All Readly Bookstore checkout pages are fully encrypted.",
  },
  {
    question: "What should I do if I notice suspicious account activity?",
    answer:
      "Change your password immediately and contact our support team. We'll help you review recent activity and secure your account.",
  },
];

export default function SecureShoppingPage() {
  return (
    <>
      <PageHero
        eyebrow="Policies"
        icon={Lock}
        title="Shop with confidence"
        subtitle="From checkout to delivery, your security is built into every step of shopping with Readly Bookstore."
        breadcrumbItems={[{ label: "Secure Shopping" }]}
      />

      <section className="py-16 md:py-24">
        <PageContainer>
          <SectionTitle
            eyebrow="How We Protect You"
            title="Security at every step"
            subtitle="We combine industry-standard technology with careful internal practices to keep your data safe."
          />
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {protections.map((item) => (
              <FeatureCard key={item.title} {...item} />
            ))}
          </div>
        </PageContainer>
      </section>

      <section className="bg-slate-50 py-16 md:py-24 dark:bg-slate-900/40">
        <PageContainer>
          <div className="mx-auto max-w-3xl">
            <SectionTitle align="left" eyebrow="Tips" title="How to shop safely online" />
            <ul className="space-y-4 text-slate-600 dark:text-slate-300">
              <li className="flex gap-3">
                <span className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-brand-700 dark:bg-amber-400" />
                Only enter your payment details on pages with a padlock icon and a URL starting with https://.
              </li>
              <li className="flex gap-3">
                <span className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-brand-700 dark:bg-amber-400" />
                Use a strong, unique password for your Readly account and enable two-factor authentication.
              </li>
              <li className="flex gap-3">
                <span className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-brand-700 dark:bg-amber-400" />
                Be cautious of emails claiming to be from Readly that ask for your password — we will never ask for it by email.
              </li>
              <li className="flex gap-3">
                <span className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-brand-700 dark:bg-amber-400" />
                Review your order confirmations and bank statements regularly for anything unfamiliar.
              </li>
            </ul>
          </div>
        </PageContainer>
      </section>

      <section className="py-16 md:py-24">
        <PageContainer>
          <SectionTitle eyebrow="Common Questions" title="Security FAQs" />
          <div className="mx-auto max-w-3xl space-y-4">
            {faqs.map((faq) => (
              <FAQCard key={faq.question} {...faq} />
            ))}
          </div>
        </PageContainer>
      </section>
    </>
  );
}
