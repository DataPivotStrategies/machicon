"use client"

import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";

interface SearchButtonProps {
  onClick: () => void;
}

export function SearchButton({ onClick }: SearchButtonProps) {
  return (
    <Button
      size="icon"
      className="mr-2 rounded-full bg-coral hover:bg-coral-600"
      onClick={onClick}
    >
      <Search className="h-5 w-5" />
    </Button>
  );
}