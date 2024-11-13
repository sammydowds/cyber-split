import { HorizontalCarousel } from "@/components/HorizontalCarousel";
import { Button } from "@/components/ui/button";

const DiscoverCard = () => {
    return (
        <div className="h-[300px] w-[345px] min-w-[300px] rounded bg-gradient-to-br from-white from-40% to-stone-100 flex flex-col justify-between">
          <div className="">
            <div className="flex items-center justify-between p-2">
                <div className="text tracking-tighter font-semibold">Full Body Split</div>
                <div className="bg-orange-200 p-[6px] font-bold text-xs rounded-sm">Intermediate</div>
            </div>
          </div>
          <div className="p-2 w-full">
            <Button className="w-full font-bold">Begin</Button>
          </div>
        </div>
    )
}

export const Discover = () => {
  const { data, isPending } = { data: [], isPending: false }
  return (
    <div className="w-full flex flex-col justify-center bg-yellow-300 rounded max-md:rounded-none">
      <div className="font-semibold tracking-tighter text-lg px-4 py-2 flex flex-col">
        <div>Discover</div>
        <div className="font-semibold text-stone-500 tracking-tighter leading-4">
          Splits based on your profile settings.
        </div>
      </div>
      <HorizontalCarousel>
        {
            isPending ? (
                null
            ) : (
                <>
         <DiscoverCard />
        <DiscoverCard />
        <DiscoverCard />
        <DiscoverCard />
        <DiscoverCard />
                </>
            )
        }
        
      </HorizontalCarousel>
    </div>
  );
};
