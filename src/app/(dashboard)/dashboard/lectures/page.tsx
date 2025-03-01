"use client";
import LecturesTable from "@/components/LecturesTable";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";

interface Lecture {
  _id: string;
  title: string;
  videoUrl: string;
  notes: string[];
}

export default function page() {
  const [lectures, setLectures] = useState<Lecture[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          "https://lms-server-mmiv.onrender.com/api/lectures"
        );
        setLectures(res.data);
        console.log("res", res);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);
  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-base font-semibold text-gray-900">Lectures</h1>
        </div>
        <Link
          href="/dashboard/lectures/add"
          className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none"
        >
          <button
            type="button"
            className="block rounded-md bg-[#0a598a] px-3 py-2 text-center text-sm font-normal text-white shadow-sm"
          >
            Add Lecture
          </button>
        </Link>
      </div>
      <LecturesTable lectures={lectures} setLectures={setLectures} />
    </div>
  );
}
