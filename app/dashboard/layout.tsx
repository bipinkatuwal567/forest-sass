import DashboardNav from "@/components/DashboardNav";
import { ReactNode } from "react";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="flex flex-col space-y-6 mt-10">
      <div className="container grid flex-1 gap-12 md:grid-cols-[200px_1fr]">
        <aside className="hidden w-[200px] md:flex flex-col">
            <DashboardNav />
        </aside>
        <main>{children}</main>
      </div>
    </div>
  );
}
