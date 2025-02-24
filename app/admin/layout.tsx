"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  Calendar, 
  Users, 
  Settings, 
  LogOut,
  Menu,
  X,
  ChevronRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const pathname = usePathname();

  const navigation = [
    { name: "イベント管理", href: "/admin/events", icon: Calendar },
    { name: "申込者一覧", href: "/admin/applicants", icon: Users },
    { name: "設定", href: "/admin/settings", icon: Settings },
  ];

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
              className="mr-4 md:hidden"
            >
              {isSidebarOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
            <h1 className="text-xl font-bold">
              <a href="/admin">街コンポータル 管理画面</a>
            </h1>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-600 hidden sm:inline">管理者: Admin</span>
            <Button variant="ghost" size="icon">
              <LogOut className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>

      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed left-0 top-16 h-[calc(100vh-4rem)] w-64 bg-white border-r transition-transform duration-200 ease-in-out z-50",
          isSidebarOpen ? "translate-x-0" : "-translate-x-full",
          "md:translate-x-0" // Always show on desktop
        )}
      >
        <nav className="p-4">
          <div className="space-y-1">
            {navigation.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium",
                    pathname === item.href
                      ? "bg-primary text-white"
                      : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                  )}
                  onClick={() => setIsSidebarOpen(false)}
                >
                  <div className="flex items-center">
                    <Icon className="h-5 w-5 mr-3" />
                    <span>{item.name}</span>
                  </div>
                  <ChevronRight className="h-4 w-4" />
                </Link>
              );
            })}
          </div>
        </nav>
      </aside>

      {/* Main Content */}
      <main
        className={cn(
          "pt-16 transition-margin duration-200 ease-in-out",
          "md:ml-64" // Always indent on desktop
        )}
      >
        {children}
      </main>
    </div>
  );
}