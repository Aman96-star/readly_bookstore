import { HelpCircle, Package, Truck, RotateCcw, UserCircle } from "lucide-react";
import PageHero from "@/components/PageHero";
import PageContainer from "@/components/PageContainer";
import FAQCard from "@/components/FAQCard";
import CTASection from "@/components/CTASection";

export const metadata = {
  title: "FAQ",
  description:
    "Frequently asked questions about ordering, shipping, returns, and managing your account at Readly Bookstore.",
};

const faqGroups = [
  {
    title: "Orders",
    icon: Package,
    items: [
      {
        question: "How do I place an order?",
        answer: "Browse our catalog, add titles to your cart, and check out securely with a credit card, digital wallet, or gift card.",
      },
      {
        question: "Can I cancel or modify an order after placing it?",
        answer: "Orders can be modified or canceled within 1 hour of placing them. After that, they enter processing and can no longer be changed — but you're always welcome to start a return once it arrives.",
      },
      {
        question: "Do you offer gift wrapping?",
        answer: "Yes, gift wrapping is available at checkout for a small fee, along with the option to add a personalized note.",
      },
    ],
  },
  {
    title: "Shipping",
    icon: Truck,
    items: [
      {
        question: "How much does shipping cost?",
        answer: "Standard shipping is free on orders over $35 and $4.99 otherwise. Express and overnight options are available at checkout for an additional fee.",
      },
      {
        question: "Do you ship internationally?",
        answer: "Yes, we ship to 38 countries worldwide. Rates and delivery estimates are calculated at checkout based on your destination.",
      },
    ],
  },
  {
    title: "Returns",
    icon: RotateCcw,
    items: [
      {
        question: "What is your return window?",
        answer: "You have 30 days from delivery to return most items for a full refund, using the prepaid label we email you.",
      },
      {
        question: "How long do refunds take?",
        answer: "Refunds are processed within 5–7 business days of us receiving your returned item.",
      },
    ],
  },
  {
    title: "Account",
    icon: UserCircle,
    items: [
      {
        question: "How do I reset my password?",
        answer: "Click 'Forgot Password' on the sign-in page and follow the emailed link to set a new one.",
      },
      {
        question: "Can I have multiple shipping addresses saved?",
        answer: "Yes, your account allows you to save multiple addresses and choose one at checkout for each order.",
      },
    ],
  },
];

export default function FAQPage() {
  return (
    <>
      <PageHero
        eyebrow="Help"
        icon={HelpCircle}
        title="Frequently asked questions"
        subtitle="Quick answers about orders, shipping, returns, and your account. Can't find what you need? Our support team is a message away."
        breadcrumbItems={[{ label: "FAQ" }]}
      />

      <section className="py-16 md:py-24">
        <PageContainer>
          <div className="mx-auto max-w-3xl space-y-14">
            {faqGroups.map((group) => (
              <div key={group.title}>
                <div className="mb-6 flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-50 text-brand-700 dark:bg-brand-900/30 dark:text-amber-400">
                    <group.icon className="h-5 w-5" />
                  </span>
                  <h2 className="text-xl font-bold text-slate-900 dark:text-white">{group.title}</h2>
                </div>
                <div className="space-y-4">
                  {group.items.map((item) => (
                    <FAQCard key={item.question} {...item} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </PageContainer>
      </section>

      <section className="pb-16 md:pb-24">
        <PageContainer>
          <CTASection
            title="Still have questions?"
            subtitle="Reach out to our support team and we'll get back to you within one business day."
            primaryLabel="Contact Support"
            primaryHref="/contact"
          />
        </PageContainer>
      </section>
    </>
  );
}
