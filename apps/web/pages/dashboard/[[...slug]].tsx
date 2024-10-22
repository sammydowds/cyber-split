"use client";
import { useActiveScheduledSplit } from "@/hooks/useActiveScheduledSplit";
import { useState } from "react";
import { useProfile } from "@/hooks/useProfile";
import { useRouter } from "next/router";
import toast from "react-hot-toast";
import { useSplits } from "@/hooks/useSplits";
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
} from "@/components/ui/sidebar";
import { DashContentRouter } from "@/components/dash-pages/DashContentRouter";
import { Badge } from "@/components/ui/badge";

export default function Dashboard() {
  const { data: activeSplit, isPending: loadingActiveScheduledSplit } =
    useActiveScheduledSplit();
  const { data: profile, isPending: loadingProfile } = useProfile();
  const { data: allSplits, isPending: loadingAllSplits } = useSplits();
  const router = useRouter();
  const crumbs = router.query.slug as string[];

  if (!profile && !loadingProfile) {
    toast.error("You have been logged out.");
    router.push("/login");
  }

  return (
    <main className="w-full">
      <SidebarProvider
        style={
          {
            "--sidebar-width": "19rem",
            overflow: "hidden",
          } as React.CSSProperties
        }
      >
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
                    onClick={() => router.push("/dashboard/active")}
                  >
                    Active Programming
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton
                    onClick={() => router.push("/dashboard/library")}
                  >
                    Library
                  </SidebarMenuButton>
                  <SidebarMenuSub>
                    {allSplits?.map((split) => {
                      return (
                        <SidebarMenuSubItem>
                          <SidebarMenuSubButton
                            onClick={() =>
                              router.push(
                                `/dashboard/library/details/${split.id}`,
                              )
                            }
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
                    onClick={() => router.push("/dashboard/profile")}
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
                  const isLast = crumbs.length === idx + 1;
                  const url = "/dashboard/" + currentCrumbs.join("/");
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
          <div className="flex flex-1 flex-col gap-4 p-4 pt-0 mt-[50px]">
            <div className="py-8">
              {!loadingActiveScheduledSplit &&
              !loadingAllSplits &&
              !loadingProfile ? (
                <DashContentRouter
                  activeSplit={activeSplit}
                  allSplits={allSplits ?? []}
                  profile={profile}
                />
              ) : null}
            </div>
          </div>
        </SidebarInset>
      </SidebarProvider>
    </main>
  );
}
