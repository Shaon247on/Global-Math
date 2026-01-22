"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useRouter } from "next/navigation";
import { Loader2, AlertTriangle, Trash2, CheckCircle } from "lucide-react";
import { toast } from "sonner";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  useLoginMutation,
  useDeleteAccountMutation,
} from "@/store/slice/apiSlice";
import { removeCookie } from "@/hooks/cookie";

// Step 1: Login Form Schema
const loginSchema = z.object({
  email: z.string().email("Please enter a valid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

// Step 2: Confirmation Schema
const confirmationSchema = z.object({
  confirmation: z.string().refine((val) => val === "CONFIRM", {
    message: "You must type CONFIRM to proceed",
  }),
});

type LoginFormValues = z.infer<typeof loginSchema>;
type ConfirmationFormValues = z.infer<typeof confirmationSchema>;

export default function DeleteAccountPage() {
  const router = useRouter();
  const [step, setStep] = useState<"login" | "confirm">("login");
  const [userPassword, setUserPassword] = useState<string>("");

  const [login, { isLoading: isLoggingIn }] = useLoginMutation();
  const [deleteAccount, { isLoading: isDeleting }] = useDeleteAccountMutation();

  // Login Form
  const loginForm = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // Confirmation Form
  const confirmForm = useForm<ConfirmationFormValues>({
    resolver: zodResolver(confirmationSchema),
    defaultValues: {
      confirmation: "",
    },
  });

  // Handle Login
  const onLoginSubmit = async (values: LoginFormValues) => {
    try {
      await login(values).unwrap();
      setUserPassword(values.password); // Store password for delete API
      setStep("confirm");
      toast.success("Login successful. Please confirm to delete your account.");
    } catch (err) {
      const error = err as { data: { message: string } };

      toast.error(error?.data?.message || "Login failed. Please try again.");
    }
  };

  // Handle Account Deletion
  const onConfirmSubmit = async () => {
    try {
      await deleteAccount({ password: userPassword }).unwrap();
      toast.success("Account deleted successfully.");

      // Clear cookies
      removeCookie("access_token");
      removeCookie("refresh_token");

      // Redirect to home or login
      router.push("/");
    } catch (err) {
      const error = err as { data: { message: string } };
      toast.error(
        error?.data?.message || "Failed to delete account. Please try again.",
      );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Warning Alert */}
        <Alert className="mb-6 border-red-200 bg-red-50">
          <AlertTriangle className="h-5 w-5 text-red-600" />
          <AlertTitle className="text-red-900 font-semibold">
            Danger Zone
          </AlertTitle>
          <AlertDescription className="text-red-800 text-sm">
            Deleting your account is permanent and cannot be undone. All your
            data will be lost.
          </AlertDescription>
        </Alert>

        {/* Step Indicator */}
        <div className="mb-6">
          <div className="flex items-center justify-center gap-4">
            <div className="flex items-center gap-2">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                  step === "login"
                    ? "bg-[#A8D8FF] text-white"
                    : "bg-green-500 text-white"
                }`}
              >
                {step === "confirm" ? <CheckCircle className="w-5 h-5" /> : "1"}
              </div>
              <span className="text-sm font-medium text-gray-700">Login</span>
            </div>

            <div className="w-12 h-0.5 bg-gray-300" />

            <div className="flex items-center gap-2">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                  step === "confirm"
                    ? "bg-[#A8D8FF] text-white"
                    : "bg-gray-300 text-gray-500"
                }`}
              >
                2
              </div>
              <span
                className={`text-sm font-medium ${
                  step === "confirm" ? "text-gray-700" : "text-gray-400"
                }`}
              >
                Confirm
              </span>
            </div>
          </div>
        </div>

        {/* Login Step */}
        {step === "login" && (
          <Card className="border-gray-200 shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl text-gray-900">
                Delete Account
              </CardTitle>
              <CardDescription>
                Please login to verify your identity before deleting your
                account.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...loginForm}>
                <form
                  onSubmit={loginForm.handleSubmit(onLoginSubmit)}
                  className="space-y-4"
                >
                  <FormField
                    control={loginForm.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input
                            type="email"
                            placeholder="your.email@example.com"
                            {...field}
                            disabled={isLoggingIn}
                            className="focus-visible:ring-[#A8D8FF]"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={loginForm.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <Input
                            type="password"
                            placeholder="••••••••"
                            {...field}
                            disabled={isLoggingIn}
                            className="focus-visible:ring-[#A8D8FF]"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button
                    type="submit"
                    className="w-full bg-[#A8D8FF] hover:bg-[#8BC8FF] text-white"
                    disabled={isLoggingIn}
                  >
                    {isLoggingIn ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Verifying...
                      </>
                    ) : (
                      "Continue"
                    )}
                  </Button>
                </form>
              </Form>
            </CardContent>
            <CardFooter>
              <Button
                variant="outline"
                className="w-full"
                onClick={() => router.back()}
              >
                Cancel
              </Button>
            </CardFooter>
          </Card>
        )}

        {/* Confirmation Step */}
        {step === "confirm" && (
          <Card className="border-red-200 shadow-lg">
            <CardHeader className="bg-red-50">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                  <Trash2 className="w-6 h-6 text-red-600" />
                </div>
                <div>
                  <CardTitle className="text-2xl text-red-900">
                    Final Confirmation
                  </CardTitle>
                  <CardDescription className="text-red-700">
                    This action cannot be undone.
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="mb-6 space-y-3">
                <p className="text-sm text-gray-700 font-medium">
                  Before you proceed, please understand:
                </p>
                <ul className="text-sm text-gray-600 space-y-2 ml-4">
                  <li className="flex items-start gap-2">
                    <span className="text-red-500 mt-0.5">•</span>
                    <span>
                      All your quiz history and progress will be deleted
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-500 mt-0.5">•</span>
                    <span>Your account cannot be recovered</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-500 mt-0.5">•</span>
                    <span>You will be logged out immediately</span>
                  </li>
                </ul>
              </div>

              <Form {...confirmForm}>
                <form
                  onSubmit={confirmForm.handleSubmit(onConfirmSubmit)}
                  className="space-y-4"
                >
                  <FormField
                    control={confirmForm.control}
                    name="confirmation"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Type{" "}
                          <span className="font-bold text-red-600">
                            CONFIRM
                          </span>{" "}
                          to delete your account
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="CONFIRM"
                            {...field}
                            disabled={isDeleting}
                            className="focus-visible:ring-red-500 font-mono"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button
                    type="submit"
                    variant="destructive"
                    className="w-full bg-red-600 hover:bg-red-700"
                    disabled={isDeleting}
                  >
                    {isDeleting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Deleting Account...
                      </>
                    ) : (
                      <>
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete My Account
                      </>
                    )}
                  </Button>
                </form>
              </Form>
            </CardContent>
            <CardFooter>
              <Button
                variant="outline"
                className="w-full"
                onClick={() => {
                  setStep("login");
                  confirmForm.reset();
                }}
                disabled={isDeleting}
              >
                Go Back
              </Button>
            </CardFooter>
          </Card>
        )}
      </div>
    </div>
  );
}
