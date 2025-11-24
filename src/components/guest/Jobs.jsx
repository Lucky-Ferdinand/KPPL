import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaRegClock, FaMapMarkerAlt, FaBookmark } from "react-icons/fa";
import { jobAPI } from "../../services/jobAPI"; // ⬅️ Ganti path jika perlu

export default function RecentJobs() {
  const [jobs, setJobs] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await jobAPI.fetchJobs();

        const formatted = data.map((job) => ({
          ...job,
          price: `Rp.${parseInt(job.salary_min).toLocaleString()} - Rp.${parseInt(job.salary_max).toLocaleString()}`,
        }));

        setJobs(formatted);

        // Ambil kategori unik
        const uniqueCategories = Array.from(new Set(data.map((job) => job.category))).filter(Boolean);
        setCategories(uniqueCategories);
      } catch (error) {
        console.error("Error fetching jobs:", error);
      }
    }

    fetchData();
  }, []);

  const filteredJobs =
    selectedCategory === "All"
      ? jobs
      : jobs.filter((job) => job.category === selectedCategory);

  return (
    <div className="max-w-6xl mx-auto py-8">
      {/* Header */}
      <div className="px-6 lg:px-0 mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-[40px] md:text-[48px] font-bold text-gray-900">Recent Jobs</h1>
          <p className="text-[16px] text-gray-600">
            {filteredJobs.length} new opportunities posted today!
          </p>
        </div>

        {/* Filter Kategori */}
        <div className="flex gap-3 overflow-x-auto pb-2 flex-shrink-0">
          <button
            onClick={() => setSelectedCategory("All")}
            className={`px-5 py-2 rounded-full text-sm font-semibold ${
              selectedCategory === "All"
                ? "bg-purple-200 text-purple-900 ring-2 ring-purple-500"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            All
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-5 py-2 rounded-full text-sm font-semibold whitespace-nowrap ${
                selectedCategory === cat
                  ? "bg-purple-200 text-purple-900 ring-2 ring-purple-500"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Kartu Job */}
      <div className="grid md:grid-cols-3 gap-6 px-6 lg:px-0">
        {filteredJobs.map((job, index) => (
          <motion.div
            key={job.id}
            className="bg-white shadow-md rounded-xl overflow-hidden border"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              delay: index * 0.15,
              duration: 0.6,
              ease: "easeOut",
            }}
            whileHover={{ scale: 1.02 }}
          >
            {/* Gambar */}
            <div className="relative">
              <img
                src={job.image}
                alt={job.title_job}
                className="w-full h-56 object-cover"
              />
              {job.isUrgent && (
                <span className="absolute top-2 left-2 bg-orange-100 text-orange-800 text-xs font-semibold px-2 py-1 rounded">
                  Urgent
                </span>
              )}
            </div>

            {/* Konten */}
            <div className="p-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-700">{job.company_name}</span>
                {job.job_type?.toLowerCase() === "fulltime" && (
                  <span className="bg-purple-100 text-purple-800 text-xs font-medium px-2 py-0.5 rounded">
                    Fulltime
                  </span>
                )}
              </div>

              <h2 className="text-lg font-semibold text-gray-800 mb-2 leading-tight">
                {job.title_job}
              </h2>

              <div className="text-sm text-gray-500 flex items-center gap-2 mb-2">
                <FaRegClock className="w-4 h-4" />
                <span>{new Date(job.created_at).toLocaleDateString()}</span>
                <span>•</span>
                <FaMapMarkerAlt className="w-4 h-4" />
                <span>{job.location}</span>
              </div>

              <div className="flex justify-between items-center mt-3">
                <span className="text-blue-600 font-bold text-lg">
                  {job.price}
                  <span className="text-sm text-gray-500 font-normal"> /Month</span>
                </span>
                <button className="text-gray-400 hover:text-gray-600">
                  <FaBookmark className="w-5 h-5" />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
