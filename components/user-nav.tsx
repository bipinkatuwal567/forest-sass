"use client";
import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import { navItems } from "./DashboardNav";
import Link from "next/link";
import { LogOut } from "lucide-react";
import { KindeUser } from "@kinde-oss/kinde-auth-nextjs/types";

interface UserNavProps {
  user: KindeUser | null;
}

export default function UserNav({ user }: UserNavProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="cursor-pointer">
          <AvatarImage src={user?.picture} />
          <AvatarFallback>{user?.given_name}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel>
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">
              {user?.given_name}
            </p>
            <p className="text-xs leading-none text-muted-foreground">
              {user?.email}
            </p>
          </div>
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          {navItems.map((item, index) => {
            return (
              <DropdownMenuItem asChild key={index}>
                <Link
                  href={item.href}
                  className="w-full flex justify-between items-center"
                >
                  <span>{item.label}</span>
                  <item.icon className="w-4 h-4" />
                </Link>
              </DropdownMenuItem>
            );
          })}
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        <DropdownMenuItem>
          <LogoutLink className="w-full">
            <Button className="rounded-md cursor-pointer w-full">
              Log out{" "}
              <span>
                {" "}
                <LogOut className="w-4 h-4 ml-2" />{" "}
              </span>
            </Button>
          </LogoutLink>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
