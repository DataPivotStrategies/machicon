"use client";

import { Card } from "@/components/ui/card";

interface ScheduleItem {
  time: string;
  description: string;
}

interface EventScheduleProps {
  items: ScheduleItem[];
}

export function EventSchedule({ items }: EventScheduleProps) {
  return (
    <Card className="p-6">
      <h2 className="text-xl font-bold mb-4">当日の流れ</h2>
      <div className="relative">
        <div className="absolute top-0 bottom-0 left-[39px] w-px bg-gray-200" />
        <div className="space-y-6">
          {items.map((item, i) => (
            <div key={i} className="flex items-start gap-6 relative">
              <div className="w-20 pt-0.5 text-sm text-gray-500">{item.time}</div>
              <div className="absolute left-[35px] top-2 w-2 h-2 rounded-full bg-gray-400 border-2 border-white" />
              <div className="flex-1 bg-white rounded-lg p-4 shadow-sm">
                {item.description}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}