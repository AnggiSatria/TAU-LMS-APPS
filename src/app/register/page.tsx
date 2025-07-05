"use client";

import React from "react";
import { useState, CSSProperties } from "react";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { InputText } from "@/shared/ui/components/atoms/InputText";
import { InputPassword } from "@/shared/ui/components/atoms/InputPassword";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { BeatLoader } from "react-spinners";
import { useRegister } from "@/shared/lib/services/auth/register/hooks";
import { useCreateStudent } from "@/shared/lib/services/students/hooks";
import { useCreateTeacher } from "@/shared/lib/services/teachers/hooks";
import { IRequestCreateStudent } from "@/shared/lib/interfaces/students.interfaces";
import { IRequestCreateTeacher } from "@/shared/lib/interfaces/teachers.interfaces";
import { Toaster } from "sonner";
import Cookies from "js-cookie";

const override: CSSProperties = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};

const baseSchema = z.object({
  first_name: z.string().min(1, "First name is required"),
  last_name: z.string().min(1, "Last name is required"),
  email: z.string().min(1, "Email is required").email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const studentSchema = baseSchema.extend({
  role: z.literal("student"),
  nim: z.string().min(1, "NIM is required"),
  nip: z.string().optional(),
});

const teacherSchema = baseSchema.extend({
  role: z.literal("teacher"),
  nip: z.string().min(1, "NIP is required"),
  nim: z.string().optional(),
});

const registerSchema = z.union([studentSchema, teacherSchema]);

type RegisterForm = z.infer<typeof registerSchema>;

export default function page() {
  const [loading, setLoading] = useState(false);
  const searchParams = useSearchParams();
  const role = searchParams.get("role") as "student" | "teacher" | null;
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterForm>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      role: role ?? undefined,
    },
  });

  const handleNavigate = () => {
    router.push(`/dashboard`);
  };

  const { mutations: registerMutations } = useRegister();
  const { mutations: studentMutations } = useCreateStudent({
    navigate: handleNavigate,
  });
  const { mutations: teacherMutations } = useCreateTeacher({
    navigate: handleNavigate,
  });

  const onSubmit = async (data: RegisterForm) => {
    setLoading(true);
    const res = await registerMutations.mutateAsync(data);
    const registerData = res?.data?.user;
    const accessToken = res?.data?.access_token;

    if (accessToken) {
      Cookies.set("token", accessToken);
    }

    if (role === "student" && data?.nim) {
      const payloadStudent: IRequestCreateStudent = {
        user_id: registerData?.id,
        nim: data?.nim,
      };
      await studentMutations.mutateAsync(payloadStudent);
    }

    if (role === "teacher" && data?.nip) {
      const payloadTeacher: IRequestCreateTeacher = {
        user_id: registerData?.id,
        nip: data?.nip,
      };
      await teacherMutations.mutateAsync(payloadTeacher);
    }
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
              src="/assets/images/logo-tau.png"
              alt="Campus Logo"
              width={80}
              height={80}
              className=""
            />
          </Link>
        </div>

        <h1 className="text-2xl font-bold mb-6 text-center">Register</h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 h-fit gap-3">
            <InputText
              label="First Name"
              placeholder="Enter your first name..."
              register={register("first_name")}
              error={errors.first_name}
            />

            <InputText
              label="Last Name"
              placeholder="Enter your last name..."
              register={register("last_name")}
              error={errors.last_name}
            />
          </div>

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

          {role === "student" ? (
            <InputText
              label="NIM"
              placeholder="Enter your NIM"
              register={register("nim")}
              error={errors.email}
              type="text"
            />
          ) : (
            <InputText
              label="NIP"
              placeholder="Enter your NIP"
              register={register("nip")}
              error={errors.email}
              type="text"
            />
          )}

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
            disabled={loading}
          >
            {loading ? (
              <BeatLoader
                color="#ffffff"
                loading={loading}
                cssOverride={override}
                aria-label="Loading Spinner"
                data-testid="loader"
                size={5}
              />
            ) : (
              "Register"
            )}
          </button>

          <span className="flex mt-3 w-full gap-1.5">
            Do you have an account?{" "}
            <Link href="/login" className="underline">
              Click Here
            </Link>
          </span>
        </form>
      </div>
    </div>
  );
}
