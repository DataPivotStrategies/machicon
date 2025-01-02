"use client"

import { useState } from "react"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"
import { categories } from "@/lib/constants/categories"

export function CategorySection() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  return (
    <div className="sticky top-32 z-20 bg-white border-b py-4">
      <div className="container mx-auto px-4">
        <ScrollArea className="w-full whitespace-nowrap">
          <div className="flex space-x-8">
            {categories.map((category) => (
              <Button
                key={category.label}
                variant="ghost"
                className={`flex-shrink-0 flex flex-col items-center space-y-2 h-auto py-3 hover:bg-transparent ${
                  selectedCategory === category.label ? "text-primary" : ""
                }`}
                onClick={() => setSelectedCategory(
                  selectedCategory === category.label ? null : category.label
                )}
              >
                <category.icon className="h-6 w-6" />
                <span className="text-xs">{category.label}</span>
              </Button>
            ))}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>
    </div>
  )
}