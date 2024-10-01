import { DeepTemplateWorkout } from "@/types";
import { Plus } from "lucide-react";

export const Page = ({
  group,
}: {
  group: DeepTemplateWorkout["strengthGroups"][number];
}) => {
  return (
    <div className="w-full flex flex-col relative">
      <div className="flex items-center px-6 py-2 font-bold text-xl tracking-tighter relative border-b-[1px] border-black bg-yellow-300 bg-opacity-80">
        <span className="z-50">{group.name}</span>
      </div>
      <div className="flex flex-col text-center">
        <table className="min-w-full border-collapse">
          <thead>
            <tr>
              <th className="border-b border-x border-gray-300 w-[50px]"></th>
              <th className="border-b border-x border-gray-300 p-2">Reps</th>
              <th className="border-b border-x border-gray-300 p-2">Weight</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-gray-300 w-[50px]">1</td>
              <td className="border border-gray-300 p-2">Data 2</td>
              <td className="border border-gray-300 p-2">Data 3</td>
            </tr>
            <tr>
              <td className="border border-gray-300 w-[50px]">2</td>
              <td className="border border-gray-300 p-2">Data 2</td>
              <td className="border border-gray-300 p-2">Data 3</td>
            </tr>
            <tr>
              <td className="border border-gray-300 w-[50px]">3</td>
              <td className="border border-gray-300 p-2">Data 2</td>
              <td className="border border-gray-300 p-2">Data 3</td>
            </tr>
            <tr>
              <td className="border border-gray-300 w-[50px]">4</td>
              <td className="border border-gray-300 p-2">Data 2</td>
              <td className="border border-gray-300 p-2">Data 3</td>
            </tr>
            <tr>
              <td className="border border-gray-300 w-[50px]">5</td>
              <td className="border border-gray-300 p-2">Data 2</td>
              <td className="border border-gray-300 p-2">Data 3</td>
            </tr>
            <tr>
              <td className="border border-gray-300 w-[50px]">5</td>
              <td className="border border-gray-300 p-2">Data 2</td>
              <td className="border border-gray-300 p-2">Data 3</td>
            </tr>
            <tr>
              <td className="border border-gray-300 w-[50px]">5</td>
              <td className="border border-gray-300 p-2">Data 2</td>
              <td className="border border-gray-300 p-2">Data 3</td>
            </tr>
            <tr>
              <td className="border border-gray-300 w-[50px]">5</td>
              <td className="border border-gray-300 p-2">Data 2</td>
              <td className="border border-gray-300 p-2">Data 3</td>
            </tr>
            <tr>
              <td className="border border-gray-300 text-stone-400 w-[50px] m-auto"></td>
              <td colSpan={2} className="border border-gray-300 h-[40px]">
                <button className="w-full h-full bg-stone-100 flex items-center justify-center gap-[4px] text-stone-500 text-sm">
                  <Plus size={16} />
                  Add Set
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};
