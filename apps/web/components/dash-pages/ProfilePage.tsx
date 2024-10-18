import { CircleUser } from "lucide-react";
import { DashCard } from "../DashCard";
import {
  CardHeader,
  CardContent,
  CardTitle,
  CardDescription,
} from "../ui/card";
import { Profile as ProfileType } from "@repo/database/dist/src/client";

interface ProfileProps {
  profile?: ProfileType;
}
export const ProfilePage = ({ profile }: ProfileProps) => {
  return (
    <div className="w-full h-full flex flex-col items-center mt-8 p-2">
      <DashCard className="w-[500px] max-md:w-full">
        <CardHeader>
          <CardTitle className="flex items-center gap-[6px]">
            <CircleUser strokeWidth="1.5" /> Profile
          </CardTitle>
          <CardDescription>
            Your profile information can be found below.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-2 font-bold">
            <div className="flex flex-col gap-[4px]">
              <div>Email</div>
              <div className="font-normal">{profile?.email}</div>
            </div>
          </div>
        </CardContent>
      </DashCard>
    </div>
  );
};
