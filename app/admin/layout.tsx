"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  Calendar, 
  Users, 
  Settings, 
  LogOut,
  Menu,
  X
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b h-16 fixed w-full z-50">
        <div className="flex items-center justify-between h-full px-4">
          <div className="flex items-center">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="mr-4"
            >
              {isSidebarOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
            <h1 className="text-xl font-bold">街コンポータル 管理画面</h1>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-600">管理者: Admin</span>
            <Button variant="ghost" size="icon">
              <LogOut className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-16 h-[calc(100vh-4rem)] w-64 bg-white border-r transition-transform duration-200 ease-in-out ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <nav className="p-4">
          <div className="space-y-2">
            <Link
              href="/admin/events"
              className="flex items-center space-x-3 px-3 py-2 rounded-lg text-gray-600 hover:bg-gray-100 hover:text-gray-900"
            >
              <Calendar className="h-5 w-5" />
              <span>イベント管理</span>
            </Link>
            <Link
              href="/admin/applicants"
              className="flex items-center space-x-3 px-3 py-2 rounded-lg text-gray-600 hover:bg-gray-100 hover:text-gray-900"
            >
              <Users className="h-5 w-5" />
              <span>申込者一覧</span>
            </Link>
            <Link
              href="/admin/settings"
              className="flex items-center space-x-3 px-3 py-2 rounded-lg text-gray-600 hover:bg-gray-100 hover:text-gray-900"
            >
              <Settings className="h-5 w-5" />
              <span>設定</span>
            </Link>
          </div>
        </nav>
      </aside>

      {/* Main Content */}
      <main
        className={`pt-16 ${
          isSidebarOpen ? "ml-64" : "ml-0"
        } transition-margin duration-200 ease-in-out`}
      >
        {children}
      </main>
    </div>
  );
}