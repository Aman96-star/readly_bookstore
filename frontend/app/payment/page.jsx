import { CreditCard, Wallet, Landmark, ShieldCheck, Smartphone, Gift } from "lucide-react";
import PageHero from "@/components/PageHero";
import PageContainer from "@/components/PageContainer";
import SectionTitle from "@/components/SectionTitle";
import FeatureCard from "@/components/FeatureCard";
import FAQCard from "@/components/FAQCard";

export const metadata = {
  title: "Payment",
  description:
    "See the payment methods accepted at Readly Bookstore, including credit cards, digital wallets, and gift cards.",
};

const methods = [
  { icon: CreditCard, title: "Credit & Debit Cards", description: "Visa, Mastercard, American Express, and Discover are all accepted at checkout." },
  { icon: Wallet, title: "Digital Wallets", description: "Pay quickly with PayPal, Apple Pay, or Google Pay on supported devices." },
  { icon: Landmark, title: "Bank Transfer", description: "Available for select business and bulk orders through direct ACH transfer." },
  { icon: Gift, title: "Gift Cards", description: "Redeem a Readly Bookstore gift card or store credit at any point during checkout." },
  { icon: Smartphone, title: "Buy Now, Pay Later", description: "Split your order into installments at checkout through our BNPL partner." },
  { icon: ShieldCheck, title: "Encrypted & Secure", description: "Every transaction is processed through a PCI-DSS compliant, encrypted gateway." },
];

const faqs = [
  {
    question: "When will my card be charged?",
    answer:
      "Your card is charged when your order is placed, not when it ships. If an item becomes unavailable, we'll refund that portion automatically.",
  },
  {
    question: "Can I use multiple payment methods on one order?",
    answer:
      "You can combine a gift card or store credit with one additional payment method, such as a credit card or PayPal, at checkout.",
  },
  {
    question: "Do you charge sales tax?",
    answer:
      "Sales tax is calculated based on your shipping address and applicable state and local tax laws, and will be shown before you complete checkout.",
  },
  {
    question: "Is my payment information stored?",
    answer:
      "If you choose to save a card for future orders, it is tokenized and stored securely by our payment processor — we never store full card numbers ourselves.",
  },
];

export default function PaymentPage() {
  return (
    <>
      <PageHero
        eyebrow="Help"
        icon={CreditCard}
        title="Payment methods"
        subtitle="We support a range of secure, convenient ways to pay so checkout fits the way you shop."
        breadcrumbItems={[{ label: "Payment" }]}
      />

      <section className="py-16 md:py-24">
        <PageContainer>
          <SectionTitle
            eyebrow="Accepted Methods"
            title="Choose the option that works for you"
          />
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {methods.map((method) => (
              <FeatureCard key={method.title} {...method} />
            ))}
          </div>
        </PageContainer>
      </section>

      <section className="bg-slate-50 py-16 md:py-24 dark:bg-slate-900/40">
        <PageContainer>
          <SectionTitle eyebrow="Payment FAQs" title="Common questions" />
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
