"use client";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useRouter } from "next/navigation";
import CustomCarousel from "./CustomCarousel";
import TextInput from "../FormInputs/TextInput";
import SubmitButton from "../FormInputs/SubmitButton";
import PasswordInput from "../FormInputs/PasswordInput";
import { signIn } from "next-auth/react";
import { IdCard, Lock, LogInIcon } from "lucide-react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export type RegisterInputProps = {
  
  id: string;
  password: string;

  
};
export default function SignIn() {
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<RegisterInputProps>();
  const router = useRouter();
  async function onSubmit(data: RegisterInputProps) {
    setIsLoading(true);
    //Here i should send data to my backend
    const res = await signIn("credentials", {
      redirect: false, // we’ll handle redirect manually
      id: data.id,
      password: data.password,
    });

    if (res?.ok) {
      // Optionally fetch the session to access role info
      const session = await fetch("/api/auth/session").then(res => res.json());

      // Redirect based on role
      const role = session?.user?.role;

      if (role === "student") router.push("/student");
      else if (role === "tutor") router.push("/tutor");
      else if (role === "parent") router.push("/parent");
      else if (role === "admin") router.push("/admin");
      //else router.push("/");

    } else {
      toast.error("Invalid username or password. Please try again.", {
        position: "top-left",
        autoClose: 5000,
      });
    }
    setIsLoading(false);
  }
  return (
    <div className="w-full lg:grid h-screen lg:min-h-[600px] lg:grid-cols-2 relative ">
      <div className="flex items-center justify-center py-12">
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="absolute top-5 left-5"> <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
      ijtahed 
    </span>
    <span className="text-sm font-medium text-gray-600 group-hover:text-blue-600 transition-colors duration-300 italic">
      Your Partner in Education
    </span></div>
          <div className="grid gap-2 text-center mt-10 md:mt-0">
            <h1 className="text-3xl font-bold">Login to your account</h1>
          </div>
          <form className="grid gap-4" onSubmit={handleSubmit(onSubmit)}>
            <TextInput
            icon={IdCard}
              label="ID"
              register={register}
              name="id"
              errors={errors}
              placeholder="  Enter Your Id"
            />
            
            <PasswordInput
            icon={Lock}
              label="Password"
              register={register}
              name="password"
              type="password"
              errors={errors}
              placeholder="  ******"
              forgotPasswordLink="/forgot-pass"
            />

            <SubmitButton
            className="cursor-pointer"
            buttonIcon={LogInIcon}


              title="LogIn"
              loading={isLoading}
              loadingTitle="Logging In to your account please wait..."
              disabled={isLoading}
            />
          </form>
          <div className="mt-4 text-center text-sm">
            Doesn't Have an account?{""}
            <Link href="/submission" className="underline text-blue-600">
              Submit the form 
            </Link>
          </div>
        </div>
      </div>
      <div className="hidden bg-muted lg:block relative">
        <CustomCarousel />
      </div>
    </div>
  );
}