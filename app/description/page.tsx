"use client";

import { useState } from "react";
import Header from "@/components/layout/Header";
import { EventHero } from "@/components/events/hero/EventHero";
import { EventOverview } from "@/components/events/details/EventOverview";
import { EventRequirements } from "@/components/events/details/EventRequirements";
import { EventSchedule } from "@/components/events/details/EventSchedule";
import { EventFAQ } from "@/components/events/details/EventFAQ";
import { EventLocation } from "@/components/events/details/EventLocation";
import { EventProhibited } from "@/components/events/details/EventProhibited";
import { FloatingReservation } from "@/components/events/reservation/FloatingReservation";
import { EventHost } from "@/components/events/details/EventHost";
import { SearchHeader } from "@/components/layout/SearchHeader";

export default function Home() {
  const [isLiked, setIsLiked] = useState(false);

  const eventData = {
    title: "渋谷で気軽に出会える！20代中心の街コンパーティー",
    imageUrl: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac",
    categories: ["街コン", "恋活", "婚活"],
    tags: ["20代中心", "初参加歓迎", "飲み放題付き", "渋谷", "着席スタイル"],
    description: `20代を中心とした街コンイベントを開催いたします。
落ち着いた雰囲気の中で、素敵な出会いを見つけませんか？
初めての方でも安心してご参加いただけます。`,
    date: "2024年4月1日（月）",
    time: "19:00〜21:00",
    location: {
      name: "渋谷マルチスペース",
      address: "東京都渋谷区渋谷2-21-1",
      mapUrl: "https://maps.google.com/?q=35.658034,139.701636"
    },
    area: "渋谷",
    contactNumber: "090-XXXX-XXXX",
    capacity: "20名〜30名程度",
    menPrice: 6500,
    womenPrice: 4500,
    requirements: [
      { text: "20歳〜35歳までの独身の方" },
      { text: "身分証明書をお持ちの方" },
      { text: "規約に同意いただける方" },
    ],
    prohibited: [
      "暴力的な言動",
      "ナンパ行為",
      "営業・勧誘行為",
      "写真撮影",
      "連絡先の強要",
      "その他、他の参加者への迷惑行為"
    ],
    schedule: [
      { time: "19:00", description: "受付開始" },
      { time: "19:15", description: "イベント開始・自己紹介タイム" },
      { time: "19:45", description: "フリータイム" },
      { time: "20:30", description: "マッチングタイム" },
      { time: "21:00", description: "イベント終了" },
    ],
    host: {
      name: "街コンポータル運営事務局",
      image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c",
      description: "安心・安全な出会いの場を提供している街コン主催団体です。",
      rating: 4.83,
      reviewCount: 790,
      yearsHosting: 7,
      work: "イベント運営",
      languages: ["日本語"]
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* <Header /> */}
      <SearchHeader/>
      <EventHero
        title={eventData.title}
        categories={eventData.categories}
        tags={eventData.tags}
        imageUrl={eventData.imageUrl}
        isLiked={isLiked}
        onLike={() => setIsLiked(!isLiked)}
      />

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex gap-8">
          <div className="flex-1 max-w-3xl">
            <div className="space-y-8">
              <EventOverview description={eventData.description} />
              <EventSchedule items={eventData.schedule} />
              <EventRequirements requirements={eventData.requirements} />
              <EventLocation location={eventData.location} />
              <EventProhibited items={eventData.prohibited} />
              <EventHost host={eventData.host} />
              <EventFAQ />
            </div>
          </div>

          <div className="w-[380px]">
            <div className="sticky top-24">
              <FloatingReservation
                menPrice={eventData.menPrice}
                womenPrice={eventData.womenPrice}
                date={eventData.date}
                time={eventData.time}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}