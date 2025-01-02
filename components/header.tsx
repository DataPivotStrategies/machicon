"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Heart, Menu } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { AuthModal } from "./auth/auth-modal"

export function Header() {
  const [showAuthModal, setShowAuthModal] = useState(false)
  const [authModalTab, setAuthModalTab] = useState<"login" | "register">("login")

  const handleAuthClick = (tab: "login" | "register") => {
    setAuthModalTab(tab)
    setShowAuthModal(true)
  }

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <Heart className="h-6 w-6 text-pink-500" />
            <span className="text-xl font-bold">街コンNavi</span>
          </Link>
          
          <div className="hidden md:flex items-center space-x-4">
            <Button 
              variant="default"
              onClick={() => handleAuthClick("register")}
            >
              会員登録
            </Button>
            <Button 
              variant="outline"
              onClick={() => handleAuthClick("login")}
            >
              ログイン
            </Button>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => handleAuthClick("register")}>
                会員登録
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleAuthClick("login")}>
                ログイン
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>

      <AuthModal 
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        defaultTab={authModalTab}
      />
    </>
  )
}