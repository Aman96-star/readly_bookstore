import { Play, BookOpen, Users2 } from "lucide-react";
import PageHero from "@/components/PageHero";
import PageContainer from "@/components/PageContainer";
import SectionTitle from "@/components/SectionTitle";
import CTASection from "@/components/CTASection";

export const metadata = {
  title: "YT Featured Video",
  description:
    "Watch our featured YouTube video and explore more from the Readly Bookstore channel — author interviews, shelf tours, and reading recommendations.",
};

const relatedVideos = [
  { title: "5 Books to Read Before You Turn 30", length: "9:42" },
  { title: "A Tour of Our Rare Books Room", length: "12:15" },
  { title: "How We Choose Our Monthly Staff Picks", length: "7:03" },
];

export default function FeaturedVideoPage() {
  return (
    <>
      <PageHero
        eyebrow="Featured Video"
        icon={Play}
        title="Watch our latest featured video"
        subtitle="Every month we sit down with authors, illustrators, and our own booksellers to talk about the stories behind the stories."
        breadcrumbItems={[{ label: "YT Featured Video" }]}
      />

      <section className="py-16 md:py-24">
        <PageContainer>
          <div className="mx-auto max-w-4xl">
            <div className="group relative flex aspect-video w-full items-center justify-center overflow-hidden rounded-3xl bg-gradient-to-br from-brand-900 via-brand-800 to-amber-800 shadow-lg">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.08)_1px,transparent_0)] bg-[size:22px_22px]"
              />
              <a
                href="https://www.youtube.com/@readlybookstore"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Watch the featured video on YouTube"
                className="relative flex h-20 w-20 items-center justify-center rounded-full bg-white/95 shadow-xl transition-transform duration-300 group-hover:scale-110 sm:h-24 sm:w-24"
              >
                <Play className="ml-1 h-9 w-9 text-brand-800 sm:h-10 sm:w-10" fill="currentColor" />
              </a>
              <span className="absolute bottom-5 left-5 rounded-full bg-black/50 px-3 py-1 text-xs font-medium text-white">
                Readly Bookstore · Featured
              </span>
            </div>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
                  "Why We Still Believe in Bookstores"
                </h2>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Readly Bookstore · 84K views
                </p>
              </div>
              <a
                href="https://www.youtube.com/@readlybookstore"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-red-600 px-5 py-2.5 text-sm font-semibold text-white transition-transform duration-300 hover:scale-105"
              >
                <Play className="h-4 w-4" />
                Subscribe on YouTube
              </a>
            </div>
            <p className="mt-4 text-slate-600 dark:text-slate-300">
              In this episode, our founders sit down to talk about why physical bookstores still
              matter in a digital world, how curation builds trust with readers, and what's next
              for the Readly community.
            </p>
          </div>
        </PageContainer>
      </section>

      <section className="bg-slate-50 py-16 md:py-24 dark:bg-slate-900/40">
        <PageContainer>
          <SectionTitle
            eyebrow="More From the Channel"
            title="Related videos you might enjoy"
            align="left"
          />
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {relatedVideos.map((video) => (
              <a
                key={video.title}
                href="https://www.youtube.com/@readlybookstore"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg dark:border-slate-700 dark:bg-slate-800"
              >
                <div className="relative flex aspect-video items-center justify-center bg-gradient-to-br from-brand-100 to-amber-100 dark:from-brand-900/30 dark:to-amber-900/20">
                  <Play className="h-10 w-10 text-brand-700 transition-transform duration-300 group-hover:scale-110 dark:text-amber-400" fill="currentColor" />
                  <span className="absolute bottom-2 right-2 rounded bg-black/60 px-1.5 py-0.5 text-xs font-medium text-white">
                    {video.length}
                  </span>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-slate-900 dark:text-white">{video.title}</h3>
                </div>
              </a>
            ))}
          </div>
        </PageContainer>
      </section>

      <section className="pb-16 md:pb-24">
        <PageContainer>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div className="flex items-start gap-4 rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-700 dark:bg-slate-800">
              <BookOpen className="h-6 w-6 flex-shrink-0 text-brand-700 dark:text-amber-400" />
              <div>
                <h3 className="font-semibold text-slate-900 dark:text-white">New episodes monthly</h3>
                <p className="text-sm text-slate-600 dark:text-slate-300">
                  Subscribe so you never miss an author interview or shelf tour.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4 rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-700 dark:bg-slate-800">
              <Users2 className="h-6 w-6 flex-shrink-0 text-brand-700 dark:text-amber-400" />
              <div>
                <h3 className="font-semibold text-slate-900 dark:text-white">Join the community</h3>
                <p className="text-sm text-slate-600 dark:text-slate-300">
                  Comment your book recommendations — we feature reader picks every quarter.
                </p>
              </div>
            </div>
          </div>
        </PageContainer>
      </section>

      <section className="pb-16 md:pb-24">
        <PageContainer>
          <CTASection
            title="Enjoyed the video?"
            subtitle="Explore the blog for more reading recommendations and behind-the-scenes stories."
            primaryLabel="Read the Blog"
            primaryHref="/blog"
          />
        </PageContainer>
      </section>
    </>
  );
}
