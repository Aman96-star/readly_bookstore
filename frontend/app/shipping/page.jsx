import { Truck, Package, Globe2, MapPinned } from "lucide-react";
import PageHero from "@/components/PageHero";
import PageContainer from "@/components/PageContainer";
import SectionTitle from "@/components/SectionTitle";
import FAQCard from "@/components/FAQCard";

export const metadata = {
  title: "Shipping",
  description:
    "Shipping rates, delivery times, and tracking information for orders from Readly Bookstore.",
};

const shippingOptions = [
  { name: "Standard Shipping", time: "4–7 business days", cost: "Free over $35 / $4.99 under $35" },
  { name: "Express Shipping", time: "2–3 business days", cost: "$9.99" },
  { name: "Overnight Shipping", time: "1 business day", cost: "$19.99" },
  { name: "International Shipping", time: "7–21 business days", cost: "Calculated at checkout" },
];

const faqs = [
  {
    question: "How do I track my order?",
    answer:
      "Once your order ships, you'll receive an email with a tracking number and link. You can also view tracking anytime from the Orders section of your account.",
  },
  {
    question: "Do you ship internationally?",
    answer:
      "Yes, we ship to 38 countries. International shipping rates and delivery times are calculated at checkout based on your destination and order weight.",
  },
  {
    question: "What if my package arrives damaged?",
    answer:
      "Contact our support team within 7 days of delivery with photos of the damage, and we'll send a replacement or issue a full refund — no return required.",
  },
  {
    question: "Can I change my shipping address after ordering?",
    answer:
      "If your order hasn't shipped yet, contact support as soon as possible and we'll do our best to update the address before it leaves our warehouse.",
  },
];

export default function ShippingPage() {
  return (
    <>
      <PageHero
        eyebrow="Help"
        icon={Truck}
        title="Shipping information"
        subtitle="Fast, trackable delivery from three fulfillment centers — with free standard shipping on orders over $35."
        breadcrumbItems={[{ label: "Shipping" }]}
      />

      <section className="py-16 md:py-24">
        <PageContainer>
          <SectionTitle eyebrow="Delivery Options" title="Choose your shipping speed" align="left" />
          <div className="overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-700">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 text-slate-500 dark:bg-slate-900/60 dark:text-slate-400">
                <tr>
                  <th className="px-6 py-4 font-semibold">Shipping Method</th>
                  <th className="px-6 py-4 font-semibold">Delivery Time</th>
                  <th className="px-6 py-4 font-semibold">Cost</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                {shippingOptions.map((option) => (
                  <tr key={option.name} className="bg-white dark:bg-slate-800">
                    <td className="px-6 py-4 font-medium text-slate-900 dark:text-white">{option.name}</td>
                    <td className="px-6 py-4 text-slate-600 dark:text-slate-300">{option.time}</td>
                    <td className="px-6 py-4 text-slate-600 dark:text-slate-300">{option.cost}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </PageContainer>
      </section>

      <section className="bg-slate-50 py-16 md:py-24 dark:bg-slate-900/40">
        <PageContainer>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 text-center dark:border-slate-700 dark:bg-slate-800">
              <Package className="mx-auto mb-3 h-8 w-8 text-brand-700 dark:text-amber-400" />
              <h3 className="mb-1 font-semibold text-slate-900 dark:text-white">Careful Packing</h3>
              <p className="text-sm text-slate-600 dark:text-slate-300">Every book is padded and boxed to arrive in pristine condition.</p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white p-6 text-center dark:border-slate-700 dark:bg-slate-800">
              <MapPinned className="mx-auto mb-3 h-8 w-8 text-brand-700 dark:text-amber-400" />
              <h3 className="mb-1 font-semibold text-slate-900 dark:text-white">Real-Time Tracking</h3>
              <p className="text-sm text-slate-600 dark:text-slate-300">Follow your package from our warehouse to your door.</p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white p-6 text-center dark:border-slate-700 dark:bg-slate-800">
              <Globe2 className="mx-auto mb-3 h-8 w-8 text-brand-700 dark:text-amber-400" />
              <h3 className="mb-1 font-semibold text-slate-900 dark:text-white">Global Reach</h3>
              <p className="text-sm text-slate-600 dark:text-slate-300">We ship to readers in 38 countries and counting.</p>
            </div>
          </div>
        </PageContainer>
      </section>

      <section className="py-16 md:py-24">
        <PageContainer>
          <SectionTitle eyebrow="Shipping FAQs" title="Common questions" />
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
