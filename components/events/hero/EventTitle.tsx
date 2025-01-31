"use client";

import { Badge } from "@/components/ui/badge";

interface EventTitleProps {
  title: string;
  categories: string[];
  tags: string[];
}

export function EventTitle({ title, categories = [], tags = [] }: EventTitleProps) {
  return (
    <div>
      <div className="flex gap-2 mb-2">
        {categories?.map((category, i) => (
          <Badge key={i} variant="default" className="bg-pink-600">
            {category}
          </Badge>
        ))}
      </div>
      <h1 className="text-3xl font-bold text-gray-900 mb-4">{title}</h1>
      <div className="flex flex-wrap gap-2">
        {tags?.map((tag, i) => (
          <Badge key={i} variant="secondary">
            {tag}
          </Badge>
        ))}
      </div>
    </div>
  );
}