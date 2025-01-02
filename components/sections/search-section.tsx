"use client"

import { SearchButton } from "@/components/search-button"

export function SearchSection() {
  return (
    <div className="sticky top-16 z-30 bg-white border-b">
      <div className="container mx-auto px-4 py-4">
        <div className="max-w-5xl mx-auto">
          <div className="bg-white rounded-full shadow-lg border divide-x">
            <div className="grid grid-cols-1 md:grid-cols-3">
              <button className="p-4 text-left hover:bg-gray-50 rounded-l-full">
                <div className="text-sm font-semibold text-gray-800">エリア</div>
                <div className="text-gray-500">エリアを選択</div>
              </button>
              <button className="p-4 text-left hover:bg-gray-50">
                <div className="text-sm font-semibold text-gray-800">開催日</div>
                <div className="text-gray-500">日付を追加</div>
              </button>
              <div className="flex items-center">
                <button className="flex-1 p-4 text-left hover:bg-gray-50">
                  <div className="text-sm font-semibold text-gray-800">参加人数</div>
                  <div className="text-gray-500">ゲストを追加</div>
                </button>
                <SearchButton />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}