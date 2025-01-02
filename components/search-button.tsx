"use client"

import { Button } from "@/components/ui/button"
import { Search } from "lucide-react"

export function SearchButton() {
  return (
    <Button size="icon" className="mr-2 rounded-full bg-primary hover:bg-primary/90">
      <Search className="h-5 w-5" />
    </Button>
  )
}