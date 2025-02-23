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

const Courses: React.FC<CoursesProps> = ({ products = [], setProducts }) => {
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
          {products.map((product) => (
            <div
              key={product._id}
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              <div>
                <Image
                  alt="Instructor Image"
                  className="mx-auto"
                  height={240}
                  src={product?.image}
                  width={240}
                />
              </div>
              <div className="p-4">
                <h3 className="text-sm font-bold">{product.title}</h3>
                <p className="text-sm font-bold text-gray-800">
                  Price: {product.price}
                </p>
                <div className="flex items-center mt-2">
                  <i className="fas fa-play-circle text-blue-500"></i>
                  <p className="ml-2 text-gray-600">{product.description}</p>
                </div>
              </div>

              <div className="flex justify-end gap-1 my-4 mx-2">
                {open && selectedCourse && (
                  <EditCourseModal
                    open={open}
                    setOpen={setOpen}
                    selectedCourse={selectedCourse}
                  />
                )}
                <button
                  onClick={() => handleEdit(product)}
                  className="px-3 bg-white border border-blue-600 text-black py-px rounded-lg focus:outline-none focus:ring-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(product._id ?? null)}
                  className="px-3 bg-red-600 text-white py-px rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Courses;
