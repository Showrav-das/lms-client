"use client";
import axios from "axios";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function page() {
  const [isModuleExpanded, setIsModuleExpanded] = useState(true);
  interface Course {
    title: string;
    modules: { moduleNumber: number; title: string; answer: string }[];
  }

  const [course, setCourse] = useState<Course | null>(null);
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const params = useParams();

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };
  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await axios.get(
          `https://lms-server-mmiv.onrender.com/api/course/${params.id}`
        );
        console.log("first", response.data.course);
        setCourse(response.data.course);
      } catch (error) {
        console.error("Error fetching course:", error);
      }
    };

    fetchCourse();
  }, [params.id]);

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="flex flex-col lg:flex-row">
        {/* Video and form section */}
        <div className="flex-1 p-4">
          {/* Video player container */}
          <div className="relative aspect-video bg-black mb-8">
            {/* Video controls bar */}
            <div className="absolute bottom-0 left-0 right-0 bg-black/50 p-4 flex items-center gap-4">
              <div className="flex items-center gap-2">
                <button className="text-white hover:text-gray-300">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
                <span className="text-sm">0:02 / 11:45</span>
              </div>
            </div>
          </div>
        </div>

        {/* Updated Course sidebar */}
        <div className="w-full lg:w-[400px] min-h-screen bg-slate-900">
          {/* Header with module number and progress */}
          <div className="flex items-center justify-between p-4 border-b border-slate-800">
            <div className="text-lg">Running Module : 01</div>
            <div className="text-white/70">1/11</div>
          </div>

          {/* Search bar */}
          <div className="p-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search Lesson"
                className="w-full bg-slate-800/50 text-white pl-10 pr-4 py-3 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0a598a]"
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>

          {/* Course title section */}
          <div className="p-4 border-b border-slate-800">
            <div className="flex items-center justify-between">
              <h1 className="text-xl font-medium text-white">
                {course?.title}
              </h1>
              <button className="text-white/70">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
            </div>
          </div>

          {/* Module section */}
          <div className="p-4">
            {course?.modules.map((module, i) => (
              // <Module key={i} module={module} />
              <div key={i}>
                <button
                  onClick={() => setIsModuleExpanded(!isModuleExpanded)}
                  className="w-full flex items-center justify-between mb-4"
                >
                  <div>
                    <h2 className="text-lg font-medium">
                      Module {module.moduleNumber}: {module.title}
                    </h2>
                  </div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className={`h-5 w-5 transform transition-transform ${
                      isModuleExpanded ? "rotate-180" : ""
                    }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>
              </div>
            ))}
            <button
              onClick={() => setIsModuleExpanded(!isModuleExpanded)}
              className="w-full flex items-center justify-between mb-4"
            >
              <div>
                <h2 className="text-lg font-medium">
                  Module 01: Introduction to redux
                </h2>
                <div className="text-sm text-white/70">1 h 58 m • 1/11</div>
              </div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`h-5 w-5 transform transition-transform ${
                  isModuleExpanded ? "rotate-180" : ""
                }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>

            {/* Lesson list */}
            <div id="accordion-collapse">
              {course?.modules.map((item, index) => (
                <div key={index} className="my-3">
                  <div
                    onClick={() => toggleAccordion(index)}
                    className="flex items-center justify-between"
                  >
                    <button type="button" aria-expanded={openIndex === index}>
                      {item.title}
                    </button>
                    <svg
                      data-accordion-icon
                      className={`w-3 h-3 transition-transform ${
                        openIndex === index ? "rotate-180" : ""
                      }`}
                      viewBox="0 0 10 6"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 5 5 1 1 5"
                      />
                    </svg>
                  </div>
                  <div className={`${openIndex === index ? "" : "hidden"}`}>
                    <p>{item.answer}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
