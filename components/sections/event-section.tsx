"use client"

import { EventCard } from "@/components/event-card"
import { events } from "@/lib/constants/events"

export function EventSection() {
  return (
    <section className="py-4 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {events.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      </div>
    </section>
  )
}