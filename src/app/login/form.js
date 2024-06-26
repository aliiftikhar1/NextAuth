"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

const FormSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters.",
  }),
});

export default function FormPage() {
  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit = async (data) => {
    console.log("Submitting form", data);

    const { username: email, password } = data;

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      // Process response here
      console.log("Registration Successful", response);
      alert("Registration Successful");
    } catch (error) {
      console.error("Registration Failed:", error);
      alert(`Registration Failed: ${error.message}`);
    }
  };

  return (
    <div className="w-2/3 mx-auto space-y-6">
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Username
          </label>
          <input
            {...form.register("username")}
            placeholder="Username"
            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
          <p className="text-sm text-gray-500">
            This is your public display name.
          </p>
        </div>
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            {...form.register("password")}
            type="password"
            placeholder="Password"
            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <button
          type="submit"
          className="px-4 py-2 font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
