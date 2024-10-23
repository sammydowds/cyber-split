import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AnimatedGradientBackground } from "@/components/AnimatedGradientBackground";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { schema } from "@/lib/formSchemas/signup";
import { useForm } from "react-hook-form";
import { useSignUpUser } from "@/hooks/useSignUpUser";
import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";
import toast from "react-hot-toast";

export default function GetStarted() {
  const router = useRouter();
  const { mutate: createUser, isPending: isCreatingUser } = useSignUpUser({
    onSuccess: () => {
      toast.success("Welcome! Account created. Please login.");
      router.push("/login");
    },
  });

  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const handleSubmit = (data: z.infer<typeof schema>) => {
    createUser(data);
  };

  return (
    <div className="h-screen w-screen flex items-start justify-center md:p-4 fixed">
      <Card className="w-full max-md:h-full max-md:rounded-none border-none shadow-none max-w-md z-50">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center flex flex-col items-center gap-4">
            <Image src="/logo.png" height={20} width={100} alt="logo" />
            <div>
              Get started
              <span className="block text-sm font-normal text-gray-500 mt-1">
                Create an account to start training
              </span>
            </div>
          </CardTitle>
        </CardHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)}>
            <CardContent className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="Email"
                        className="text-[18px] h-[50px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage>
                      {form.formState.errors.email?.message}
                    </FormMessage>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Password"
                        className="text-[18px] h-[50px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage>
                      {form.formState.errors.password?.message}
                    </FormMessage>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        className="text-[18px] h-[50px]"
                        placeholder="Confirm Password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage>
                      {form.formState.errors.confirmPassword?.message}
                    </FormMessage>
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                disabled={isCreatingUser}
                size="lg"
                className="w-full bg-black transition-colors duration-300 font-bold"
              >
                Sign Up
              </Button>
            </CardContent>
          </form>
        </Form>

        <CardFooter className="flex justify-between">
          <p className="text-gray-600">Already have an account?</p>
          <Link
            href="/login"
            className="text-gray-600 hover:text-black transition-colors duration-300"
          >
            Log In
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
