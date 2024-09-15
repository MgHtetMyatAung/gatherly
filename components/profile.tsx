"use client";

import { useRouter } from "next/navigation";
import { useGetEvents } from "@/lib/hooks/use-get-profile";
import { removeToken } from "@/lib/helper";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { User } from "lucide-react";

export default function ProfileDropdown() {
  const router = useRouter();
  const { data: profile, isLoading } = useGetEvents();

  const logoutHandle = () => {
    removeToken();
    router.push("/login");
  };

  if (isLoading) {
    return <Button variant="ghost" disabled><User className="mr-2 h-4 w-4" /> Loading...</Button>;
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost">
          <User className="mr-2 h-4 w-4" />
          {profile?.name || "Profile"}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onSelect={() => router.push("/my-events")}>
          My Events
        </DropdownMenuItem>
        <DropdownMenuItem onSelect={logoutHandle}>
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

