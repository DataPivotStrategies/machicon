import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"

interface AreaCardProps {
  area: {
    name: string
    image: string
    count: number
  }
}

export function AreaCard({ area }: AreaCardProps) {
  return (
    <Card className="group cursor-pointer overflow-hidden">
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
  )
}