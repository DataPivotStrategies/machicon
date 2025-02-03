"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Heart, Share2, MapPin, Calendar, Users } from "lucide-react"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

interface EventCardProps {
  event: {
    id: number
    title: string
    date: string
    location: string
    price: {
      men: number
      women: number
    }
    image: string
  }
}

export function EventCard({ event }: EventCardProps) {
  return (
    <Card className="overflow-hidden">
      <div className="relative aspect-[4/3]">
        <Image
          src={event.image}
          alt={event.title}
          fill
          className="object-cover"
        />
        <div className="absolute top-4 right-4 flex space-x-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="secondary" size="icon" className="bg-white/90 hover:bg-white">
                  <Heart className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>お気に入りに追加</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="secondary" size="icon" className="bg-white/90 hover:bg-white">
                  <Share2 className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>シェアする</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
      <CardContent className="p-4">
        <h3 className="text-xl font-semibold mb-2">{event.title}</h3>
        <div className="space-y-2 text-sm text-gray-600">
          <div className="flex items-center">
            <Calendar className="h-4 w-4 mr-2" />
            {event.date}
          </div>
          <div className="flex items-center">
            <MapPin className="h-4 w-4 mr-2" />
            {event.location}
          </div>
          <div className="flex items-center">
            <Users className="h-4 w-4 mr-2" />
            男性: {event.price.men.toLocaleString()}円 / 女性: {event.price.women.toLocaleString()}円
          </div>
        </div>
      </CardContent>
      {/* <CardFooter className="p-4 pt-0">
        <Button className="w-full">詳細を見る</Button>
      </CardFooter> */}
    </Card>
  )
}