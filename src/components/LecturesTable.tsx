import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";
import axios from "axios";
import React from "react";

interface Lecture {
  _id: string;
  title: string;
  videoUrl: string;
  notes: string[];
}

interface LecturesTableProps {
  lectures: Lecture[];
  setLectures: React.Dispatch<React.SetStateAction<Lecture[]>>;
}

export default function LecturesTable({
  lectures,
  setLectures,
}: LecturesTableProps) {
  const handleDelete = async (id: string) => {
    try {
      const response = await axios.delete(
        `https://lms-server-mmiv.onrender.com/api/lecture/${id}`,
        {
          data: { id },
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 200) {
        // Remove the deleted product from the state
        setLectures((prevProducts) =>
          prevProducts.filter((product) => product._id !== id)
        );
        console.log("Product deleted");
        alert("Lecture deleted successfully");
      }
    } catch (error) {
      console.error("Error deleting product", error);
    }
  };

  return (
    <div>
      {" "}
      <div className="mt-8 flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <div className="overflow-hidden shadow ring-1 ring-black/5 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-300">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                    >
                      Title
                    </th>

                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Video Url
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Action
                    </th>
                    <th
                      scope="col"
                      className="relative py-3.5 pl-3 pr-4 sm:pr-6"
                    >
                      <span className="sr-only">Edit</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {lectures.map((lecture) => (
                    <tr key={lecture._id}>
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                        {lecture.title}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {lecture.videoUrl}
                      </td>
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6 flex gap-3">
                        <PencilSquareIcon
                          className="h-5 w-5 text-gray-600"
                          aria-hidden="true"
                        />
                        <TrashIcon
                          onClick={() => handleDelete(lecture._id)}
                          className="h-5 w-5 text-red-500 cursor-pointer"
                          aria-hidden="true"
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
