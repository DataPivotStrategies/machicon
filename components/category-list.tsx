"use client"

import { Button } from "@/components/ui/button"
import { 
  Heart, Users, Coffee, Book, Globe, Brain, 
  Dumbbell, Smile, Palette, HandHeart, 
  Baby, Utensils, Gamepad, Dog, Leaf, 
  TrendingUp, Rocket, Music, Trophy, Share2
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
  { icon: Share2, label: "趣味の共有・サークル活動" },
  { icon: Trophy, label: "スポーツ観戦・応援" },
  { icon: Dog, label: "ペット交流" },
  { icon: Leaf, label: "環境・エコ活動" },
  { icon: TrendingUp, label: "投資・資産形成" },
  { icon: Rocket, label: "起業・スタートアップ" },
  { icon: Gamepad, label: "ゲーム・エンターテインメント" }
]

export function CategoryList() {
  return (
    <div className="mb-12">
      <h2 className="text-2xl font-bold mb-6">カテゴリーから探す</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
        {categories.map((category) => (
          <Button
            key={category.label}
            variant="outline"
            className="h-auto py-3 px-4 justify-start text-left hover:bg-muted/50"
          >
            <category.icon className="mr-2 h-4 w-4 flex-shrink-0" />
            <span className="truncate">{category.label}</span>
          </Button>
        ))}
      </div>
    </div>
  )
}