import { Copyright, BookMarked, Send, Mail } from "lucide-react";
import PageHero from "@/components/PageHero";
import PageContainer from "@/components/PageContainer";
import SectionTitle from "@/components/SectionTitle";

export const metadata = {
  title: "Copyright Policy",
  description:
    "Learn about Readly Bookstore's copyright policy, including ownership of site content and our process for handling infringement claims.",
};

const noticeSteps = [
  "A description of the copyrighted work you believe has been infringed.",
  "The specific URL or location on our site where the material appears.",
  "Your name, address, phone number, and email address.",
  "A statement that you have a good-faith belief the use is unauthorized.",
  "A statement, under penalty of perjury, that the information is accurate and that you are authorized to act on behalf of the copyright owner.",
];

export default function CopyrightPolicyPage() {
  return (
    <>
      <PageHero
        eyebrow="Policies"
        icon={Copyright}
        title="Copyright Policy"
        subtitle="Last updated: January 15, 2026. Readly Bookstore respects the intellectual property rights of authors, publishers, and content creators."
        breadcrumbItems={[{ label: "Copyright Policy" }]}
      />

      <section className="py-16 md:py-24">
        <PageContainer>
          <div className="mx-auto max-w-3xl space-y-12">
            <div>
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 text-brand-700 dark:bg-brand-900/30 dark:text-amber-400">
                <BookMarked className="h-5 w-5" />
              </div>
              <SectionTitle align="left" eyebrow="Ownership" title="Content on this site" />
              <p className="text-slate-600 dark:text-slate-300">
                All text, images, logos, product photography, and design elements on the Readly
                Bookstore website are owned by Readly Bookstore or used under license from our
                partners and publishers. Book covers and descriptions are used with permission
                from the respective publishers and authors for the purpose of promoting their
                titles. Unauthorized reproduction, distribution, or commercial use of this content
                is prohibited without prior written consent.
              </p>
            </div>

            <div>
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 text-brand-700 dark:bg-brand-900/30 dark:text-amber-400">
                <Send className="h-5 w-5" />
              </div>
              <SectionTitle align="left" eyebrow="Infringement Claims" title="Reporting a copyright concern" />
              <p className="mb-4 text-slate-600 dark:text-slate-300">
                If you believe that content on our site infringes your copyright, please send a
                written notice to our designated agent that includes the following information:
              </p>
              <ul className="space-y-3">
                {noticeSteps.map((step, idx) => (
                  <li key={step} className="flex gap-3 text-slate-600 dark:text-slate-300">
                    <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-brand-800 text-xs font-semibold text-white">
                      {idx + 1}
                    </span>
                    {step}
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-slate-600 dark:text-slate-300">
                Upon receiving a valid notice, we will promptly investigate and, where
                appropriate, remove or disable access to the material in question.
              </p>
            </div>

            <div>
              <SectionTitle align="left" eyebrow="Counter-Notices" title="If your content was removed in error" />
              <p className="text-slate-600 dark:text-slate-300">
                If you believe material was removed as a result of a mistake or misidentification,
                you may submit a counter-notice with your contact information and a statement
                under penalty of perjury that you have a good-faith belief the material was
                removed in error. We will review counter-notices and respond in accordance with
                applicable law.
              </p>
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
              <h3 className="font-semibold text-slate-900 dark:text-white">Send a copyright notice</h3>
              <p className="text-sm text-slate-600 dark:text-slate-300">
                Email our designated agent at copyright@readlybookstore.com or reach us via our{" "}
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
