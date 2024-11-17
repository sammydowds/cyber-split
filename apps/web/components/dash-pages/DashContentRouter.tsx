import { useRouter } from "next/router";
import { ProfilePage } from "./ProfilePage";
import { HomePage } from "./HomePage";
import { ActiveSplitDeep } from "@repo/database";
import { Profile } from "@repo/database/dist/src/client";
import { LogWorkoutPage } from "./LogWorkoutPage/LogWorkoutPage";
import { CreatePage } from "./CreatePage/CreatePage";
import { Construction } from "lucide-react";
import { ActiveSplitDetailPage } from "./ActiveSplitDetailPage";

const isLogWorkoutRoute = (paths?: string[]) => {
  return paths?.includes("log-workout");
};

const isCreateRoute = (paths?: string[]) => {
  return paths?.length === 2 && paths?.includes("create");
};

const isSplitDetailsRoute = (paths?: string[]) => {
  return paths?.length === 2 && paths?.includes("details");
};

const isActiveSplitRoute = (paths?: string[]) => {
  if (!paths?.length) {
    return true;
  }
};

const isProfilePage = (paths?: string[]) => {
  return paths?.length === 1 && paths.includes("profile");
};

interface DashContentRouterProps {
  activeSplit?: ActiveSplitDeep;
  profile: Profile;
}
export const DashContentRouter = ({
  activeSplit,
  profile,
}: DashContentRouterProps) => {
  const router = useRouter();
  const paths = router.query.slug as string[];

  if (isSplitDetailsRoute(paths)) {
    return <ActiveSplitDetailPage id={paths[1]} />;
  }

  if (isActiveSplitRoute(paths)) {
    return <HomePage activeSplit={activeSplit} />;
  }

  if (isLogWorkoutRoute(paths)) {
    if (!activeSplit) {
      return <div>Empty Active Log</div>;
    }
    return <LogWorkoutPage workoutId={paths[1]} />;
  }

  if (isProfilePage(paths)) {
    return <ProfilePage profile={profile} />;
  }

  if (isCreateRoute(paths)) {
    return <CreatePage />;
  }

  return (
    <div className="flex items-center justify-center gap-2 text-stone-400">
      <Construction /> Page Coming Soon
    </div>
  );
};
