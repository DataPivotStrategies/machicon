"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { SearchHeader } from "./SearchHeader";

export default function Header() {
  return (
    <div>
      <header className="sticky top-0 z-50 border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="text-pink-600 text-2xl font-bold">街コンポータル</Link>
          <div className="flex items-center gap-4">
            <Button variant="ghost">ログイン</Button>
            <Button className="bg-pink-600 hover:bg-pink-700">新規登録</Button>
          </div>
        </div>
      </header>
      <SearchHeader />
    </div>
  );
}