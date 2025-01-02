"use client"

import { Button } from "@/components/ui/button"
import { Search } from "lucide-react"

export function SearchForm() {
  return (
    <div className="max-w-5xl mx-auto -mb-8">
      <div className="bg-white rounded-full shadow-lg border divide-x">
        <div className="grid grid-cols-1 md:grid-cols-4">
          <button className="p-4 text-left hover:bg-gray-50 rounded-l-full">
            <div className="text-sm font-semibold text-gray-800">目的</div>
            <div className="text-gray-500">目的を選択</div>
          </button>
          <button className="p-4 text-left hover:bg-gray-50">
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
            <Button size="icon" className="mr-2 rounded-full bg-coral hover:bg-coral-600">
              <Search className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}