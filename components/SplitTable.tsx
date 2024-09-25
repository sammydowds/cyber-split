"use client";

import { MoreHorizontal } from "lucide-react";
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
import { CommentRatings } from "./ui/rating";
import { Badge } from "./ui/badge";

interface SplitTableProps {
  splits?: SplitDeep[];
}
export const SplitTable = ({ splits }: SplitTableProps) => {
  return (
    <Card className="mt-2 mb-[364px] md:mx-4 rounded-sm">
      <CardHeader>
        <CardTitle>Created Programs</CardTitle>
        <CardDescription>View the programs you have created.</CardDescription>
      </CardHeader>
      <CardContent className="px-0 mx-0 pb-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead className="hidden md:table-cell">Workouts</TableHead>
              <TableHead className="hidden md:table-cell">Cadence</TableHead>
              <TableHead className="hidden md:table-cell">
                Logged Workouts
              </TableHead>
              <TableHead className="hidden md:table-cell">Rating</TableHead>
              <TableHead className="hidden md:table-cell">Created</TableHead>
              <TableHead className="hidden md:table-cell">Notes</TableHead>
              <TableHead>
                <span className="sr-only">Actions</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {splits?.map((split) => (
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
                <TableCell>
                  <CommentRatings rating={3} />
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  {new Date(split.created).toLocaleDateString()}
                </TableCell>
                <TableCell className="hidden md:table-cell max-w-[300px]">
                  This split was hard, but not too bad. Should be done with more
                  weight on benchpress and should switch out triceps for second
                  time.
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button aria-haspopup="true" size="icon" variant="ghost">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Toggle menu</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuItem>View</DropdownMenuItem>
                      <DropdownMenuItem>Delete</DropdownMenuItem>
                      <DropdownMenuItem>Share</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
      {!splits?.length ? (
        <CardFooter className="text-stone-500 flex items-center justify-center">
          No programs created
        </CardFooter>
      ) : null}
    </Card>
  );
};
