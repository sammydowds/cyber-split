import { useRouter } from "next/router";
import { LogWorkoutPage as LogWorkout } from "@/components/LogWorkoutPage/LogWorkoutPage";
import { Loading } from "@/components/Loading";
import { useProfile } from "@/hooks/useProfile";
import toast from "react-hot-toast";

const LogWorkoutPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const { data: profile, isPending: loadingProfile } = useProfile();

  if (!profile && !loadingProfile) {
    toast.error("You have been logged out.");
    router.push("/login");
  }

  if (!id) {
    return <Loading />;
  }

  return (
    <main className="w-screen h-full flex items-center justify-center overflow-y-auto">
        <div className="mb-12">
        <LogWorkout workoutId={id as string} />
        </div>
    </main>
  );
};

export default LogWorkoutPage;
