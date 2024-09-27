import { useRouter } from "next/router";
import { useSplit } from "@/hooks/useSplit";
import { DashCard } from "@/components/DashCard";
import Link from "next/link";
import { Wrench } from "lucide-react";
import { PublicSplitDetailsCard } from "@/components/split-cards/PublicSplitDetailsCard";

export default function ShareSplit() {
  const router = useRouter();
  const splitId = router?.query?.id as string;
  const { data, isPending } = useSplit(splitId);

  return (
    <main>
      <div
        className="flex flex-col items-center justify-start h-screen w-screen fixed overflow-hidden overflow-y-auto bg-stone-200 pb-[365px]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='gray' fill-opacity='0.10'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
        }}
      >
        {!data && !isPending ? (
          <div className="h-full w-full flex flex-col items-center mt-8">
            Oops, we had some issues looking up that split
          </div>
        ) : null}
        {data ? (
          <div className="flex flex-col gap-4 my-4 max-md:w-full">
            <PublicSplitDetailsCard split={data} />
            <DashCard className="border-[1px] bg-white p-4 m-[4px] font-bold flex gap-2 justify-between">
              <div className="flex items-center gap-[6px] text-stone-600">
                <Wrench size={20} />
                Want to build your own?
              </div>
              <Link href="/get-started" className="underline">
                Sign Up
              </Link>
            </DashCard>
          </div>
        ) : null}
      </div>
    </main>
  );
}
