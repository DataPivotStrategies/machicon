"use client";

import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Search, Users } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function SearchHeader() {
  return (
    <div className="w-full max-w-4xl mx-auto -mt-8 relative z-10">
      <div className="bg-white rounded-lg shadow-lg p-4">
        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">エリア</label>
            <Select>
              <SelectTrigger className="w-full">
                <div className="flex items-center">
                  <MapPin className="w-4 h-4 mr-2 text-gray-500" />
                  <SelectValue placeholder="エリアを選択" />
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="shibuya">渋谷</SelectItem>
                <SelectItem value="shinjuku">新宿</SelectItem>
                <SelectItem value="ikebukuro">池袋</SelectItem>
                <SelectItem value="roppongi">六本木</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">開催日</label>
            <Select>
              <SelectTrigger className="w-full">
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 mr-2 text-gray-500" />
                  <SelectValue placeholder="開催日を選択" />
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="today">本日</SelectItem>
                <SelectItem value="tomorrow">明日</SelectItem>
                <SelectItem value="weekend">今週末</SelectItem>
                <SelectItem value="nextweek">来週</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">参加人数</label>
            <Select>
              <SelectTrigger className="w-full">
                <div className="flex items-center">
                  <Users className="w-4 h-4 mr-2 text-gray-500" />
                  <SelectValue placeholder="0" />
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">1人</SelectItem>
                <SelectItem value="2">2人</SelectItem>
                <SelectItem value="3">3人</SelectItem>
                <SelectItem value="4">4人以上</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="mt-4 flex justify-end">
          <Button className="bg-pink-600 hover:bg-pink-700">
            <Search className="w-4 h-4 mr-2" />
            検索する
          </Button>
        </div>
      </div>
    </div>
  );
}