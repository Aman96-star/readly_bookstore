import { Briefcase, HeartHandshake, GraduationCap, Home, Sparkles, Mail } from "lucide-react";
import PageHero from "@/components/PageHero";
import PageContainer from "@/components/PageContainer";
import SectionTitle from "@/components/SectionTitle";
import FeatureCard from "@/components/FeatureCard";
import CTASection from "@/components/CTASection";

export const metadata = {
  title: "Careers",
  description:
    "Explore open roles at Readly Bookstore and learn about our culture, benefits, and what it's like to work with a team of lifelong readers.",
};

const benefits = [
  { icon: HeartHandshake, title: "Health & Wellness", description: "Full medical, dental, and vision coverage from day one, plus a wellness stipend." },
  { icon: Home, title: "Flexible Work", description: "Hybrid and remote options for most roles, with core collaboration hours." },
  { icon: GraduationCap, title: "Learning Budget", description: "$1,000 a year for courses, conferences, or — of course — books." },
  { icon: Sparkles, title: "Employee Discount", description: "40% off every order, because our team should never run out of things to read." },
];

const openRoles = [
  { title: "Senior Frontend Engineer", team: "Engineering", location: "Remote (US)", type: "Full-time" },
  { title: "Fulfillment Center Associate", team: "Operations", location: "Portland, OR", type: "Full-time" },
  { title: "Content & Editorial Writer", team: "Marketing", location: "Remote", type: "Full-time" },
  { title: "Customer Experience Specialist", team: "Support", location: "Remote (US)", type: "Full-time" },
  { title: "Category Buyer — Children's Books", team: "Merchandising", location: "Portland, OR", type: "Full-time" },
  { title: "Supply Chain Analyst", team: "Operations", location: "Hybrid — Portland, OR", type: "Full-time" },
];

export default function CareerPage() {
  return (
    <>
      <PageHero
        eyebrow="Careers"
        icon={Briefcase}
        title="Build the future of bookselling with us"
        subtitle="We're a team of readers, engineers, and storytellers working together to make it easier for people to find books they'll love. Come build it with us."
        breadcrumbItems={[{ label: "Career" }]}
      />

      <section className="py-16 md:py-24">
        <PageContainer>
          <SectionTitle
            eyebrow="Why Readly"
            title="A culture built around curiosity"
            subtitle="We hire people who love learning — about books, about our readers, and about each other."
          />
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {benefits.map((benefit) => (
              <FeatureCard key={benefit.title} {...benefit} />
            ))}
          </div>
        </PageContainer>
      </section>

      <section className="bg-slate-50 py-16 md:py-24 dark:bg-slate-900/40">
        <PageContainer>
          <SectionTitle
            eyebrow="Open Positions"
            title="Current openings"
            subtitle="Don't see the right fit? Send us your resume anyway — we're always happy to hear from great people."
          />
          <div className="mx-auto max-w-4xl divide-y divide-slate-200 overflow-hidden rounded-2xl border border-slate-200 bg-white dark:divide-slate-700 dark:border-slate-700 dark:bg-slate-800">
            {openRoles.map((role) => (
              <div
                key={role.title}
                className="flex flex-col gap-2 p-6 transition-colors hover:bg-brand-50/50 sm:flex-row sm:items-center sm:justify-between dark:hover:bg-slate-700/40"
              >
                <div>
                  <h3 className="font-semibold text-slate-900 dark:text-white">{role.title}</h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    {role.team} · {role.location}
                  </p>
                </div>
                <span className="inline-flex w-fit items-center rounded-full bg-brand-50 px-3 py-1 text-xs font-medium text-brand-800 dark:bg-brand-900/30 dark:text-amber-300">
                  {role.type}
                </span>
              </div>
            ))}
          </div>
        </PageContainer>
      </section>

      <section className="py-16 md:py-24">
        <PageContainer>
          <CTASection
            title="Ready to apply?"
            subtitle="Email your resume and a short note about your favorite book to our talent team."
            primaryLabel="Email Careers Team"
            primaryHref="/contact"
            secondaryLabel="Learn About Us"
            secondaryHref="/about"
          />
        </PageContainer>
      </section>
    </>
  );
}
