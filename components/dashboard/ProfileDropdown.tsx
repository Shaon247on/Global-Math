"use client";

import { useEffect, useState } from "react";
import { ChevronDown, LogOut, User } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { removeCookie } from "@/hooks/cookie";
import { useJwt } from "@/hooks/useJtw";
import { toast } from "sonner";

const ProfileDropdown = () => {
  const pathname = usePathname();
  const user = useJwt();
  const [mounted, setMounted] = useState(false);
  const isProfilePage = pathname === "/dashboard/settings";

  // Prevent hydration mismatch
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  const handleLogout = () => {
    toast.success("Logged out successfully");
    removeCookie("access_token");
    removeCookie("refresh_token");
    window.location.href = "/";
  };

  // Show skeleton/fallback during SSR
  if (!mounted) {
    return (
      <Button variant="outline" className="px-2 py-6 border border-black">
        <Avatar className="h-10 w-10">
          <AvatarFallback />
        </Avatar>
        <span className="text-lg hidden md:block ml-2">Loading...</span>
        <ChevronDown className="h-5 w-5 ml-2" />
      </Button>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className={`relative px-2 py-6 border ${
            isProfilePage ? "bg-[#52B1FF] text-white border-none" : "text-black border-black"
          }`}
        >
          <Avatar className="h-10 w-10">
            <AvatarImage
              src={user?.profile_pic || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop"}
              alt="Profile"
            />
            <AvatarFallback>
              {user?.full_name ? user.full_name.split(" ").map(n => n[0]).join("") : "U"}
            </AvatarFallback>
          </Avatar>
          <h4 className="text-lg hidden md:block ml-2">
            {user?.full_name || "User"}
          </h4>
          <ChevronDown className="h-5 w-5 ml-2" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-48" align="end">
        <DropdownMenuItem asChild>
          <Link href="/dashboard/settings" className="cursor-pointer">
            <User className="mr-2 h-4 w-4" />
            <span>Profile</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleLogout} className="cursor-pointer">
          <LogOut className="mr-2 h-4 w-4" />
          <span>Logout</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ProfileDropdown;