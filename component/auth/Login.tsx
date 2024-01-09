"use client";

import { useEffect } from "react";
import Banner from "./../../public/Banner.jpg";
import { useForm } from "react-hook-form";
import { enqueueSnackbar } from "notistack";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

export default function Login() {
  const SigninSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .required("Password is required")
      .min(8, "Password must be at least 8 characters")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
        "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
      ),
  });
  const defaultValues = {
    email: "",
    password: "",
  };
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(SigninSchema),
    defaultValues,
  });

  useEffect(() => {
    if (errors?.email as any) {
      enqueueSnackbar(`${errors?.email?.message}`, { variant: "error" });
    } else if (errors?.password as any) {
      enqueueSnackbar(`${errors?.password?.message}`, { variant: "error" });
    }
  }, [errors]);
  const onSubmit = async (data: any) => {
    console.log(data);
    try {
      enqueueSnackbar("Login sucessfull", { variant: "success" });
    } catch (error) {}
  };
  return (
    <>
      <div className="flex h-screen bg-gray-100 ">
        {/* Left side - Login Form */}

        <div className="m-auto p-8 max-w-md w-full  lg:w-1/2">
          <h2 className="max-w-md  mb-4 text-gray-700 font-semibold text-justify text-3x1">
            unbounce SMART COPY
          </h2>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="email"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                {...register("email")}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="email"
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="password"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                {...register("password")}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="password"
              />
            </div>

            <div className="mb-4 text-blue-500">
              <a href="#">Forgot your password?</a>
            </div>
            <div className="flex items-center justify-between">
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
              >
                Sign In
              </button>
            </div>
          </form>
          <div className="mt-4 flex items-center justify-center">
            <a href="#" className="text-blue-500">
              No account yet? Sign up now!
            </a>
          </div>
          <p className="mt-4 text-sm text-gray-600 text-justify w-full max-w-md">
            By signing up you agree to the following{" "}
            <a href="#">Terms & Conditions</a> and{" "}
            <a href="#">Privacy Policy</a>.
          </p>
        </div>

        {/* Right side - Image */}
        <div
          className="hidden lg:block lg:w-1/2 bg-cover bg-center relative"
          style={{ backgroundImage: "url(Banner.jpg)" }}
        ></div>
      </div>
    </>
  );
}
