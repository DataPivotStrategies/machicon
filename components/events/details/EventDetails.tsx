"use client";

import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { MapPin, Phone, Users, Calendar, Clock } from "lucide-react";

interface EventDetailsProps {
  date: string;
  time: string;
  location: string;
  area: string;
  contactNumber: string;
  capacity: string;
  menPrice: number;
  womenPrice: number;
}

export function EventDetails({
  date,
  time,
  location,
  area,
  contactNumber,
  capacity,
  menPrice,
  womenPrice,
}: EventDetailsProps) {
  const details = [
    { icon: Calendar, label: "開催日", value: date },
    { icon: Clock, label: "開催時間", value: time },
    { icon: MapPin, label: "会場", value: location },
    { icon: MapPin, label: "エリア", value: area },
    { icon: Phone, label: "当日の連絡先", value: contactNumber },
    { icon: Users, label: "規模", value: capacity },
  ];

  return (
    <Card className="p-6">
      <h2 className="text-xl font-bold mb-4">イベント詳細</h2>
      <div className="space-y-4">
        {details.map((detail, i) => (
          <div key={i} className="flex items-start gap-3">
            <detail.icon className="h-5 w-5 text-gray-500 mt-0.5" />
            <div>
              <div className="text-sm text-gray-500">{detail.label}</div>
              <div>{detail.value}</div>
            </div>
          </div>
        ))}
      </div>
      <Separator className="my-4" />
      <div className="space-y-2">
        <h3 className="font-semibold">参加費</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <div className="text-sm text-gray-500">男性</div>
            <div className="text-xl font-bold">¥{menPrice.toLocaleString()}</div>
          </div>
          <div>
            <div className="text-sm text-gray-500">女性</div>
            <div className="text-xl font-bold">¥{womenPrice.toLocaleString()}</div>
          </div>
        </div>
      </div>
    </Card>
  );
}