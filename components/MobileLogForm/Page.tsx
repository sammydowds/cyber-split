import { DeepTemplateWorkout } from "@/types";

export const Page = ({
  group,
}: {
  group: DeepTemplateWorkout["strengthGroups"][number];
}) => {
  return (
    <div className="w-full h-full flex flex-col relative">
      <div className="flex items-center px-6 py-2 font-bold text-xl tracking-tighter relative border-b-[1px] border-black">
        <span className="z-50">{group.name}</span>
      </div>
      <div className="flex flex-col text-center">
        <table className="min-w-full border-collapse">
          <thead>
            <tr>
              <th className="border-b border-x border-gray-300 p-2">Set</th>
              <th className="border-b border-x border-gray-300 p-2">Reps</th>
              <th className="border-b border-x border-gray-300 p-2">Weight</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-gray-300 p-2">Data 1</td>
              <td className="border border-gray-300 p-2">Data 2</td>
              <td className="border border-gray-300 p-2">Data 3</td>
            </tr>
            <tr>
              <td className="border border-gray-300 p-2">Data 1</td>
              <td className="border border-gray-300 p-2">Data 2</td>
              <td className="border border-gray-300 p-2">Data 3</td>
            </tr>
            <tr>
              <td className="border border-gray-300 p-2">Data 1</td>
              <td className="border border-gray-300 p-2">Data 2</td>
              <td className="border border-gray-300 p-2">Data 3</td>
            </tr>
            <tr>
              <td className="border border-gray-300 p-2">Data 1</td>
              <td className="border border-gray-300 p-2">Data 2</td>
              <td className="border border-gray-300 p-2">Data 3</td>
            </tr>
            <tr>
              <td className="border border-gray-300 p-2">Data 1</td>
              <td className="border border-gray-300 p-2">Data 2</td>
              <td className="border border-gray-300 p-2">Data 3</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};
