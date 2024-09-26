"use client";

import {
  BookOpenText,
  Check,
  Link,
  MoreHorizontal,
  OctagonX,
  Table as TableIcon,
  Trash,
  X,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
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
import { SplitDeep } from "@/types";
import { CADENCE_TO_DESCRIPTION_MAP } from "@/lib/programming/constants";
import { WorkoutMarker } from "./WorkoutMarker";
import { Badge } from "./ui/badge";
import React, { useState } from "react";
import { Dialog, DialogClose, DialogContent } from "@/components/ui/dialog";
import { SplitDetailsCard } from "./split-cards/SplitDetailsCard";
import { useDeactivateSplit } from "@/hooks/useDeactivateSplit";
import { useQueryClient } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { useActivateSplit } from "@/hooks/useActivateSplit";
import { useDeleteSplit } from "@/hooks/useDeleteSplit";

interface SplitTableProps {
  splits?: SplitDeep[];
  oneSplitIsActive?: boolean;
}
export const SplitTable = ({ splits, oneSplitIsActive }: SplitTableProps) => {
  const [selectedSpit, setSelectedSplit] = useState<SplitDeep | undefined>();
  const queryClient = useQueryClient();
  const [showModal, setShowModal] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  const copyToClipboard = async (id: string) => {
    try {
      await navigator.clipboard.writeText(
        `${window.location.origin}/share/${id}`,
      );
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 5000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };
  const { mutate: deativateSplit } = useDeactivateSplit({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["activeSplit"] });
      queryClient.invalidateQueries({ queryKey: ["allSplits"] });
    },
  });
  const { mutate: activateSplit } = useActivateSplit({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["activeSplit"] });
      queryClient.invalidateQueries({ queryKey: ["allSplits"] });
    },
  });
  const { mutate: deleteSplit } = useDeleteSplit({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["activeSplit"] });
      queryClient.invalidateQueries({ queryKey: ["allSplits"] });
    },
  });
  return (
    <div className="flex items-start p-4 mb-[120px] gap-6 max-xl:gap-4 max-md:px-0 mb-[365px] md:flex-wrap max-md:flex-col">
      <Dialog onOpenChange={setShowModal} open={showModal}>
        <DialogClose className="bg-white" />
        <DialogContent className="overflow-y-auto max-h-screen border-none px-0 py-[60px]">
          {selectedSpit ? <SplitDetailsCard split={selectedSpit} /> : null}
          <DialogClose className="absolute p-2 right-2 top-2 max-md:top-12 bg-stone-300 rounded-full opacity-90 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
            <X size={24} />
          </DialogClose>
        </DialogContent>
      </Dialog>
      <Card className="w-full max-w-[900px] overflow-hidden rounded-[6px]">
        <CardHeader className="bg-stone-100/80 py-[6px] px-[8px]">
          <CardTitle className="text-xs text-stone-700 flex items-center justify-between">
            <div className="flex items-center gap-[4px]">
              <TableIcon />
              Created Programs
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent className="px-0 mx-0 pb-0">
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
                <TableHead className="font-bold">Logged Workouts</TableHead>
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
                      <div className="flex items-center gap-[4px]">
                        {split.name ?? "Some Name"}
                        {split.active ? (
                          <Badge variant="outline">Active</Badge>
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
                    <TableCell>
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
                          <Button
                            aria-haspopup="true"
                            size="icon"
                            variant="ghost"
                          >
                            <MoreHorizontal className="h-4 w-4 rotate-90" />
                            <span className="sr-only">Toggle menu</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem
                            className="flex items-center gap-[4px]"
                            onClick={() => {
                              setSelectedSplit(split);
                              setShowModal(true);
                            }}
                          >
                            <BookOpenText
                              size={16}
                              className="text-stone-400"
                            />
                            Details
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            className="flex items-center gap-[4px]"
                            onClick={(e) => {
                              e.preventDefault();
                              copyToClipboard(split.id);
                            }}
                          >
                            {isCopied ? (
                              <motion.div
                                className="flex items-center gap-[4px]"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                              >
                                <span className="p-[2px] rounded-full bg-green-600">
                                  <Check size={12} color="white" />
                                </span>
                                Copied
                              </motion.div>
                            ) : (
                              <>
                                <Link size={12} className="text-stone-400" />
                                Copy Link
                              </>
                            )}
                          </DropdownMenuItem>
                          {split.active ? (
                            <DropdownMenuItem
                              className="flex items-center gap-[4px]"
                              onClick={() => deativateSplit({ id: split.id })}
                            >
                              <OctagonX size={14} className="text-red-500" />
                              Deactivate
                            </DropdownMenuItem>
                          ) : (
                            <DropdownMenuItem
                              disabled={oneSplitIsActive}
                              className="flex items-center gap-[4px]"
                              onClick={() => activateSplit({ id: split.id })}
                            >
                              <Zap size={14} fill="#86efac" strokeWidth={0} />
                              Activate
                            </DropdownMenuItem>
                          )}
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
        </CardContent>
        {!splits?.length ? (
          <CardFooter className="text-stone-500 flex items-center justify-center p-2 text-sm">
            No programs
          </CardFooter>
        ) : null}
      </Card>
    </div>
  );
};
