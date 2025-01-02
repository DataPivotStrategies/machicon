"use client"

import { useState } from "react"
import { ScrollArea, ScrollBar } from "./ui/scroll-area"
import { Button } from "./ui/button"
import { 
  Heart, Users, Coffee, Book, Globe, Brain, 
  Dumbbell, Smile, Palette, HandHeart, 
  Baby, Utensils, Gamepad, Dog, Leaf, 
  TrendingUp, Rocket, Music, Trophy
} from "lucide-react"

const categories = [
  { icon: Heart, label: "恋活" },
  { icon: Users, label: "婚活" },
  { icon: Coffee, label: "友達作り" },
  { icon: Music, label: "趣味仲間探し" },
  { icon: Globe, label: "語学・国際交流" },
  { icon: Brain, label: "自己啓発・スキルアップ" },
  { icon: Dumbbell, label: "健康・フィットネス" },
  { icon: Smile, label: "リラクゼーション・癒し" },
  { icon: Palette, label: "文化・芸術体験" },
  { icon: HandHeart, label: "ボランティア・社会貢献" },
  { icon: Baby, label: "家族・子育て支援" },
  { icon: Utensils, label: "グルメ・食体験" },
  { icon: Book, label: "趣味の共有・サークル活動" },
  { icon: Trophy, label: "スポーツ観戦・応援" },
  { icon: Dog, label: "ペット交流" },
  { icon: Leaf, label: "環境・エコ活動" },
  { icon: TrendingUp, label: "投資・資産形成" },
  { icon: Rocket, label: "起業・スタートアップ" },
  { icon: Gamepad, label: "ゲーム・エンターテインメント" }
]

export function EventList() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  return (
    <ScrollArea className="w-full whitespace-nowrap">
      <div className="flex space-x-4">
        {categories.map((category) => (
          <Button
            key={category.label}
            variant="ghost"
            className={`flex-shrink-0 ${
              selectedCategory === category.label ? "text-coral" : ""
            }`}
            onClick={() => setSelectedCategory(
              selectedCategory === category.label ? null : category.label
            )}
          >
            <category.icon className="mr-2 h-4 w-4" />
            {category.label}
          </Button>
        ))}
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  )
}