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
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { schema } from "@/components/login/schema";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useLoginUser } from "@/hooks/useLoginUser";
import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";

export default function Login() {
  const router = useRouter();
  const { mutate: login, isPending: logginIn } = useLoginUser({
    onSuccess: () => {
      router.push("/dashboard");
    },
  });

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleSubmit = (data: z.infer<typeof schema>) => {
    login(data);
  };

  return (
    <div className="h-screen w-screen flex items-start justify-center bg-black p-4 fixed">
      <AnimatedGradientBackground />
      <Card className="w-full max-w-md z-50">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center flex flex-col items-center gap-4">
            <Image src="/logo.png" height={50} width={100} alt="logo" />
            <div>
              Log in
              <span className="block text-sm font-normal text-gray-500 mt-1">
                Get access to your account
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
                      <Input placeholder="Email" {...field} />
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
              <Button
                type="submit"
                disabled={logginIn}
                className="w-full bg-black transition-colors duration-300"
              >
                Log In
              </Button>
            </CardContent>
          </form>
        </Form>
        <CardFooter className="flex justify-between text-sm">
          <p className="text-gray-600">Need an account?</p>
          <Link
            href="/get-started"
            className="text-gray-600 hover:text-black transition-colors duration-300"
          >
            Sign Up
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
