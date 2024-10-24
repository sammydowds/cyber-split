import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Day } from "@repo/database";
import { cn } from "@/lib/utils";
import { WorkoutMarker } from "@/components/WorkoutMarker";
import { Moon } from "lucide-react";

interface MonthTableProps {
  weeks: Day[][];
}
export const MonthTable = ({ weeks }: MonthTableProps) => {
  return (
    <Table className="border-collapse">
      <TableHeader>
        <TableRow>
          <TableHead className="text-sm text-center">M</TableHead>
          <TableHead className="text-sm text-center">T</TableHead>
          <TableHead className="text-sm text-center">W</TableHead>
          <TableHead className="text-sm text-center">Th</TableHead>
          <TableHead className="text-sm text-center">F</TableHead>
          <TableHead className="text-sm text-center">Sa</TableHead>
          <TableHead className="text-sm text-center">Su</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {weeks?.map((week, idx) => {
          return (
            <TableRow key={idx} className="hover:bg-unset">
              {week.map((day) => {
                const skipDay = day.workout === "S";
                const restDay = day.workout === "X";
                const isToday =
                  new Date().toLocaleDateString() ===
                  day.date.toLocaleDateString();
                return (
                  <TableCell
                    className={cn(
                      "border-stone-200 border-[1px] p-0 w-[68px] h-[68px]",
                      isToday
                        ? "bg-gradient-to-t from-white from-30% to-stone-200"
                        : "",
                    )}
                    key={day.date.toLocaleDateString()}
                  >
                    <div className="flex flex-col items-center text-[12px] font-bold w-full h-full px-[4px]">
                      <div className="flex items-center gap-[2px] w-full">
                        {day.date.toLocaleDateString("en-us", {
                          day: "numeric",
                        })}
                      </div>
                      <div className="grow py-2 flex items-center">
                        {restDay || skipDay ? (
                          <Moon className="text-stone-200" size={18} />
                        ) : (
                          <WorkoutMarker text={day.workout} />
                        )}
                      </div>
                    </div>
                  </TableCell>
                );
              })}
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};
