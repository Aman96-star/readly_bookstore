import { FileText, Mail } from "lucide-react";
import PageHero from "@/components/PageHero";
import PageContainer from "@/components/PageContainer";
import SectionTitle from "@/components/SectionTitle";

export const metadata = {
  title: "Terms of Use",
  description:
    "Read the terms and conditions that govern your use of the Readly Bookstore website and services.",
};

const terms = [
  {
    title: "1. Acceptance of Terms",
    body: "By accessing or using the Readly Bookstore website, you agree to be bound by these Terms of Use and our Privacy Policy. If you do not agree to these terms, please do not use our site.",
  },
  {
    title: "2. Using Our Site",
    body: "You agree to use our website only for lawful purposes. You may not attempt to gain unauthorized access to any part of the site, interfere with its operation, or use automated tools to scrape or resell our content without written permission.",
  },
  {
    title: "3. Accounts & Orders",
    body: "You are responsible for maintaining the confidentiality of your account credentials and for all activity under your account. We reserve the right to refuse or cancel any order at our discretion, including in cases of suspected fraud or pricing errors.",
  },
  {
    title: "4. Intellectual Property",
    body: "All content on this site — including text, graphics, logos, and images — is the property of Readly Bookstore or its licensors and is protected by copyright and trademark law. You may not reproduce or distribute this content without permission.",
  },
  {
    title: "5. Product Descriptions",
    body: "We aim for accuracy in all product descriptions, pricing, and availability, but errors may occasionally occur. We reserve the right to correct any errors and to update information at any time without prior notice.",
  },
  {
    title: "6. Limitation of Liability",
    body: "Readly Bookstore is not liable for any indirect, incidental, or consequential damages arising from your use of the site or products purchased through it, to the fullest extent permitted by law.",
  },
  {
    title: "7. Governing Law",
    body: "These Terms of Use are governed by the laws of the State of Oregon, without regard to its conflict of law principles. Any disputes will be resolved in the courts located in Multnomah County, Oregon.",
  },
  {
    title: "8. Changes to These Terms",
    body: "We may update these Terms of Use from time to time. Continued use of the site after changes are posted constitutes your acceptance of the revised terms.",
  },
];

export default function TermsOfUsePage() {
  return (
    <>
      <PageHero
        eyebrow="Policies"
        icon={FileText}
        title="Terms of Use"
        subtitle="Last updated: January 15, 2026. Please read these terms carefully before using the Readly Bookstore website."
        breadcrumbItems={[{ label: "Terms of Use" }]}
      />

      <section className="py-16 md:py-24">
        <PageContainer>
          <div className="mx-auto max-w-3xl">
            <SectionTitle
              align="left"
              eyebrow="Terms & Conditions"
              title="The agreement between you and Readly"
              subtitle="These terms outline your rights and responsibilities when using our site and purchasing our products."
            />
            <div className="space-y-8">
              {terms.map((term) => (
                <div key={term.title}>
                  <h3 className="mb-2 text-lg font-semibold text-slate-900 dark:text-white">
                    {term.title}
                  </h3>
                  <p className="leading-relaxed text-slate-600 dark:text-slate-300">{term.body}</p>
                </div>
              ))}
            </div>
          </div>
        </PageContainer>
      </section>

      <section className="pb-16 md:pb-24">
        <PageContainer>
          <div className="mx-auto flex max-w-3xl flex-col items-start gap-4 rounded-2xl border border-slate-200 bg-white p-6 sm:flex-row sm:items-center dark:border-slate-700 dark:bg-slate-800">
            <span className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-700 dark:bg-brand-900/30 dark:text-amber-400">
              <Mail className="h-5 w-5" />
            </span>
            <div>
              <h3 className="font-semibold text-slate-900 dark:text-white">Questions about these terms?</h3>
              <p className="text-sm text-slate-600 dark:text-slate-300">
                Contact our legal team at legal@readlybookstore.com or through our{" "}
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
