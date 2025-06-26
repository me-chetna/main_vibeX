
"use client";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Logo } from "@/components/hackup/logo";
import { LoginForm } from "@/components/hackup/login-form";

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
        <div className="absolute top-4 left-4">
             <Link href="/hackup" className="mr-6 flex items-center space-x-2">
                <div className="bg-primary text-primary-foreground p-1.5 rounded-md">
                    <Logo className="h-5 w-5" />
                </div>
                <span className="font-bold text-lg">TeamUp</span>
             </Link>
        </div>
      <Card className="mx-auto max-w-sm w-full shadow-xl">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-headline">Welcome Back!</CardTitle>
          <CardDescription>
            Enter your credentials to access your account.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <LoginForm />
          <div className="mt-4 text-center text-sm">
            Don't have an account?{" "}
            <Link href="/signup" className="underline text-primary font-medium">
              Sign up
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
