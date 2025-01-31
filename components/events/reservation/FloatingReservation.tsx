"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface FloatingReservationProps {
  menPrice: number;
  womenPrice: number;
  date: string;
  time: string;
}

export function FloatingReservation({
  menPrice,
  womenPrice,
  date,
  time
}: FloatingReservationProps) {
  return (
    <Card className="p-6 shadow-lg">
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold mb-4">参加費</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">男性</span>
              <span className="text-xl font-bold">¥{menPrice.toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">女性</span>
              <span className="text-xl font-bold">¥{womenPrice.toLocaleString()}</span>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4">開催日時</h3>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">日付</span>
              <span>{date}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">時間</span>
              <span>{time}</span>
            </div>
          </div>
        </div>

        <Button className="w-full bg-pink-600 hover:bg-pink-700 text-lg py-6">
          予約する
        </Button>

        <p className="text-sm text-gray-500 text-center">
          まだ請求は発生しません
        </p>
      </div>
    </Card>
  );
}