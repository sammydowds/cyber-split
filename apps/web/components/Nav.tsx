import { useRouter } from "next/router";
import { Button } from "./ui/button";
import { useSignOut } from "@/hooks/useSignOut";

export const Nav = () => {
  const router = useRouter();
  const { mutate: signOut, isPending: signingOut } = useSignOut({
    onSuccess: () => {
      router.push("/");
    },
  });
  return (
    <nav className="w-full bg-white shadow z-50">
      <div className="flex items-center justify-between w-full p-2">
        <div>Logo</div>
        <div>
          <Button onClick={() => signOut()} disabled={signingOut}>
            Sign Out
          </Button>
        </div>
      </div>
    </nav>
  );
};
