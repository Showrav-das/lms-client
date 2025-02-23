"use client";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

export default function RegistrationForm() {
  const [formData, setFormData] = useState({
    username: "",
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
    console.log("formdata", formData);
    try {
      const response = await axios.post(
        "http://localhost:5001/api/register",
        formData
      );
      if (response.status === 201) {
        router.push("/signin");
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <div className="bg-gray-100 flex items-center justify-center min-h-screen">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">Signup</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700" htmlFor="username">
              User name
            </label>
            <input
              onChange={handleChange}
              name="username"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              id="username"
              placeholder="Enter your name"
              type="text"
            />
          </div>
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

          <button
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="submit"
          >
            Login
          </button>
        </form>
        <p className="text-center text-gray-600 mt-6">
          Already have an account?{" "}
          <Link href="/signin" className="text-blue-600 hover:underline">
            Sign in
          </Link>
        </p>
      </div>
      ;
    </div>
  );
}
