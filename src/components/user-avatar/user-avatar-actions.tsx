"use client";

import { LogOut, Settings } from "lucide-react";
import { type User } from "next-auth";

import { logOut } from "@/actions/user-actions";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function UserAvatarActions({ user }: { user: User }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="focus:none fixed right-4 top-2 z-50">
        <Avatar className="shimmer size-8 cursor-pointer">
          <AvatarImage src={user.image || "https://github.com/shadcn.png"} />
          <AvatarFallback className="font-bold">{user.name?.[0]}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="mr-6 min-w-80 rounded-xl py-2">
        <DropdownMenuLabel>
          <div className="flex items-center gap-2">
            <Avatar className="shimmer size-7 cursor-pointer">
              <AvatarImage src={user.image || "https://github.com/shadcn.png"} />
              <AvatarFallback className="font-bold">{user.name?.[0]}</AvatarFallback>
            </Avatar>
            <span className="font- font-medium">{user.name}</span>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => logOut()}>
          <div className="flex items-center gap-4">
            <LogOut className="size-4" />
            <span>Sign out</span>
          </div>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <div className="flex items-center gap-4">
            <Settings className="size-4" />
            <span>Settings</span>
          </div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
