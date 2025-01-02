"use client";

import { SearchButton } from "@/components/search-button";
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"; // スタイルをインポート

// 東京の主要エリアリスト
const tokyoAreas = [
  "新宿",
  "渋谷",
  "銀座",
  "東京",
  "品川",
  "池袋",
  "上野",
  "六本木",
  "秋葉原",
  "浅草",
  "台場",
  "吉祥寺",
  "中野",
  "目黒",
  "赤坂",
  "恵比寿",
  "代官山",
  "原宿",
  "表参道",
  "神楽坂",
];

export function SearchSection() {
  const [area, setArea] = useState("");
  const [date, setDate] = useState<Date | null>(null); // Date型またはnull
  const [participants, setParticipants] = useState("");

  const handleSearch = () => {
    const queryParams = new URLSearchParams({
      area,
      date: date ? date.toISOString().split("T")[0] : "", // Dateを文字列に変換
      participants,
    }).toString();

    // ここでAPIを呼び出すか、検索処理を実行
    console.log("検索パラメータ:", { area, date, participants });
    // 例: fetch(`/api/search?${queryParams}`)
  };

  return (
    <div className="sticky top-16 z-30 bg-white border-b">
      <div className="container mx-auto px-4 py-4">
        <div className="max-w-5xl mx-auto">
          {/* デスクトップでは1つの背景、モバイルでは独立した背景 */}
          <div className="bg-white rounded-full shadow-lg border divide-x hidden md:block">
            <div className="grid grid-cols-3">
              <div className="p-4 text-left hover:bg-gray-50 rounded-l-full">
                <div className="text-sm font-semibold text-gray-800">エリア</div>
                <select
                  className="text-gray-500 bg-transparent border-none focus:outline-none w-full"
                  value={area}
                  onChange={(e) => setArea(e.target.value)}
                >
                  <option value="">エリアを選択</option>
                  {tokyoAreas.map((area) => (
                    <option key={area} value={area}>
                      {area}
                    </option>
                  ))}
                </select>
              </div>
              <div className="p-4 text-left hover:bg-gray-50">
                <div className="text-sm font-semibold text-gray-800">開催日</div>
                <DatePicker
                  selected={date}
                  onChange={(date: Date | null) => setDate(date)} // Date | null を受け取る
                  className="text-gray-500 bg-transparent border-none focus:outline-none w-full"
                  dateFormat="yyyy/MM/dd"
                  placeholderText="開催日を選択"
                />
              </div>
              <div className="flex items-center">
                <div className="flex-1 p-4 text-left hover:bg-gray-50">
                  <div className="text-sm font-semibold text-gray-800">参加人数</div>
                  <input
                    type="number"
                    className="text-gray-500 bg-transparent border-none focus:outline-none w-full"
                    placeholder="ゲストを追加"
                    value={participants}
                    onChange={(e) => setParticipants(e.target.value)}
                  />
                </div>
                <SearchButton onClick={handleSearch} />
              </div>
            </div>
          </div>

          {/* モバイルでは独立した背景 */}
          <div className="grid grid-cols-1 gap-4 md:hidden">
            <div className="bg-white rounded-full shadow-lg border p-4 text-left hover:bg-gray-50">
              <div className="text-sm font-semibold text-gray-800">エリア</div>
              <select
                className="text-gray-500 bg-transparent border-none focus:outline-none w-full"
                value={area}
                onChange={(e) => setArea(e.target.value)}
              >
                <option value="">エリアを選択</option>
                {tokyoAreas.map((area) => (
                  <option key={area} value={area}>
                    {area}
                  </option>
                ))}
              </select>
            </div>
            <div className="bg-white rounded-full shadow-lg border p-4 text-left hover:bg-gray-50">
              <div className="text-sm font-semibold text-gray-800">開催日</div>
              <DatePicker
                selected={date}
                onChange={(date: Date | null) => setDate(date)} // Date | null を受け取る
                className="text-gray-500 bg-transparent border-none focus:outline-none w-full"
                dateFormat="yyyy/MM/dd"
                placeholderText="開催日を選択"
                showPopperArrow={false} // モバイルでポップアップ矢印を非表示
                withPortal // モバイルでフルスクリーンのカレンダーを表示
              />
            </div>
            <div className="bg-white rounded-full shadow-lg border p-4 text-left hover:bg-gray-50">
              <div className="text-sm font-semibold text-gray-800">参加人数</div>
              <input
                type="number"
                className="text-gray-500 bg-transparent border-none focus:outline-none w-full"
                placeholder="ゲストを追加"
                value={participants}
                onChange={(e) => setParticipants(e.target.value)}
              />
              <SearchButton onClick={handleSearch} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}