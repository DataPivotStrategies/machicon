"use client"

import { EventCard } from "@/components/event-card"

const events = [
  {
    id: 1,
    title: "渋谷で恋活ワイン会",
    date: "2024年2月14日(水) 19:00〜21:00",
    location: "渋谷区",
    price: {
      men: 6000,
      women: 4000
    },
    image: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=800&auto=format&fit=crop&q=60"
  },
  {
    id: 2,
    title: "代官山お洒落カフェ会",
    date: "2024年2月15日(木) 14:00〜16:00",
    location: "渋谷区",
    price: {
      men: 5000,
      women: 3500
    },
    image: "https://images.unsplash.com/photo-1445116572660-236099ec97a0?w=800&auto=format&fit=crop&q=60"
  },
  {
    id: 3,
    title: "新宿で週末友活パーティー",
    date: "2024年2月17日(土) 18:00〜20:00",
    location: "新宿区",
    price: {
      men: 5500,
      women: 3500
    },
    image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800&auto=format&fit=crop&q=60"
  },
  {
    id: 4,
    title: "銀座でプレミアム婚活パーティー",
    date: "2024年2月18日(日) 17:00〜19:00",
    location: "中央区",
    price: {
      men: 8000,
      women: 6000
    },
    image: "https://images.unsplash.com/photo-1470338950318-40320a722782?w=800&auto=format&fit=crop&q=60"
  }
]

export function EventGrid() {
  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold">開催予定のイベント</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {events.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
    </div>
  )
}