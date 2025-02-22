"use client";
import MyLessons from "@/components/MyLessons";
import axios from "axios";
import React, { useEffect, useState } from "react";

// Define the Product interface
interface Product {
  _id: string;
  title: string;
  price: string;
  description: string;
  image: string;
}

// Define the props for the Courses component
interface CoursesProps {
  products?: Product[];
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
}

export default function page() {
  const [products, setProducts] = useState<Product[]>([]);

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
  return (
    <div>
      <MyLessons products={products} setProducts={setProducts} />
    </div>
  );
}
