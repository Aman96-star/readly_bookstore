import { Newspaper, ArrowRight, Clock } from "lucide-react";
import PageHero from "@/components/PageHero";
import PageContainer from "@/components/PageContainer";
import SectionTitle from "@/components/SectionTitle";
import CTASection from "@/components/CTASection";

export const metadata = {
  title: "Blog",
  description:
    "Reading lists, author interviews, and behind-the-scenes stories from the Readly Bookstore team.",
};

const posts = [
  {
    title: "10 Debut Novels You Shouldn't Miss This Year",
    category: "Fiction",
    date: "July 18, 2026",
    readTime: "6 min read",
    excerpt:
      "From literary thrillers to quiet character studies, these first-time authors are redefining what a debut can do.",
  },
  {
    title: "How to Build a Reading Habit That Actually Sticks",
    category: "Reading Life",
    date: "July 9, 2026",
    readTime: "5 min read",
    excerpt:
      "Small, sustainable changes — not ambitious reading goals — are what turn reading into a lifelong habit.",
  },
  {
    title: "Inside the Cover: An Interview With Our Head Buyer",
    category: "Behind the Scenes",
    date: "June 28, 2026",
    readTime: "8 min read",
    excerpt:
      "We sat down with our children's books buyer to talk about what makes a picture book unforgettable.",
  },
  {
    title: "The Best Business Books for First-Time Managers",
    category: "Business",
    date: "June 14, 2026",
    readTime: "7 min read",
    excerpt:
      "Practical, no-nonsense reads for anyone stepping into a leadership role for the first time.",
  },
  {
    title: "A Beginner's Guide to Collecting Rare Editions",
    category: "Collecting",
    date: "May 30, 2026",
    readTime: "9 min read",
    excerpt:
      "What to look for, what to avoid, and how to start a rare book collection without breaking the bank.",
  },
  {
    title: "Summer Reading List: Staff Picks From Every Genre",
    category: "Reading List",
    date: "May 12, 2026",
    readTime: "4 min read",
    excerpt:
      "Our booksellers share the titles they can't stop recommending this season.",
  },
];

export default function BlogPage() {
  return (
    <>
      <PageHero
        eyebrow="The Readly Blog"
        icon={Newspaper}
        title="Stories about stories"
        subtitle="Reading lists, author interviews, and dispatches from the world of books — updated every week."
        breadcrumbItems={[{ label: "Blog" }]}
      />

      <section className="py-16 md:py-24">
        <PageContainer>
          <SectionTitle
            eyebrow="Latest Articles"
            title="From our editorial desk"
            align="left"
          />
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <article
                key={post.title}
                className="group flex flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg dark:border-slate-700 dark:bg-slate-800"
              >
                <span className="mb-3 inline-flex w-fit items-center rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-800 dark:bg-brand-900/30 dark:text-amber-300">
                  {post.category}
                </span>
                <h3 className="mb-2 text-lg font-semibold leading-snug text-slate-900 dark:text-white">
                  {post.title}
                </h3>
                <p className="mb-4 flex-1 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                  {post.excerpt}
                </p>
                <div className="mb-4 flex items-center gap-3 text-xs text-slate-500 dark:text-slate-400">
                  <span>{post.date}</span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5" />
                    {post.readTime}
                  </span>
                </div>
                <span className="inline-flex items-center gap-1 text-sm font-semibold text-brand-800 transition-transform duration-300 group-hover:translate-x-1 dark:text-amber-400">
                  Read Article <ArrowRight className="h-4 w-4" />
                </span>
              </article>
            ))}
          </div>
        </PageContainer>
      </section>

      <section className="pb-16 md:pb-24">
        <PageContainer>
          <CTASection
            title="Want more reading recommendations?"
            subtitle="Check out our YouTube featured video series or browse our full catalog."
            primaryLabel="Watch Featured Video"
            primaryHref="/featured-video"
            secondaryLabel="Back to Home"
            secondaryHref="/"
          />
        </PageContainer>
      </section>
    </>
  );
}
