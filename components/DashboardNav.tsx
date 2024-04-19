"use client";

import { cn } from "@/lib/utils";
import { CreditCard, Home, Settings } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

export const navItems = [
  { label: "Home", href: "/dashboard", icon: Home },
  { label: "Settings", href: "/dashboard/settings", icon: Settings },
  { label: "Billing", href: "/dashboard/billing", icon: CreditCard },
];

const DashboardNav = () => {
  const pathName = usePathname();

  return (
    <nav className="grid items-center gap-2">
      {navItems.map((item, index) => {
        return (
          <Link href={item.href} key={index}>
            <span
              className={cn(
                "group text-sm flex items-center px-3 py-2 rounded-md font-medium hover:bg-accent hover:text-accent-foreground",
                pathName === item.href ? "bg-accent" : "bg-transparent"
              )}
            >
              <item.icon className="mr-2 h-6 w-6 text-primary" />
              <span>{item.label}</span>
            </span>
          </Link>
        );
      })}
    </nav>
  );
};

export default DashboardNav;
