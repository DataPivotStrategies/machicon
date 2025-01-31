"use client";

import { EventImage } from "./EventImage";
import { EventTitle } from "./EventTitle";
import { EventActions } from "./EventActions";

interface EventHeroProps {
  title: string;
  categories: string[];
  tags: string[];
  imageUrl: string;
  isLiked: boolean;
  onLike: () => void;
}

export function EventHero({ 
  title, 
  categories, 
  tags, 
  imageUrl, 
  isLiked, 
  onLike 
}: EventHeroProps) {
  return (
    <div className="mb-8">
      <div className="max-w-7xl mx-auto px-4">
        <EventImage imageUrl={imageUrl} />
        <div className="mt-6">
          <div className="flex justify-between items-start">
            <EventTitle title={title} categories={categories} tags={tags} />
            <EventActions isLiked={isLiked} onLike={onLike} />
          </div>
        </div>
      </div>
    </div>
  );
}