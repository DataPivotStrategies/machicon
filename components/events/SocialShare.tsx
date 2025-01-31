"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Share2, Instagram, Facebook, Twitter } from "lucide-react";

export default function SocialShare() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <Share2 className="h-5 w-5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>
          <Instagram className="mr-2 h-4 w-4" /> Instagramストーリー
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Instagram className="mr-2 h-4 w-4" /> Instagram投稿
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Twitter className="mr-2 h-4 w-4" /> X (Twitter)
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Facebook className="mr-2 h-4 w-4" /> Facebook
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}