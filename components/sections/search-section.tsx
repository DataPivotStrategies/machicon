"use client";

import { SearchButton } from "@/components/search-button";
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

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
  const [date, setDate] = useState<Date | null>(null);
  const [participants, setParticipants] = useState("");

  // --- モバイル用モーダルの開閉管理 ---
  const [isAreaModalOpen, setIsAreaModalOpen] = useState(false);
  const [isDateModalOpen, setIsDateModalOpen] = useState(false);
  const [isParticipantsModalOpen, setIsParticipantsModalOpen] = useState(false);

  const handleSearch = () => {
    const queryParams = new URLSearchParams({
      area,
      date: date ? date.toISOString().split("T")[0] : "",
      participants,
    }).toString();

    console.log("検索パラメータ:", { area, date, participants });
    // 例: fetch(`/api/search?${queryParams}`)
  };

  // 選択された値の表示用
  const areaLabel = area || "どこでも";
  const dateLabel = date ? date.toLocaleDateString("ja-JP") : "週の指定なし";
  const participantsLabel = participants ? `${participants}名` : "ゲストを追加";

  return (
    <div className="sticky top-16 z-30 bg-white border-b">
      <div className="container mx-auto px-4 py-4">
        <div className="max-w-5xl mx-auto">
          {/* デスクトップ表示（md 以上） */}
          <div className="hidden md:block">
            <div className="bg-white rounded-full shadow-lg border divide-x">
              <div className="grid grid-cols-3">
                {/* --- エリア 選択 --- */}
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
                {/* --- 日付 選択 --- */}
                <div className="p-4 text-left hover:bg-gray-50">
                  <div className="text-sm font-semibold text-gray-800">開催日</div>
                  <DatePicker
                    selected={date}
                    onChange={(date: Date | null) => setDate(date)}
                    className="text-gray-500 bg-transparent border-none focus:outline-none w-full"
                    dateFormat="yyyy/MM/dd"
                    placeholderText="開催日を選択"
                  />
                </div>
                {/* --- 参加人数 + 検索 --- */}
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

          {/* モバイル表示（md 未満） */}
          <div className="block md:hidden">
            <div className="bg-white rounded-full shadow-lg border px-4 py-2 flex items-center justify-between">
              <div className="text-sm font-semibold text-gray-800">行き先は？</div>
              {/* 選択された値の表示部分 */}
              <div className="ml-2 text-sm text-gray-500 flex gap-2">
                {/* --- エリアラベルをタップしたらモーダルを開く --- */}
                <span
                  onClick={() => setIsAreaModalOpen(true)}
                  className="cursor-pointer underline"
                >
                  {areaLabel}
                </span>
                <span>・</span>
                {/* --- 日付ラベルをタップしたらモーダルを開く --- */}
                <span
                  onClick={() => setIsDateModalOpen(true)}
                  className="cursor-pointer underline"
                >
                  {dateLabel}
                </span>
                <span>・</span>
                {/* --- 参加人数ラベルをタップしたらモーダルを開く --- */}
                <span
                  onClick={() => setIsParticipantsModalOpen(true)}
                  className="cursor-pointer underline"
                >
                  {participantsLabel}
                </span>
              </div>

              {/* 検索ボタン */}
              <div className="ml-auto">
                <SearchButton onClick={handleSearch} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* =========================
          以下、モバイル用モーダル群
      ========================= */}

      {/* エリア選択モーダル */}
      {isAreaModalOpen && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-sm rounded-lg p-4 relative">
            <h2 className="text-lg font-bold mb-2">エリアを選択</h2>
            <select
              className="w-full border p-2 rounded"
              value={area}
              onChange={(e) => setArea(e.target.value)}
            >
              <option value="">どこでも</option>
              {tokyoAreas.map((areaName) => (
                <option key={areaName} value={areaName}>
                  {areaName}
                </option>
              ))}
            </select>
            <div className="mt-4 flex justify-end">
              <button
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 mr-2"
                onClick={() => setIsAreaModalOpen(false)}
              >
                キャンセル
              </button>
              <button
                className="px-4 py-2 bg-coral text-white rounded hover:bg-coral-600"
                onClick={() => setIsAreaModalOpen(false)}
              >
                決定
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 日付選択モーダル */}
      {isDateModalOpen && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-sm rounded-lg p-4 relative">
            <h2 className="text-lg font-bold mb-2">開催日を選択</h2>
            <DatePicker
              selected={date}
              onChange={(dateValue: Date | null) => setDate(dateValue)}
              className="border p-2 w-full rounded"
              dateFormat="yyyy/MM/dd"
              placeholderText="開催日を選択"
              showPopperArrow={false}
              withPortal
            />
            <div className="mt-4 flex justify-end">
              <button
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 mr-2"
                onClick={() => setIsDateModalOpen(false)}
              >
                キャンセル
              </button>
              <button
                className="px-4 py-2 bg-coral text-white rounded hover:bg-coral-600"
                onClick={() => setIsDateModalOpen(false)}
              >
                決定
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 参加人数選択モーダル */}
      {isParticipantsModalOpen && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-sm rounded-lg p-4 relative">
            <h2 className="text-lg font-bold mb-2">参加人数</h2>
            <input
              type="number"
              className="border p-2 w-full rounded"
              placeholder="ゲストを追加"
              value={participants}
              onChange={(e) => setParticipants(e.target.value)}
            />
            <div className="mt-4 flex justify-end">
              <button
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 mr-2"
                onClick={() => setIsParticipantsModalOpen(false)}
              >
                キャンセル
              </button>
              <button
                className="px-4 py-2 bg-coral text-white rounded hover:bg-coral-600"
                onClick={() => setIsParticipantsModalOpen(false)}
              >
                決定
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
