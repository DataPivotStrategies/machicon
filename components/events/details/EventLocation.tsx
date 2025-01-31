"use client";

import { Card } from "@/components/ui/card";
import { MapPin } from "lucide-react";

interface LocationData {
  name: string;
  address: string;
  mapUrl: string;
}

interface EventLocationProps {
  location: LocationData;
}

export function EventLocation({ location }: EventLocationProps) {
  return (
    <Card className="p-6">
      <h2 className="text-xl font-bold mb-4">受付場所</h2>
      <div className="space-y-4">
        <div className="flex items-start gap-3">
          <MapPin className="h-5 w-5 text-gray-500 mt-1" />
          <div>
            <div className="font-medium">{location.name}</div>
            <div className="text-gray-600">{location.address}</div>
          </div>
        </div>
        <div className="aspect-video rounded-lg overflow-hidden">
          <iframe
            src={`${location.mapUrl}&output=embed`}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </Card>
  );
}