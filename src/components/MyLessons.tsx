import axios from "axios";
import Image from "next/image";
import React, { useState } from "react";
import EditCourseModal from "./EditCourseModal";
import Link from "next/link";

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

const MyLessons: React.FC<CoursesProps> = ({ products = [], setProducts }) => {
  const [open, setOpen] = useState<boolean>(false);
  const [selectedCourse, setSelectedCourse] = useState<Product | null>(null);

  if (products.length === 0) {
    return <p>No courses available.</p>;
  }

  const handleDelete = async (id: string) => {
    try {
      const response = await axios.delete(
        `http://localhost:5001/api/course/${id}`,
        {
          data: { id },
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 200) {
        // Remove the deleted product from the state
        setProducts((prevProducts) =>
          prevProducts.filter((product) => product._id !== id)
        );
        console.log("Product deleted");
      }
    } catch (error) {
      console.error("Error deleting product", error);
    }
  };

  const handleEdit = (item: Product) => {
    setOpen(true);
    console.log("item", item);
    setSelectedCourse(item);
  };

  return (
    <div>
      <div className="mt-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {products.map((product, i) => (
            <div
              key={i}
              className="max-w-[300px] rounded-lg border border-gray-200 bg-white"
            >
              <Link href={`/course/${product._id}`}>
                {/* Course Image */}
                <div className="relative mb-2">
                  <Image
                    alt="Instructor Image"
                    className="mx-auto"
                    height={300}
                    src={`http://localhost:5001/${product.image.replace(
                      "\\",
                      "/"
                    )}`}
                    width={300}
                  />
                </div>

                {/* Course Info */}
                <div className="space-y-1 mx-4">
                  <h3 className="text-base font-bold leading-tight text-gray-900">
                    {product.title}
                  </h3>
                  <p className="text-sm text-gray-600">{product.description}</p>

                  {/* Price */}
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-gray-900">
                      ${product.price}
                    </span>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyLessons;
