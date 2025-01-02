import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"

const areas = [
  {
    name: "港区",
    image: "https://images.unsplash.com/photo-1542051841857-5f90071e7989?w=800&auto=format&fit=crop&q=60",
    count: 156
  },
  {
    name: "新宿区",
    image: "https://images.unsplash.com/photo-1542931287-023b922fa89b?w=800&auto=format&fit=crop&q=60",
    count: 89
  },
  {
    name: "渋谷区",
    image: "https://images.unsplash.com/photo-1542310503-ff8da9c02372?w=800&auto=format&fit=crop&q=60",
    count: 45
  }
]

export function PopularArea() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {areas.map((area) => (
        <Card key={area.name} className="group cursor-pointer overflow-hidden">
          <CardContent className="p-0 relative">
            <div className="relative aspect-[16/9]">
              <Image
                src={area.image}
                alt={`${area.name}のイメージ`}
                fill
                className="object-cover transition-transform group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/40" />
              <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
                <h3 className="text-2xl font-bold mb-1">{area.name}</h3>
                <p>{area.count}件のイベント</p>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}