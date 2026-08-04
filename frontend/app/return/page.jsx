import { RotateCcw, PackageCheck, Ban, CircleDollarSign } from "lucide-react";
import PageHero from "@/components/PageHero";
import PageContainer from "@/components/PageContainer";
import SectionTitle from "@/components/SectionTitle";
import FeatureCard from "@/components/FeatureCard";
import FAQCard from "@/components/FAQCard";

export const metadata = {
  title: "Return & Refund Policy",
  description:
    "Learn how to return an order to Readly Bookstore, what's eligible for a refund, and how long the process takes.",
};

const steps = [
  { title: "Start Your Return", description: "Sign in and select 'Return Item' from your order history within 30 days of delivery." },
  { title: "Print Your Label", description: "We'll email a prepaid return shipping label — no need to visit the post office in person." },
  { title: "Pack & Ship", description: "Repackage the item securely and drop it off at any authorized carrier location." },
  { title: "Get Refunded", description: "Once received, we'll process your refund to the original payment method within 5–7 business days." },
];

const nonReturnable = [
  "Digital downloads and eBooks",
  "Gift cards and store credit",
  "Items marked 'Final Sale' at checkout",
  "Books with visible water or heat damage not caused by shipping",
];

const faqs = [
  {
    question: "How long do I have to return an item?",
    answer:
      "You have 30 days from the delivery date to start a return. Items must be in their original condition to qualify for a full refund.",
  },
  {
    question: "Do I have to pay for return shipping?",
    answer:
      "No — we provide a prepaid return label for all eligible returns within the United States. International return shipping costs may vary.",
  },
  {
    question: "Can I exchange a book instead of returning it?",
    answer:
      "We currently process exchanges as a return plus a new order, so you'll receive your refund and can place a new order right away.",
  },
  {
    question: "What if I received the wrong item?",
    answer:
      "Contact support with your order number and we'll ship the correct item immediately and arrange free return shipping for the mistake — no cost to you.",
  },
];

export default function ReturnPage() {
  return (
    <>
      <PageHero
        eyebrow="Help"
        icon={RotateCcw}
        title="Returns made easy"
        subtitle="Not the right fit? Return most items within 30 days of delivery for a full refund to your original payment method."
        breadcrumbItems={[{ label: "Return" }]}
      />

      <section className="py-16 md:py-24">
        <PageContainer>
          <SectionTitle eyebrow="How It Works" title="Return an item in four steps" />
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, idx) => (
              <div
                key={step.title}
                className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-700 dark:bg-slate-800"
              >
                <span className="mb-4 flex h-9 w-9 items-center justify-center rounded-full bg-brand-800 text-sm font-bold text-white">
                  {idx + 1}
                </span>
                <h3 className="mb-2 font-semibold text-slate-900 dark:text-white">{step.title}</h3>
                <p className="text-sm text-slate-600 dark:text-slate-300">{step.description}</p>
              </div>
            ))}
          </div>
        </PageContainer>
      </section>

      <section className="bg-slate-50 py-16 md:py-24 dark:bg-slate-900/40">
        <PageContainer>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <FeatureCard
              icon={PackageCheck}
              title="Eligible for Return"
              description="Most new and unused books, gifts, and accessories can be returned within 30 days in their original condition."
            />
            <FeatureCard
              icon={CircleDollarSign}
              title="Refund Timeline"
              description="Refunds are issued to your original payment method within 5–7 business days of us receiving your return."
            />
          </div>
          <div className="mx-auto mt-10 max-w-2xl rounded-2xl border border-amber-200 bg-amber-50 p-6 dark:border-amber-900/40 dark:bg-amber-900/10">
            <div className="mb-3 flex items-center gap-2 font-semibold text-amber-900 dark:text-amber-300">
              <Ban className="h-5 w-5" />
              Non-Returnable Items
            </div>
            <ul className="space-y-1.5 text-sm text-amber-900/80 dark:text-amber-200/80">
              {nonReturnable.map((item) => (
                <li key={item}>• {item}</li>
              ))}
            </ul>
          </div>
        </PageContainer>
      </section>

      <section className="py-16 md:py-24">
        <PageContainer>
          <SectionTitle eyebrow="Return FAQs" title="Common questions" />
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
