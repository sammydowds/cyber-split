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
    <Page>
      <Section>
        <SectionHeader>
          <SectionTitle>Create a program</SectionTitle>
          <SectionDescription>
            Create a new program and activate it.
          </SectionDescription>
        </SectionHeader>
        <SectionContent>
          <Button
            className="font-bold"
            onClick={() => router.push("/dashboard/library/create")}
          >
            Create Program
          </Button>
        </SectionContent>
      </Section>
      {allSplits?.length ? (
        <Section>
          <SectionHeader>
            <SectionTitle>Activate an existing program</SectionTitle>
            <SectionDescription>
              Activate an existing program you have created.
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
                      onClick={() => activate({ id: split.id })}
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
    </Page>
  );
};