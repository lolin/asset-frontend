"use client";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Login({ searchParams }: any) {
  const { push } = useRouter();
  const [error, setError] = useState("");
  const [loginSuccess, setLoginSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const callback = searchParams?.callbackUrl || "/dashboard";
  // const url = "http://localhost:3001/auth";
  // const local = localStorage.getItem("token");

  const login = async (e: any) => {
    e.preventDefault();
    setError("");
    setLoginSuccess("");
    setIsLoading(true);
    try {
      const res = await signIn("credentials", {
        redirect: false,
        email: e.target.email.value,
        password: e.target.password.value,
        callbackUrl: callback,
      });
      // console.log(res);
      if (!res?.error) {
        setIsLoading(false);
        setLoginSuccess("Login success");
        push(callback);
      } else {
        setIsLoading(false);
        if (res.status === 401) {
          setError("Invalid email or password");
        }
        console.log(res.error);
      }
    } catch (error) {
      setIsLoading(false);
      setError("Something went wrong");
      console.log(error);
    }
  };
  return (
    <div className="flex items-center justify-center h-screen flex-col">
      <div className="bg-white shadow-md border border-gray-200 w-96 rounded-lg max-w-sm p-4 sm:p-6 lg:p-8 dark:bg-gray-800 dark:border-gray-700">
        <form className="space-y-6" onSubmit={login}>
          <h3 className="text-xl font-medium text-gray-900 dark:text-white">
            Sign in
          </h3>
          <div>
            <label
              htmlFor="email"
              className="text-sm font-medium text-gray-900 block mb-2 dark:text-gray-300"
            >
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-slate-50 dark:border-gray-500 dark:placeholder-gray-400 dark:text-slate-950"
              placeholder="name@company.com"
              required
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="text-sm font-medium text-gray-900 block mb-2 dark:text-gray-300"
            >
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="••••••••"
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-slate-50 dark:border-gray-500 dark:placeholder-gray-400 dark:text-slate-950"
              required
            />
          </div>
          <div></div>
          <button
            type="submit"
            className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            {isLoading ? "Loading..." : "Login"}
          </button>
        </form>
      </div>
      <div className="mt-3">
        {error !== "" && (
          <div className="text-red-500 font-normal">{error}</div>
        )}
        {loginSuccess !== "" && (
          <div className="text-sky-400 font-normal">{loginSuccess}</div>
        )}
      </div>
    </div>
  );
}
