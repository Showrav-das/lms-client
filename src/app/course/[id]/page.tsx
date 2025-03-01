"use client";
import axios from "axios";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function page() {
  const [isModuleExpanded, setIsModuleExpanded] = useState(true);
  const [selectedVideo, setSelectedVideo] = useState("");
  interface Course {
    title: string;
    modules: { moduleNumber: number; title: string; answer: string }[];
  }

  const [course, setCourse] = useState<Course | null>(null);
  const params = useParams();
  const [expandedModuleIndex, setExpandedModuleIndex] = useState(null);

  const toggleModule = (index) => {
    setExpandedModuleIndex(expandedModuleIndex === index ? null : index);
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
              {selectedVideo ? (
                <iframe
                  className="w-full h-full"
                  src={selectedVideo}
                  title="Lecture Video"
                  // allowFullScreen
                ></iframe>
              ) : (
                <div className="flex items-center justify-center h-full text-gray-400">
                  Select a lecture to watch
                </div>
              )}
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
          <div>
            {course?.modules.map((module, i) => (
              <div key={i} className="p-4 border-b">
                {/* Module Title Button */}
                <button
                  onClick={() => toggleModule(i)}
                  className="w-full flex items-center justify-between p-2  rounded-lg"
                >
                  <h2 className="text-lg font-medium">
                    Module {module.moduleNumber}: {module.title}
                  </h2>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className={`h-5 w-5 transform transition-transform ${
                      expandedModuleIndex === i ? "rotate-180" : ""
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

                {/* Lecture List - Shown Only When Module is Expanded */}
                {expandedModuleIndex === i && (
                  <div className="ml-4 mt-2">
                    {module?.lectures.map((lecture, j) => (
                      <div
                        onClick={() => setSelectedVideo(lecture.videoUrl)}
                        key={j}
                        className="p-2 border-l "
                      >
                        <h3 className="text-md font-semibold">
                          {lecture.title}
                        </h3>
                        <a
                          href={lecture.videoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-500 underline"
                        >
                          Watch Video
                        </a>
                        {lecture.notes.length > 0 && (
                          <div className="mt-1">
                            <p className="font-semibold">Notes:</p>
                            {lecture.notes.map((note, k) => (
                              <a
                                key={k}
                                href={note}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-green-500 block"
                              >
                                Download PDF {k + 1}
                              </a>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
