import { useRouter } from "next/router";
import { Loading } from "@/components/Loading";
import { useProfile } from "@/hooks/useProfile";
import toast from "react-hot-toast";
import { PostWorkoutPage } from "@/components/PostWorkoutPage/PostWorkoutPage";

const PostWorkout = () => {
  const router = useRouter();
  const { id, showConfetti } = router.query;
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
      <div className="mb-12 w-full max-w-[400px] max-md:p-2">
        <PostWorkoutPage
          id={id as string}
          showConfetti={Boolean(showConfetti)}
        />
      </div>
    </main>
  );
};

export default PostWorkout;
