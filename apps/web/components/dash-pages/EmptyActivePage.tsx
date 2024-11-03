import { SplitDeep } from "@repo/database";
import { Button } from "../ui/button";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/router";
import {
  Section,
  SectionContent,
  SectionDescription,
  SectionHeader,
  SectionTitle,
} from "./components/sections";
import { Page } from "./components/pages";
import { useActivateSplit } from "@/hooks/useActivateSplit";

interface EmptyPageProps {
  allSplits?: SplitDeep[];
}
export const EmptyActivePage = ({ allSplits }: EmptyPageProps) => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { mutate: activate, isPending: isActivating } = useActivateSplit({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["activeSplit"] });
    },
  });
  return (
    <div className="flex flex-col items-center gap-12 mt-8 px-4">
      <Section>
        <SectionHeader>
          <SectionTitle>Create a split</SectionTitle>
          <SectionDescription>
            Create a new split and activate it.
          </SectionDescription>
        </SectionHeader>
        <SectionContent>
          <Button
            className="font-bold"
            onClick={() => router.push("/dashboard/library/create")}
          >
            Create Split
          </Button>
        </SectionContent>
      </Section>
      {allSplits?.length ? (
        <Section>
          <SectionHeader>
            <SectionTitle>Activate an existing split</SectionTitle>
            <SectionDescription>
              Activate an existing split you have created.
            </SectionDescription>
          </SectionHeader>
          <div className="flex flex-col gap-[8px]">
            {allSplits?.map((split) => {
              return (
                <div className="flex items-center gap-8 justify-between">
                  <div className="font-bold text-lg">{split.name}</div>
                  <div>
                    <Button
                      className="font-bold"
                      variant="outline"
                      disabled={isActivating}
                      onClick={() => activate(split)}
                    >
                      Activate
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        </Section>
      ) : null}
    </div>
  );
};
