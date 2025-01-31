"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, Briefcase, Languages } from "lucide-react";

interface HostData {
  name: string;
  image: string;
  description: string;
  rating: number;
  reviewCount: number;
  yearsHosting: number;
  work: string;
  languages: string[];
}

interface EventHostProps {
  host: HostData;
}

export function EventHost({ host }: EventHostProps) {
  return (
    <Card className="p-6">
      <h2 className="text-2xl font-bold mb-6">主催者紹介</h2>
      
      <div className="flex items-start gap-6 mb-6">
        <img
          src={host.image}
          alt={host.name}
          className="w-24 h-24 rounded-full object-cover"
        />
        <div className="flex-1">
          <h3 className="text-2xl font-bold mb-1">{host.name}</h3>
          <div className="flex items-center gap-4 mb-2">
            <Badge variant="secondary" className="text-pink-600 bg-pink-50">
              スーパーホスト
            </Badge>
          </div>
          <div className="flex gap-6">
            <div>
              <div className="text-2xl font-bold">{host.reviewCount}</div>
              <div className="text-gray-600">レビュー</div>
            </div>
            <div>
              <div className="text-2xl font-bold flex items-center">
                {host.rating} <Star className="h-5 w-5 fill-yellow-400 text-yellow-400 ml-1" />
              </div>
              <div className="text-gray-600">評価</div>
            </div>
            <div>
              <div className="text-2xl font-bold">{host.yearsHosting}</div>
              <div className="text-gray-600">年間開催</div>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Briefcase className="h-5 w-5 text-gray-500" />
          <span>職業: {host.work}</span>
        </div>
        <div className="flex items-center gap-2">
          <Languages className="h-5 w-5 text-gray-500" />
          <span>話せる言語: {host.languages.join(', ')}</span>
        </div>
      </div>

      <div className="mt-6">
        <p className="text-gray-600 leading-relaxed">{host.description}</p>
      </div>
    </Card>
  );
}