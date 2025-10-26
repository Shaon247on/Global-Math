import LoginForm from "@/components/auth/LoginForm";
import Logo from "@/components/elements/Logo";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";

export default function Home() {
  return (
    <div>
      <div className="relative min-h-screen flex items-center justify-center w-full p-4 sm:p-6 lg:p-8">
        <Image
          src={"/authbg.jpg"}
          width={1920}
          height={1080}
          alt="auth background"
          className="absolute inset-0 z-10 object-cover w-full h-full"
        />
        <div className="relative z-20 w-full max-w-7xl">
          <Card className="w-full">
            <CardContent className="max-w-7xl p-6 sm:p-8 md:p-12 lg:p-16 xl:px-44 xl:py-10">
              <Logo />
              <div className="text-center space-y-3 sm:space-y-4 mt-6 sm:mt-9">
                <h1 className="font-bold text-3xl sm:text-4xl md:text-5xl">
                  Login
                </h1>
                <p className="text-lg sm:text-xl md:text-2xl">
                  Welcome back to Admin
                </p>
              </div>
              <LoginForm />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
