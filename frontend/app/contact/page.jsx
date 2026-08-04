import { Mail, Phone, MapPin, Clock, MessageSquare } from "lucide-react";
import PageHero from "@/components/PageHero";
import PageContainer from "@/components/PageContainer";
import SectionTitle from "@/components/SectionTitle";
import ContactForm from "@/components/ContactForm";
import { siteConfig } from "@/lib/site";

export const metadata = {
  title: "Contact Us",
  description:
    "Get in touch with the Readly Bookstore support team for order help, shipping questions, or partnership inquiries.",
};

const contactMethods = [
  { icon: Mail, label: "Email", value: siteConfig.email },
  { icon: Phone, label: "Phone", value: siteConfig.phone },
  { icon: MapPin, label: "Address", value: siteConfig.address },
  { icon: Clock, label: "Support Hours", value: "Mon–Fri, 8am–6pm PT" },
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Get In Touch"
        icon={MessageSquare}
        title="We'd love to hear from you"
        subtitle="Whether it's a question about your order or feedback on a book, our support team usually replies within one business day."
        breadcrumbItems={[{ label: "Contact Us" }]}
      />

      <section className="py-16 md:py-24">
        <PageContainer>
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-5">
            <div className="lg:col-span-3">
              <SectionTitle align="left" eyebrow="Send a Message" title="Fill out the form below" />
              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8 dark:border-slate-700 dark:bg-slate-800">
                <ContactForm />
              </div>
            </div>

            <div className="lg:col-span-2">
              <SectionTitle align="left" eyebrow="Other Ways to Reach Us" title="Contact details" />
              <div className="space-y-4">
                {contactMethods.map((method) => (
                  <div
                    key={method.label}
                    className="flex items-start gap-4 rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-700 dark:bg-slate-800"
                  >
                    <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-700 dark:bg-brand-900/30 dark:text-amber-400">
                      <method.icon className="h-5 w-5" />
                    </span>
                    <div>
                      <p className="text-sm font-medium text-slate-500 dark:text-slate-400">{method.label}</p>
                      <p className="font-medium text-slate-900 dark:text-white">{method.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </PageContainer>
      </section>
    </>
  );
}
