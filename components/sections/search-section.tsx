"use client";

import { SearchButton } from "@/components/search-button";
import { useState } from "react";

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
  const [date, setDate] = useState("");
  const [participants, setParticipants] = useState("");

  const handleSearch = () => {
    const queryParams = new URLSearchParams({
      area,
      date,
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
          <div className="bg-white rounded-full shadow-lg border divide-x">
            <div className="grid grid-cols-1 md:grid-cols-3">
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
                <input
                  type="date"
                  className="text-gray-500 bg-transparent border-none focus:outline-none w-full"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
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
        </div>
      </div>
    </div>
  );
}