"use client";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Register() {
  const { push } = useRouter();
  const url = "api/auth/register";
  const [error, setError] = useState("");
  const [isLoading, setLoading] = useState(false);
  const register = async (e: any) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: e.target.name.value,
          email: e.target.email.value,
          password: e.target.password.value,
        }),
      });
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="bg-white shadow-md border border-gray-200 w-96 rounded-lg max-w-sm p-4 sm:p-6 lg:p-8 dark:bg-gray-800 dark:border-gray-700">
        <form className="space-y-6" onSubmit={register}>
          <h3 className="text-xl font-medium text-gray-900 dark:text-white">
            Register
          </h3>
          <div>
            <label
              htmlFor="name"
              className="text-sm font-medium text-gray-900 block mb-2 dark:text-gray-300"
            >
              Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-slate-50 dark:border-gray-500 dark:placeholder-gray-400 dark:text-slate-950"
              placeholder="Your Name"
              required
            />
          </div>
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
            disabled={isLoading}
            type="submit"
            className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Register
            {isLoading ? "Loading..." : "Register"}
          </button>
        </form>
      </div>
    </div>
  );
}
