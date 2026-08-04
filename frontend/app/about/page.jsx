import { Heart, Users, BookOpen, Globe, Award, Leaf } from "lucide-react";
import PageHero from "@/components/PageHero";
import PageContainer from "@/components/PageContainer";
import SectionTitle from "@/components/SectionTitle";
import FeatureCard from "@/components/FeatureCard";
import CTASection from "@/components/CTASection";

export const metadata = {
  title: "About Us",
  description:
    "Learn about Readly Bookstore's story, mission, and the team dedicated to connecting readers with books they'll love.",
};

const values = [
  {
    icon: Heart,
    title: "Reader-First",
    description: "Every decision we make starts with one question: does this make the reading experience better?",
  },
  {
    icon: Users,
    title: "Community",
    description: "We support local authors, independent presses, and book clubs across the country.",
  },
  {
    icon: Leaf,
    title: "Sustainability",
    description: "From recycled packaging to carbon-conscious shipping, we're reducing our footprint one order at a time.",
  },
  {
    icon: Award,
    title: "Quality Curation",
    description: "Our team of former booksellers and librarians hand-selects every title we carry.",
  },
];

const stats = [
  { label: "Titles in catalog", value: "120,000+" },
  { label: "Happy readers", value: "200,000+" },
  { label: "Countries shipped to", value: "38" },
  { label: "Years in business", value: "12" },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="Our Story"
        icon={BookOpen}
        title="Built by readers, for readers"
        subtitle="Readly Bookstore started in a single room above a coffee shop in 2013. Today, we ship books to readers in 38 countries — but our mission hasn't changed: put the right book in the right hands."
        breadcrumbItems={[{ label: "About Us" }]}
      />

      <section className="py-16 md:py-24">
        <PageContainer>
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
            <div>
              <SectionTitle
                align="left"
                eyebrow="Where We Started"
                title="A small shelf that grew into a global bookstore"
              />
              <div className="space-y-4 text-slate-600 dark:text-black">
                <p>
                  Readly Bookstore was founded by a small group of librarians and lifelong readers
                  who were frustrated that so many great books were hard to find. What began as a
                  single curated shelf of staff picks has grown into a catalog of more than
                  120,000 titles spanning fiction, nonfiction, children's books, and rare
                  collectibles.
                </p>
                <p>
                  We still operate the way we did on day one: real people reading real books,
                  recommending only what we'd hand to a friend. Every review on our site is
                  written in-house, and every shipment is packed with the same care we'd want for
                  our own orders.
                </p>
              
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-2xl border border-red-600 bg-white p-6 text-center shadow-sm dark:border-slate-700 dark:bg-black"
                >
                  <p className="text-3xl font-bold text-brand-800 dark:text-black">{stat.value}</p>
                  <p className="mt-1 text-sm text-black dark:text-">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </PageContainer>
      </section>

      <section className="bg-slate-50 py-16 md:py-24 dark:bg-slate-900/40">
        <PageContainer>
          <SectionTitle
            eyebrow="What We Stand For"
            title="Our values guide every order we pack"
            subtitle="These aren't words on a wall — they shape how we curate, ship, and support our readers every day."
          />
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((value) => (
              <FeatureCard key={value.title} {...value} />
            ))}
          </div>
        </PageContainer>
      </section>

      <section className="py-16 md:py-24">
        <PageContainer>
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
            <div className="order-2 flex h-64 items-center justify-center rounded-3xl bg-gradient-to-br from-brand-100 to-amber-100 sm:h-80 lg:order-1 dark:from-brand-900/30 dark:to-amber-900/20">
              <Globe className="h-24 w-24 text-brand-700 dark:text-amber-400" strokeWidth={1} />
            </div>
            <div className="order-1 lg:order-2">
              <SectionTitle
                align="left"
                eyebrow="Looking Ahead"
                title="Connecting readers across the globe"
              />
              <p className="text-slate-600 dark:text-slate-300">
                We're investing in faster international shipping, more accessible formats
                including large print and audiobooks, and partnerships with independent bookshops
                worldwide. Our goal over the next five years is simple: make it just as easy to
                find a great book whether you're in Portland or Prague.
              </p>
            </div>
          </div>
        </PageContainer>
      </section>

      <section className="pb-16 md:pb-24">
        <PageContainer>
          <CTASection
            title="Want to join our story?"
            subtitle="We're always looking for passionate readers to join the Readly team."
            primaryLabel="View Open Roles"
            primaryHref="/career"
            secondaryLabel="Contact Us"
            secondaryHref="/contact"
          />
        </PageContainer>
      </section>
    </>
  );
}
