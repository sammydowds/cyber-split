"use client";
import { Nav } from "@/components/Nav";
import { SplitForm } from "@/components/SplitForm/SplitForm";
import { SplitCard } from "@/components/SplitCard/SplitCard";
import { Card } from "@/components/ui/card";
import { useActiveSplit } from "@/hooks/useActiveSplit";
import { useArchivedSplit } from "@/hooks/useArchivedSplits";
import { Separator } from "@/components/ui/separator";

export default function Dashboard() {
  const { data: activeSplit } = useActiveSplit();
  const { data: archivedSplits } = useArchivedSplit();

  return (
    <main>
      <div className="flex flex-col items-center justify-start h-screen w-screen bg-stone-100 overflow-hidden">
        <Nav />
        <div className="grow w-full overflow-hidden">
          <div className="h-full overflow-y-auto flex flex-col gap-4 pt-4">
            <div className="w-full flex flex-col items-center justify-center gap-4">
              {activeSplit ? (
                <SplitCard split={activeSplit} />
              ) : (
                <Card className="w-[500px] max-md:w-full">
                  <SplitForm />
                </Card>
              )}
            </div>
            <div className="w-full flex flex-col mt-4 items-center justify-center">
              <div className="w-[300px] flex flex-col items-center">
                <h2 className="text-lg font-bold text-sm text-stone-600">
                  Past Splits
                </h2>
                <Separator className="bg-stone-300" />
              </div>
              {archivedSplits?.length ? (
                <>
                  {archivedSplits.map((s) => {
                    return <SplitCard split={s} />;
                  })}
                </>
              ) : (
                <div className="text-stone-500 text-sm">Nothing Archived</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
