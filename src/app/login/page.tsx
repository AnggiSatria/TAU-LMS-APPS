"use client";

import { CSSProperties, useState } from "react";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { InputText } from "@/shared/ui/components/atoms/InputText";
import { InputPassword } from "@/shared/ui/components/atoms/InputPassword";
import Link from "next/link";
import { Toaster, toast } from "sonner";
import { useLogin } from "@/shared/lib/services/auth/login/hooks";
import { BeatLoader } from "react-spinners";
import { useRouter } from "next/navigation";

const override: CSSProperties = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};

const loginSchema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginForm = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
  });

  const handleNavigate = () => {
    router.push(`/dashboard`);
  };

  const { mutations: loginMutations } = useLogin({
    setLoading: setLoading,
    navigate: handleNavigate,
  });

  const onSubmit = async (data: LoginForm) => {
    setLoading(true);
    const res = await loginMutations.mutateAsync(data);
    localStorage.setItem(`userData`, JSON.stringify(res?.data?.user));
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <Toaster position="bottom-right" />
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        {/* Logo kampus */}
        <div className="flex justify-center mb-6">
          <Link href="/">
            <Image
              src="/assets/images/logo-tau.png" // <- Ganti dengan logo kampusmu
              alt="Campus Logo"
              width={80}
              height={80}
              className=""
            />
          </Link>
        </div>

        <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Email */}
          <InputText
            label="Email"
            placeholder="you@example.com"
            register={register("email")}
            error={errors.email}
            type="email"
          />

          {/* Password */}
          <InputPassword
            label="Password"
            placeholder="Your password"
            register={register("password")}
            error={errors.password}
          />

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition cursor-pointer"
            disabled={loading}
          >
            {loading ? (
              <BeatLoader
                color="#ffff"
                loading={loading}
                cssOverride={override}
                aria-label="Loading Spinner"
                data-testid="loader"
                size={5}
              />
            ) : (
              "Login"
            )}
          </button>

          <span className="flex mt-3 w-full gap-1.5">
            Don't have an account?{" "}
            <Link href="/choose-register" className="underline">
              Click Here
            </Link>
          </span>
        </form>
      </div>
    </div>
  );
}
