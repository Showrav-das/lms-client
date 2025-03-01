"use client";
import axios from "axios";
import type React from "react";
import { useEffect, useState } from "react";

interface FormData {
  title: string;
  videoUrl: string;
  selectedValue: string;
  moduleId: string;
}

interface Product {
  _id: string;
  title: string;
  price: string;
  videoUrl: string;
  modules: Module[];
}

interface Module {
  _id: string;
  title: string;
}

export default function AddLecture() {
  const [courses, setCourses] = useState<Product[]>([]);
  const [modules, setModules] = useState<Module[]>([]);
  const [formData, setFormData] = useState<FormData>({
    title: "",
    videoUrl: "",
    selectedValue: "",
    moduleId: "",
  });

  const [pdfFiles, setPdfFiles] = useState<File[]>([]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const newFiles = Array.from(event.target.files);

      // Prevent duplicates
      const uniqueFiles = [...pdfFiles, ...newFiles].reduce((acc, file) => {
        if (!acc.some((f) => f.name === file.name)) {
          acc.push(file);
        }
        return acc;
      }, [] as File[]);

      setPdfFiles(uniqueFiles);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          "https://lms-server-mmiv.onrender.com/api/courses"
        );
        setCourses(res.data.courses);
        console.log("first", res.data.courses);
        res.data.courses.map((course: Product) => setModules(course.modules));
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement & HTMLSelectElement>
  ) => {
    console.log("e", e.target.value);
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    const data = new FormData();

    // Append text data
    data.append("title", formData.title);
    data.append("videoUrl", formData.videoUrl);
    data.append("moduleId", formData.moduleId);

    // Append all PDF files
    pdfFiles.forEach((file, index) => {
      data.append("notes", file);
    });
    console.log("data", data);
    console.log("FormData contents:");
    for (let pair of data.entries()) {
      console.log(pair[0], pair[1]);
    }
    try {
      const response = await axios.post(
        "https://lms-server-mmiv.onrender.com/api/lecture",
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 201) {
        alert("Lecture added successfully!");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to add lecture");
    }
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-3xl bg-white p-8 rounded-xl shadow-lg"
      >
        <h2 className="text-3xl font-bold mb-8 text-center text-[#0a598a] border-b pb-4">
          Add Lecture
        </h2>

        <div className="md:flex md:flex-wrap md:gap-x-4">
          <label
            className="block text-sm font-medium text-gray-700 mb-2"
            htmlFor="selectedValue"
          >
            Choose a course:
          </label>
          <select
            id="selectedValue"
            className="col-start-1 mb-6 row-start-1 w-full appearance-none rounded-md bg-white py-2 pl-3 pr-8 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
            // value={formData.selectedValue}
            onChange={handleChange}
            name="selectedValue"
          >
            <option value="">Select an option</option>
            {courses?.map((course) => (
              <option key={course._id} value={course._id}>
                {course.title}
              </option>
            ))}
          </select>
          <label
            className="block text-sm font-medium text-gray-700 mb-2"
            htmlFor="moduleId"
          >
            Choose a module:
          </label>
          <select
            id="moduleId"
            className="col-start-1 mb-6 row-start-1 w-full appearance-none rounded-md bg-white py-2 pl-3 pr-8 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
            // value={formData.moduleId}
            onChange={handleChange}
            name="moduleId"
          >
            <option value="">Select an option</option>
            {modules?.map((module) => (
              <option key={module._id} value={module._id}>
                {module.title}
              </option>
            ))}
          </select>

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
              htmlFor="title"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Video Url
            </label>
            <input
              type="text"
              id="videoUrl"
              name="videoUrl"
              value={formData.videoUrl}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0a598a] transition-all duration-200"
              placeholder="video url"
              required
            />
          </div>
          <div className="mb-6 md:w-full">
            <label
              htmlFor="notes"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Notes
            </label>
            <input
              type="file"
              id="notes"
              name="notes"
              accept="application/pdf"
              multiple
              onChange={handleFileChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0a598a] transition-all duration-200"
              placeholder="upload a pdf file"
              required
            />
          </div>
          <label
            htmlFor="pdf-upload"
            className="cursor-pointer w-full border p-2 mb-3 rounded-md flex items-center justify-between"
          >
            {pdfFiles.length > 0 ? (
              <span className="truncate">
                {pdfFiles.map((file) => file.name).join(", ")}
              </span>
            ) : (
              <span className="text-gray-500">Select PDFs</span>
            )}
          </label>
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
