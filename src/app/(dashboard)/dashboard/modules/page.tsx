"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";

interface Product {
  _id: string;
  title: string;
  price: string;
  description: string;
  image: string;
}

export default function page() {
  const [products, setProducts] = useState<Product[]>([]);
  const [formData, setFormData] = useState({
    title: "",
    selectedValue: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          "https://lms-server-mmiv.onrender.com/api/courses"
        );
        setProducts(res.data.courses);
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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("e", formData);
    try {
      const response = await axios.post(
        "https://lms-server-mmiv.onrender.com/api/module",
        formData
      );
      //   if (response.status === 201) {
      //     router.push("/signin");
      //   }
    } catch (error) {
      console.log("error", error);
    }
  };
  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-3xl bg-white p-8 rounded-xl shadow-lg"
      >
        <h2 className="text-3xl font-bold mb-8 text-[#0a598a] border-b pb-4">
          Add Module
        </h2>
        <div className="md:flex md:flex-wrap md:gap-x-4">
          <label
            htmlFor="selectedValue"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Choose a course:
          </label>
          <select
            id="selectedValue"
            className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pl-3 pr-8 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 focus:outline focus:outline-none focus:ring-2 focus:ring-[#0a598a] sm:text-sm/6 mb-6"
            value={formData.selectedValue}
            onChange={handleChange}
            name="selectedValue"
          >
            <option value="">Select an option</option>
            {products.map((product) => (
              <option key={product._id} value={product._id}>
                {product.title}
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
        </div>
        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-[#0a598a] text-white font-normal py-1 px-5 rounded-md hover:bg-[#084b75] focus:outline-none focus:ring-2 focus:ring-[#0a598a] focus:ring-opacity-75 transition-all duration-200 text-lg"
          >
            Submit
          </button>
        </div>
      </form>
    </>
  );
}
