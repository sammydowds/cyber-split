import { useRouter } from "next/router";
import { LibraryPage } from "./LibraryPage";
import { ProfilePage } from "./ProfilePage";
import { ActiveSplitPage } from "./ActiveSplitPage";
import { ActiveSplitDeep, DeepLoggedWorkout, SplitDeep } from "@repo/database";
import { Profile } from "@repo/database/dist/src/client";
import { LogWorkoutPage } from "./LogWorkoutPage";
import { CreatePage } from "./CreatePage/CreatePage";
import { Construction } from "lucide-react";
import { EmptyActivePage } from "./EmptyActivePage";

const isLogWorkoutRoute = (paths?: string[]) => {
  return (
    paths?.length === 3 &&
    paths?.includes("active") &&
    paths?.includes("log-workout")
  );
};

const isCreateRoute = (paths?: string[]) => {
  return (
    paths?.length === 2 &&
    paths?.includes("library") &&
    paths?.includes("create")
  );
};

const isActiveSplitRoute = (
  paths?: string[],
  activeSplit?: ActiveSplitDeep,
) => {
  if (!activeSplit) {
    return false;
  }
  // root page
  if (!paths?.length) {
    return true;
  }

  if (paths?.length === 1 && paths.includes("active")) {
    return true;
  }
};

const isLibraryPage = (paths?: string[]) => {
  return paths?.length === 1 && paths.includes("library");
};

const isProfilePage = (paths?: string[]) => {
  return paths?.length === 1 && paths.includes("profile");
};

const isEmptyActivePage = (paths?: string[], activeSplit?: ActiveSplitDeep) => {
  return (
    !activeSplit?.id &&
    ((paths?.length === 1 && paths?.includes("active")) || !paths)
  );
};

interface DashContentRouterProps {
  activeSplit?: ActiveSplitDeep;
  allSplits: SplitDeep[];
  profile: Profile;
  draftWorkout?: ActiveSplitDeep["split"]["workouts"][number];
  loggedWorkouts?: DeepLoggedWorkout[];
}
export const DashContentRouter = ({
  activeSplit,
  allSplits = [],
  profile,
  loggedWorkouts = [],
}: DashContentRouterProps) => {
  const router = useRouter();
  const paths = router.query.slug as string[];

  // root page
  if (isActiveSplitRoute(paths, activeSplit)) {
    // @ts-ignore
    return <ActiveSplitPage activeSplit={activeSplit} />;
  }

  if (isLogWorkoutRoute(paths)) {
    if (!activeSplit) {
      return <div>Empty Active Log</div>;
    }
    return <LogWorkoutPage activeSplit={activeSplit} workoutId={paths[2]} />;
  }

  if (isLibraryPage(paths)) {
    return (
      <LibraryPage splits={allSplits} oneSplitIsActive={!!activeSplit?.id} />
    );
  }

  if (isProfilePage(paths)) {
    return <ProfilePage profile={profile} />;
  }

  if (isCreateRoute(paths)) {
    return <CreatePage />;
  }

  if (isEmptyActivePage(paths, activeSplit)) {
    return <EmptyActivePage allSplits={allSplits} />;
  }

  return (
    <div className="flex items-center justify-center gap-2 text-stone-400">
      <Construction /> Page Coming Soon
    </div>
  );
};
