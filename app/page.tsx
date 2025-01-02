import { SearchSection } from "@/components/sections/search-section"
import { CategorySection } from "@/components/sections/category-section"
import { EventSection } from "@/components/sections/event-section"
import { HeroSection } from "@/components/sections/hero-section"

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <HeroSection />
      <SearchSection />
      <CategorySection />
      <EventSection />
    </div>
  )
}