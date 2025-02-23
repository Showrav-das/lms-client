"use client";
import { XMarkIcon } from "@heroicons/react/20/solid";
import axios from "axios";
import React, { useState } from "react";

interface FormData {
  image: File | string;
  title: string;
  price: string;
  description: string;
}

interface EditCourseModalProps {
  setOpen: (open: boolean) => void;
  open: boolean;
  selectedCourse: {
    _id: string;
    image: string;
    title: string;
    price: string;
    description: string;
  };
}

export default function EditCourseModal({
  setOpen,
  open,
  selectedCourse,
}: EditCourseModalProps) {
  const [formData, setFormData] = useState<FormData>({
    image: selectedCourse.image,
    title: selectedCourse.title,
    price: selectedCourse.price,
    description: selectedCourse.description,
  });

  // Handle Input Change
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle File Selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (file) {
      setFormData((prev) => ({
        ...prev,
        image: file, // Store file object
      }));
    }
  };

  // Handle Form Submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const data = new FormData();
    data.append("title", formData.title);
    data.append("price", formData.price);
    data.append("description", formData.description);
    if (formData.image instanceof File) {
      data.append("image", formData.image);
    }
    console.log("selectedCourse", data, formData);
    try {
      const response = await axios.put(
        `http://localhost:5001/api/course/${selectedCourse._id}`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      if (response.status === 200) {
        console.log("Updated successfully!");
        alert("Course updated successfully!");
        setOpen(false);
      }
    } catch (error) {
      console.error("Error updating course:", error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 overflow-y-auto z-50">
      <div className="relative w-full max-w-md bg-white rounded-xl p-3">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Edit Course</h2>
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            <XMarkIcon aria-hidden="true" className="size-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="w-full max-w-3xl bg-white">
          <div className="md:flex md:flex-wrap md:gap-x-4">
            {/* Image Input - Show image name or select a new image */}
            <div className="mb-2 md:w-full">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Image
              </label>
              <input
                type="file"
                id="image"
                name="image"
                onChange={handleFileChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0a598a] transition-all duration-200"
              />
            </div>

            {/* Title Input */}
            <div className="mb-6 md:w-full">
              <label className="block text-sm font-medium text-gray-700 mb-2">
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

            {/* Price Input */}
            <div className="mb-6 md:w-full">
              <label className="block text-sm font-medium text-gray-700 mb-2">
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

            {/* Description Input */}
            <div className="mb-8 md:w-full">
              <label className="block text-sm font-medium text-gray-700 mb-2">
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

          {/* Submit Button */}
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
    </div>
  );
}
