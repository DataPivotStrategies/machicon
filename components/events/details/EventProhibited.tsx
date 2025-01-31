"use client";

import { Card } from "@/components/ui/card";
import { XCircle } from "lucide-react";

interface EventProhibitedProps {
  items: string[];
}

export function EventProhibited({ items }: EventProhibitedProps) {
  return (
    <Card className="p-6">
      <h2 className="text-xl font-bold mb-4">禁止事項</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {items.map((item, i) => (
          <div key={i} className="flex items-center gap-2 text-red-600">
            <XCircle className="h-5 w-5 flex-shrink-0" />
            <span>{item}</span>
          </div>
        ))}
      </div>
    </Card>
  );
}