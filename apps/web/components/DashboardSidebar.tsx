"use client";
import { ReactNode } from "react";
import { useRouter } from "next/router";
import * as React from "react";
import Image from "next/image";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarProvider,
  SidebarRail,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";
import { Badge } from "@/components/ui/badge";
import { ActiveSplitDeep, SplitDeep } from "@repo/database";

interface DashboardSidebarProps {
  allSplits?: SplitDeep[];
  activeSplit?: ActiveSplitDeep;
  children?: ReactNode;
}
export const DashboardSidebar = ({
  children,
  allSplits,
  activeSplit,
}: DashboardSidebarProps) => {
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
                  isActive={crumbs?.includes("active")}
                  onClick={() => {
                    handleSidebar(false);
                    router.push("/dashboard/active");
                  }}
                  className="text-lg"
                >
                  Active Split
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  isActive={crumbs?.includes("library")}
                  onClick={() => {
                    handleSidebar(false);
                    router.push("/dashboard/library");
                  }}
                  className="text-lg"
                >
                  Library
                </SidebarMenuButton>
                <SidebarMenuSub>
                  {allSplits?.map((split) => {
                    return (
                      <SidebarMenuSubItem>
                        <SidebarMenuSubButton
                          onClick={() => {
                            handleSidebar(false);
                            router.push(`/dashboard/details/${split.id}`);
                          }}
                        >
                          <span className="max-w-[145px] truncate">
                            {split.name}
                          </span>
                          {activeSplit?.split?.id === split.id ? (
                            <Badge variant="outline">Active</Badge>
                          ) : null}
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    );
                  })}
                </SidebarMenuSub>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  isActive={crumbs?.includes("log")}
                  onClick={() => {
                    handleSidebar(false);
                    router.push("/dashboard/log");
                  }}
                  className="text-lg"
                >
                  Log
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
          <Breadcrumb>
            <BreadcrumbList>
              {crumbs?.map((crumb, idx) => {
                const currentCrumbs = crumbs?.slice(0, idx + 1);
                const isLast = crumbs?.length === idx + 1;
                const url = "/dashboard/" + currentCrumbs?.join("/");
                return (
                  <>
                    <BreadcrumbItem className="">
                      {isLast ? (
                        <BreadcrumbPage className="capitalize text-black max-md:max-w-[75px] truncate">
                          {crumb}
                        </BreadcrumbPage>
                      ) : (
                        <>
                          <BreadcrumbLink
                            onClick={() => router.push(url)}
                            className="capitalize max-md:max-w-[75px] truncate hover:cursor-pointer"
                          >
                            {crumb}
                          </BreadcrumbLink>
                          <BreadcrumbSeparator />
                        </>
                      )}
                    </BreadcrumbItem>
                  </>
                );
              })}
            </BreadcrumbList>
          </Breadcrumb>
        </div>
        <div className="flex flex-1 flex-col gap-4">{children}</div>
      </SidebarInset>
    </>
  );
};
