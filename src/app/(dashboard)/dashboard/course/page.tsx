"use client";
import Courses from "@/components/Courses";
import axios from "axios";
import Link from "next/link";
import type React from "react";
import { useEffect, useState } from "react";

interface Product {
  _id: string;
  title: string;
  price: string;
  description: string;
  image: string;
}

const page: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("http://localhost:5001/api/courses");
        setProducts(res.data.courses);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <Link href="/dashboard/course/add">
        <div className="flex justify-between">
          <p className="text-lg font-bold text-[#0a598a]">Courses</p>
          <button className="bg-[#0a598a] text-white py-2 px-5 rounded-md hover:bg-[#084b75] focus:outline-none focus:ring-2 focus:ring-[#0a598a] focus:ring-opacity-75 transition-all duration-200 text-sm">
            Add New Course
          </button>
        </div>
      </Link>
      <Courses products={products} setProducts={setProducts} />
    </div>
  );
};

export default page;
