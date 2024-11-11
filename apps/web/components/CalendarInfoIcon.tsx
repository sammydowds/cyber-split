interface CalendarInfoIconProps {
  date: Date | string;
}
export const CalendarInfoIcon = ({ date }: CalendarInfoIconProps) => {
  const d = new Date(date);
  const month = d.toLocaleDateString("en-us", { month: "short" });
  const day = d.toLocaleDateString("en-us", { day: "2-digit" });
  const weekday = d.toLocaleDateString("en-us", { weekday: "short" });
  return (
    <div className="rounded text-white flex flex-col items-center w-12 overflow-hidden bg-white shadow">
      <div className="bg-red-600 w-full h-full text-[10px] text-center">
        {month}
      </div>
      <div className="flex flex-col gap-[0px] text-center w-full py-[2px]">
        <div className="text-[16px] text-black m-0 leading-4">{day}</div>
        <div className="text-[10px] text-stone-400 leading-3">{weekday}</div>
      </div>
    </div>
  );
};
