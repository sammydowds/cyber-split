"use client";
import { ReactNode } from "react";
import { useRouter } from "next/router";
import * as React from "react";
import Image from "next/image";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";

interface DashboardSidebarProps {
  children?: ReactNode;
}
export const DashboardSidebar = ({ children }: DashboardSidebarProps) => {
  const router = useRouter();
  const crumbs = router.query.slug as string[];
  const { setOpenMobile } = useSidebar();

  const handleSidebar = (open: boolean) => {
    setOpenMobile(open);
  };

  return (
    <>
      <Sidebar>
        <SidebarHeader className="p-0">
          <div className="h-[60px] flex items-center text-lg py-4 px-2 relative">
            <div className="h-[30px] w-[165px] relative overflow-hidden rounded">
              <Image src="/logo.png" alt="logo" fill />
            </div>
          </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarMenu className="gap-2">
              <SidebarMenuItem className="hover:bg-none">
                <SidebarMenuButton
                  isActive={crumbs?.includes("home")}
                  onClick={() => {
                    handleSidebar(false);
                    router.push("/dashboard");
                  }}
                  className="text-lg"
                >
                  Home
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  isActive={crumbs?.includes("profile")}
                  onClick={() => {
                    handleSidebar(false);
                    router.push("/dashboard/profile");
                  }}
                  className="text-lg"
                >
                  Profile
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroup>
        </SidebarContent>
        <SidebarRail />
      </Sidebar>
      <SidebarInset>
        <div className="flex h-[48px] shrink-0 items-center gap-2 px-4 bg-white fixed w-full border-b-[1px] z-[49]">
          <SidebarTrigger className="-ml-1" />
        </div>
        <div className="flex flex-1 flex-col gap-4">{children}</div>
      </SidebarInset>
    </>
  );
};
