"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Eye, EyeOff } from "lucide-react";
import { LoginFormValues } from "@/types/auth.type";
import { loginSchema } from "@/schema/auth.schema";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useLoginMutation } from "@/store/slice/apiSlice";
import { toast } from "sonner";

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const [login, { isLoading }] = useLoginMutation();
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onBlur",
  });

  const onSubmit = async (data: LoginFormValues) => {
    const response = await login({
      email: data.email,
      password: data.password,
    }).unwrap();

    if (response.access_token) {
      router.push("/dashboard");
    }
  };

  return (
    <div className="w-full mt-6 sm:mt-8 md:mt-10">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-fit mx-auto space-y-4 sm:space-y-5 md:space-y-6"
        >
          {/* Email Field */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    className={cn(
                      "w-full sm:w-[400px] md:w-[480px] lg:w-[524px] mx-auto focus-visible:border-b-4 duration-150 transition-all shadow-none outline-none border-b-2 border-t-0 border-r-0 border-l-0 rounded-none text-sm sm:text-base",
                      form.formState.errors.email
                        ? "border-b-destructive focus-visible:border-b-destructive"
                        : "border-b-black"
                    )}
                    placeholder="Enter your email"
                    type="email"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-xs sm:text-sm" />
              </FormItem>
            )}
          />

          {/* Password Field */}
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="relative w-full sm:w-[400px] md:w-[480px] lg:w-[524px] mx-auto">
                    <Input
                      className={cn(
                        "w-full pr-10 focus-visible:border-b-4 duration-150 transition-all shadow-none outline-none border-b-2 border-t-0 border-r-0 border-l-0 rounded-none text-sm sm:text-base",
                        form.formState.errors.password
                          ? "border-b-destructive focus-visible:border-b-destructive"
                          : "border-b-black"
                      )}
                      placeholder="Enter your password"
                      type={showPassword ? "text" : "password"}
                      {...field}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((prev) => !prev)}
                      className="absolute inset-y-0 right-0 sm:right-3 flex items-center text-gray-500 hover:text-gray-700 pr-2 sm:pr-0"
                      tabIndex={-1}
                      aria-label={
                        showPassword ? "Hide password" : "Show password"
                      }
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4 sm:h-5 sm:w-5" />
                      ) : (
                        <Eye className="h-4 w-4 sm:h-5 sm:w-5" />
                      )}
                    </button>
                  </div>
                </FormControl>
                <FormMessage className="text-xs sm:text-sm" />
              </FormItem>
            )}
          />

          {/* Submit Button */}
          <div className="text-center pt-2 sm:pt-4">
            <Button
              size="xl"
              type="submit"
              className="w-full sm:w-auto px-12 sm:px-20 md:px-28 lg:px-36 rounded-xl sm:rounded-2xl text-sm sm:text-base"
              disabled={form.formState.isSubmitting}
            >
              {form.formState.isSubmitting ? "Logging in..." : "Log In"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
