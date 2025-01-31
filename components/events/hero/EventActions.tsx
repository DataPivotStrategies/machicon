"use client";

import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import { SocialShare } from "./SocialShare";

interface EventActionsProps {
  isLiked: boolean;
  onLike: () => void;
}

export function EventActions({ isLiked, onLike }: EventActionsProps) {
  return (
    <div className="flex gap-2">
      <Button 
        variant="outline" 
        size="icon"
        onClick={onLike}
        className="bg-white/90"
      >
        <Heart className={`h-5 w-5 ${isLiked ? "fill-pink-500 text-pink-500" : ""}`} />
      </Button>
      <SocialShare />
    </div>
  );
}