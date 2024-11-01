'use client'

import Link from "next/link"
import { useLocale, useSignIn } from "@clerk/nextjs"
import { useEffect } from "react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function SignInForm() {
  const { locale, setLocale } = useLocale();
  const { signIn, setActive, isLoaded } = useSignIn();

  useEffect(() => {
    setLocale('ar-SA');
  }, [setLocale]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isLoaded) return;

    const formData = new FormData(e.currentTarget);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    try {
      const result = await signIn.create({
        identifier: email,
        password,
      });

      if (result.status === "complete") {
        await setActive({ session: result.createdSessionId });
        // Redirect to dashboard or home page
        window.location.href = "/dashboard";
      } else {
        // Handle other status
        console.log(result);
      }
    } catch (err: any) {
      console.error("Error:", err.errors[0].message);
    }
  };

  return (
    <div className="flex h-screen w-full">
      {/* Left half */}
      <div className="hidden w-1/2 bg-light-blue-100 flex-col items-center justify-center lg:flex">
        <h1 className="text-6xl font-bold text-blue-600 mb-4">InspectX</h1>
        <p className="text-xl text-blue-500 text-center max-w-md">
          Your powerful inspection and analysis tool for streamlined workflows.
        </p>
      </div>
      {/* Right half */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-4">
        <Card className="mx-auto max-w-sm w-full">
          <CardHeader>
            <CardTitle className="text-2xl text-right">تسجيل الدخول</CardTitle>
            <CardDescription className="text-right">
              أدخل بريدك الإلكتروني أدناه لتسجيل الدخول إلى حسابك
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="email" className="text-right block">البريد الإلكتروني</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="m@example.com"
                    required
                    dir="ltr"
                    className="text-left"
                  />
                </div>
                <div className="grid gap-2">
                  <div className="flex items-center justify-between">
                    <Link
                      href="#"
                      className="inline-block text-sm underline text-right"
                    >
                      نسيت كلمة المرور؟
                    </Link>
                    <Label htmlFor="password" className="text-right block">كلمة المرور</Label>
                  </div>
                  <Input 
                    id="password" 
                    name="password"
                    type="password" 
                    required 
                    dir="ltr"
                    className="text-left"
                  />
                </div>
                <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
                  تسجيل الدخول
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}