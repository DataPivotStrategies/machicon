"use client";

import { Card } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { ja } from "date-fns/locale";
import { parse } from "date-fns";

interface EventCalendarProps {
  date: string;
}

export function EventCalendar({ date }: EventCalendarProps) {
  // 日付文字列をDate型に変換（例: "2024年4月1日（月）" → Date）
  const parsedDate = parse(date.split('（')[0], 'yyyy年M月d日', new Date());

  return (
    <Card className="p-4">
      <Calendar
        mode="single"
        selected={parsedDate}
        locale={ja}
        className="rounded-md"
        disabled={(date) => date < new Date()}
      />
    </Card>
  );
}