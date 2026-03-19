
import { Navbar } from '@/components/navbar';
import { HeroCarousel } from '@/components/hero-carousel';
import { CategoryGrid } from '@/components/category-grid';
import { FeaturedPosts } from '@/components/featured-posts';
import { ProductCatalog } from '@/components/product-catalog';
import { HistorySection } from '@/components/history-section';
import { OtherPosts } from '@/components/other-posts';
import { TeamContact } from '@/components/team-contact';
import { BlogTitleGenerator } from '@/components/blog-title-generator';
import { Footer } from '@/components/footer';
import { FadeIn } from '@/components/fade-in';

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navbar />

      <FadeIn className="py-16 text-center px-5">
        <h1 className="text-4xl md:text-6xl lg:text-8xl font-black tracking-tighter uppercase leading-[0.9]">
          Bem vindo ao blog <br className="hidden md:block" />
          <span className="text-accent">Fashion Girl</span>
        </h1>
      </FadeIn>

      <HeroCarousel />
      <CategoryGrid />
      <FeaturedPosts />
      <ProductCatalog />
      <HistorySection />
      <OtherPosts />
      <TeamContact />
      <BlogTitleGenerator />
      <Footer />
    </main>
  );
}
