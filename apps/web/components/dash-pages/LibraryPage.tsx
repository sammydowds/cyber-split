"use client";

import {
  BookOpenText,
  Check,
  Link,
  MoreHorizontal,
  Octagon,
  Plus,
  Trash,
  X,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { SplitDeep } from "@repo/database";
import { CADENCE_TO_DESCRIPTION_MAP } from "@repo/database";
import { WorkoutMarker } from "../WorkoutMarker";
import { Badge } from "../ui/badge";
import React, { useState } from "react";
import { Dialog, DialogClose, DialogContent } from "@/components/ui/dialog";
import { useDeactivateSplit } from "@/hooks/useDeactivateSplit";
import { useQueryClient } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { useActivateSplit } from "@/hooks/useActivateSplit";
import { useDeleteSplit } from "@/hooks/useDeleteSplit";
import toast from "react-hot-toast";
import { useRouter } from "next/router";

interface LibraryPageProps {
  splits?: SplitDeep[];
  oneSplitIsActive?: boolean;
}
export const LibraryPage = ({ splits, oneSplitIsActive }: LibraryPageProps) => {
  const queryClient = useQueryClient();
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();

  const { mutate: activateSplit } = useActivateSplit({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["activeSplit"] });
      toast.success("Successfully Activated Split");
    },
  });
  const { mutate: deleteSplit } = useDeleteSplit({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["activeSplit"] });
      queryClient.invalidateQueries({ queryKey: ["allSplits"] });
    },
  });
  return (
    <div className="flex items-start justify-center px-4 max-md:px-0 mb-[365px] md:flex-wrap max-md:flex-col mt-8">
      <Dialog onOpenChange={setShowModal} open={showModal}>
        <DialogClose className="bg-white" />
        <DialogContent className="overflow-y-auto max-h-screen border-none px-0 py-[60px]">
          <DialogClose className="absolute p-2 right-4 top-12 bg-stone-300 rounded-full opacity-90 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
            <X size={24} />
          </DialogClose>
        </DialogContent>
      </Dialog>
      <div className="flex items-center justify-between w-full px-4">
        <div className="flex items-center gap-[4px] text-xl font-bold">
          Created Splits
        </div>
        <Button
          variant="outline"
          className="bg-white font-bold flex items-center gap-[4px]"
          onClick={() => router.push("/dashboard/library/create")}
        >
          <Plus size={16} />
          Create
        </Button>
      </div>
      <Table>
        <TableHeader className="text-xs">
          <TableRow>
            <TableHead className="font-bold">Name</TableHead>
            <TableHead className="hidden md:table-cell font-bold">
              Workouts
            </TableHead>
            <TableHead className="hidden md:table-cell font-bold">
              Cadence
            </TableHead>
            <TableHead className="hidden md:table-cell font-bold">
              Logged Workouts
            </TableHead>
            <TableHead className="hidden md:table-cell font-bold">
              Created
            </TableHead>
            <TableHead>
              <span className="sr-only">Actions</span>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {splits?.map((split) => {
            return (
              <TableRow key={split.id}>
                <TableCell>
                  <div className="flex items-center gap-[4px] font-bold">
                    {split.name ?? "Some Name"}
                    {split.active ? (
                      <Badge variant="outline" className="font-normal">
                        Active
                      </Badge>
                    ) : null}
                  </div>
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  <div className="flex flex-col items-start">
                    <div className="flex items-center gap-[2px]">
                      {split.workouts.map((w) => {
                        return <WorkoutMarker text={w.letterLabel} />;
                      })}
                    </div>
                  </div>
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  {CADENCE_TO_DESCRIPTION_MAP[split.type][split.cadence]}
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  {split?.loggedWorkouts?.length
                    ? split.loggedWorkouts.length
                    : "-"}
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  {new Date(split.created).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button aria-haspopup="true" size="icon" variant="ghost">
                        <MoreHorizontal className="h-4 w-4 rotate-90" />
                        <span className="sr-only">Toggle menu</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="min-w-[200px]">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        className="flex items-center gap-[4px]"
                        onClick={() => {
                          router.push(`/dashboard/library/details/${split.id}`);
                        }}
                      >
                        <BookOpenText size={14} className="text-stone-400" />
                        Details
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        disabled={oneSplitIsActive}
                        className="flex items-center gap-[4px]"
                        onClick={() => activateSplit(split)}
                      >
                        <Zap size={14} fill="#86efac" />
                        Activate
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="flex items-center gap-[4px] text-red-400"
                        onClick={() => {
                          deleteSplit({ id: split.id });
                        }}
                      >
                        <Trash size={16} />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};
