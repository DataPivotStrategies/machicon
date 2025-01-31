"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Heart, Share2 } from "lucide-react";
import SocialShare from "./SocialShare";

interface EventHeaderProps {
  title: string;
  tags: string[];
  onLike: () => void;
  isLiked: boolean;
}

export default function EventHeader({ title, tags, onLike, isLiked }: EventHeaderProps) {
  return (
    <div className="mb-8">
      <div className="flex justify-between items-start mb-4">
        <h1 className="text-3xl font-bold">{title}</h1>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            size="icon"
            onClick={onLike}
          >
            <Heart className={`h-5 w-5 ${isLiked ? "fill-pink-500 text-pink-500" : ""}`} />
          </Button>
          <SocialShare />
        </div>
      </div>
      <div className="flex flex-wrap gap-2">
        {tags.map((tag, i) => (
          <Badge key={i} variant="secondary">{tag}</Badge>
        ))}
      </div>
    </div>
  );
}