"use client"

import { AreaCard } from "@/components/area-card"
import { areas } from "@/lib/constants/areas"

export function PopularAreaSection() {
  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold mb-8">人気エリア</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {areas.map((area) => (
            <AreaCard key={area.name} area={area} />
          ))}
        </div>
      </div>
    </section>
  )
}