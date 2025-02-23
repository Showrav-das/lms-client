"use client";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

export default function page() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5001/api/login",
        formData
      );

      localStorage.setItem("role", response.data.user.role);
      localStorage.setItem("username", response.data.user.username);
      if (response.data.user.role === "admin") {
        alert("Successfully login");
        router.push("/dashboard/course");
      } else {
        alert("Successfully login");
        router.push("/dashboard/my-lessons");
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <div className="bg-gray-100 flex items-center justify-center min-h-screen">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">Sign in</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700" htmlFor="email">
              Email
            </label>
            <input
              onChange={handleChange}
              name="email"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              id="email"
              placeholder="Enter your email"
              type="email"
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700" htmlFor="password">
              Password
            </label>
            <input
              onChange={handleChange}
              name="password"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              id="password"
              placeholder="Enter your password"
              type="password"
            />
          </div>
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <input
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                id="remember"
                type="checkbox"
              />
              <label className="ml-2 block text-gray-900" htmlFor="remember">
                Remember me
              </label>
            </div>
          </div>
          <button
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="submit"
          >
            Signin
          </button>
        </form>
        <p className="text-center text-gray-600 mt-6">
          Don't have an account?{" "}
          <Link href="/signup" className="text-blue-600 hover:underline">
            Sign up
          </Link>
        </p>
      </div>
      ;
    </div>
  );
}
