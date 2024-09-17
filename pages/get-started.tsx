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
import { schema } from "@/components/signup/schema";
import { useForm } from "react-hook-form";
import { useSignUpUser } from "@/hooks/useSignUpUser";
import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";

export default function GetStarted() {
  const router = useRouter();
  const { mutate: createUser, isPending: isCreatingUser } = useSignUpUser({
    onSuccess: () => {
      router.push("/dashboard");
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
    <div className="h-screen w-screen flex items-start bg-black p-4 fixed">
      <AnimatedGradientBackground />
      <Card className="w-full max-w-md z-50">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center flex flex-col items-center gap-4">
            <Image src="/logo.png" height={50} width={100} alt="logo" />
            <div>
              Start your journey
              <span className="block text-sm font-normal text-gray-500 mt-1">
                Create an account to track your progress
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
                      <Input type="email" placeholder="Email" {...field} />
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
                className="w-full bg-black transition-colors duration-300"
              >
                Sign Up
              </Button>
            </CardContent>
          </form>
        </Form>

        <CardFooter className="flex justify-between text-sm">
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
