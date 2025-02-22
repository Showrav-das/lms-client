"use client";
import Courses from "@/components/Courses";
import axios from "axios";
import type React from "react";
import { useState } from "react";

interface FormData {
  image: File | null;
  title: string;
  price: string;
  description: string;
}

export default function AddCourse() {
  const [formData, setFormData] = useState<FormData>({
    image: null,
    title: "",
    price: "",
    description: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    console.log("file", file);
    setFormData((prev) => ({
      ...prev,
      image: file, // Update the correct field
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    const data = new FormData();
    data.append("title", formData.title);
    data.append("price", formData.price);
    data.append("description", formData.description);
    if (formData.image) {
      data.append("image", formData.image);
    }
    try {
      const response = await axios.post(
        "https://lms-server-mmiv.onrender.com/api/courses",
        data,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      if (response.status === 500) {
        throw new Error("Network response was not ok");
      }
      if (response.status === 201) {
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-3xl bg-white p-8 rounded-xl shadow-lg"
      >
        <h2 className="text-3xl font-bold mb-8 text-[#0a598a] border-b pb-4">
          Add Course
        </h2>

        <div className="md:flex md:flex-wrap md:gap-x-4">
          <div className="mb-6 md:w-full">
            <label
              htmlFor="image"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Image
            </label>
            <input
              type="file"
              id="image"
              name="image"
              onChange={handleFileChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0a598a] transition-all duration-200"
              placeholder="https://example.com/image.jpg"
              required
            />
          </div>

          <div className="mb-6 md:w-full">
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0a598a] transition-all duration-200"
              placeholder="Title"
              required
            />
          </div>

          <div className="mb-6 md:w-full">
            <label
              htmlFor="price"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Price
            </label>
            <input
              type="number"
              id="price"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0a598a] transition-all duration-200"
              placeholder="29.99"
              step="0.01"
              min="0"
              required
            />
          </div>

          <div className="mb-8 md:w-full">
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={4}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0a598a] transition-all duration-200 resize-y"
              placeholder="Description..."
              required
            ></textarea>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-[#0a598a] text-white font-semibold py-2 px-6 rounded-md hover:bg-[#084b75] focus:outline-none focus:ring-2 focus:ring-[#0a598a] focus:ring-opacity-75 transition-all duration-200 text-lg"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
