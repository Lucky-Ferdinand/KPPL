import { useState } from "react";
import { FaSearch, FaMapMarkerAlt, FaEnvelope, FaStar } from "react-icons/fa";
import { motion } from "framer-motion";
import { companyAPI } from "../../services/companyAPI";

// Floating animation utility
const floatingVariant = (x = 10, y = 10, duration = 5, delay = 0) => ({
  animate: {
    x: [0, x, 0, -x, 0],
    y: [0, y, 0, -y, 0],
  },
  transition: {
    duration,
    repeat: Infinity,
    ease: "easeInOut",
    delay,
  },
});

export default function Hero() {
  const [keyword, setKeyword] = useState("");
  const [results, setResults] = useState([]);

  const handleSearch = async () => {
    try {
      const companies = await companyAPI.searchCompanies(keyword);
      setResults(companies);
    } catch (err) {
      console.error("Error saat mencari perusahaan:", err);
    }
  };

  return (
    <section className="mt-10 max-w-7xl mx-auto bg-[#FFF9F5] px-6 lg:px-24 flex flex-col-reverse lg:flex-row items-center justify-between gap-10 rounded-[60px] min-h-[700px] overflow-hidden relative">
      {/* Background */}
      <div className="absolute -top-40 -left-40 w-[900px] h-[900px] rounded-[150px] bg-[#fff7ef] z-0" aria-hidden="true" />

      {/* Left Content */}
      <motion.div
        className="flex flex-col justify-center text-center lg:text-left max-w-2xl h-full py-12 relative z-10"
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <motion.p
          className="text-green-600 font-semibold mb-4"
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <span className="inline-block w-2 h-2 bg-green-500 rounded-full mr-2" />
          BEST JOBS PLACE
        </motion.p>

        <motion.h1
          className="text-[32px] sm:text-[40px] md:text-[48px] lg:text-[69px] font-bold text-gray-900 leading-tight"
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          The Easiest Way to <br className="hidden sm:inline" />
          Get Your New Job
        </motion.h1>

        <motion.p
          className="text-gray-600 mt-4 text-[16px]"
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          Each month, more than 3 million job seekers turn to website in their search for work,
          making over 140,000 applications every single day
        </motion.p>

        {/* Search Form */}
        <motion.div
          className="mt-8 bg-white p-4 rounded-3xl shadow-md grid grid-cols-1 sm:grid-cols-[1fr_1fr_auto] gap-4 items-center"
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          <div className="flex items-center gap-2 bg-gray-50 px-4 py-2 rounded-xl">
            <FaSearch className="text-gray-400" />
            <input
              type="text"
              placeholder="Search company name..."
              className="text-[18px] outline-none bg-transparent w-full"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
            />
          </div>

          <div className="flex items-center gap-2 bg-gray-50 px-4 py-2 rounded-xl">
            <FaMapMarkerAlt className="text-gray-400" />
            <input
              type="text"
              placeholder="Location (not implemented)"
              className="text-[14px] outline-none bg-transparent w-full"
              disabled
            />
          </div>

          <button
            onClick={handleSearch}
            className="bg-green-600 text-[18px] text-white font-semibold px-6 py-3 rounded-xl w-full sm:w-auto"
          >
            Find Now
          </button>
        </motion.div>

        {/* Search Result */}
        {results.length > 0 && (
          <motion.div
            className="mt-6 bg-white p-4 rounded-2xl shadow space-y-4 max-h-[300px] overflow-y-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.6 }}
          >
            {results.map((company) => (
              <div key={company.id} className="border-b pb-2 last:border-none">
                <p className="text-lg font-semibold">{company.company_name}</p>
                <p className="text-sm text-gray-600">{company.address}</p>
                <p className="text-sm text-gray-500 mt-1">{company.description}</p>
              </div>
            ))}
          </motion.div>
        )}

        <motion.p
          className="mt-4 text-[16px] text-gray-600"
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0, duration: 0.6 }}
        >
          <span className="font-bold text-gray-800">Popular Searches:</span> Designer, Developer, Web, Engineer, Senior
        </motion.p>
      </motion.div>

      {/* Right Image with Floating Icons */}
      <motion.div
        className="w-full lg:w-[50%] relative flex justify-center items-center h-[500px]"
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        <div className="relative rounded-[100px_100px_0_100px] bg-blue-500 w-[420px] h-[520px] flex justify-center items-center shadow-[0_0_0_40px_#dbeafe] z-10">
          <img
            src="src/assets/Images/banner.png"
            alt="Hero Person"
            className="object-cover w-[420px] h-[520px] rounded-[100px_100px_0_100px] z-10"
          />

          <motion.img
            src="src/assets/Images/union.svg"
            alt="Union"
            className="absolute -top-4 -left-4 w-12 h-12 z-20"
            {...floatingVariant(6, 6, 6, 0)}
          />

          <motion.div
            className="absolute top-10 left-0 bg-white bg-opacity-90 backdrop-blur-md rounded-lg px-4 py-2 flex items-center gap-2 shadow-md max-w-[160px] z-20"
            {...floatingVariant(4, 8, 5.5, 0.4)}
          >
            <FaEnvelope className="text-orange-400 text-lg" />
            <div className="text-xs text-[#374151]">
              <p className="font-semibold flex items-center gap-1">
                Congratulation!
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-[#22c55e]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </p>
              <p className="text-[10px]">Your Admission Is Completed</p>
            </div>
          </motion.div>

          <motion.div
            className="absolute top-1/3 right-4 bg-white bg-opacity-70 backdrop-blur-md rounded-md px-4 py-3 flex items-center gap-2 shadow-md z-20"
            {...floatingVariant(6, 4, 6.2, 0.3)}
          >
            <img src="src/assets/Images/user-avatar.png" alt="User" className="w-8 h-8 rounded-full" />
            <div className="text-xs">
              <p className="font-semibold text-[#374151]">Web Development Class</p>
              <p className="text-[10px] text-[#6b7280]">Tomorrow at 10.00 AM</p>
              <button className="text-blue-600 text-xs font-semibold mt-1">Join now</button>
            </div>
          </motion.div>

          <motion.div
            className="absolute bottom-5 left-2 bg-white bg-opacity-90 backdrop-blur-md rounded-lg px-4 py-2 flex items-center gap-3 shadow-md max-w-[200px] z-20"
            {...floatingVariant(5, 7, 5.7, 0.2)}
          >
            <div className="flex -space-x-2">
              {Array.from({ length: 5 }).map((_, i) => (
                <img
                  key={i}
                  src="src/assets/Images/course.svg"
                  alt={`Avatar ${i}`}
                  className="w-7 h-7 rounded-full border-2 border-white object-cover"
                />
              ))}
            </div>
            <div className="text-xs text-[#374151] flex items-center gap-1">
              <FaStar className="text-yellow-400" />
              <span className="font-semibold text-sm text-[#121d2b]">4.9</span>
              <span className="text-[10px]">(3.7k review)</span>
            </div>
          </motion.div>

          <motion.img
            src="src/assets/Images/docs.svg"
            alt="Docs Icon"
            className="absolute bottom-1 left-1 w-10 h-10 z-20"
            {...floatingVariant(4, 5, 5.2, 0.1)}
          />

          <motion.img
            src="src/assets/Images/course.svg"
            alt="Course Icon"
            className="absolute top-4 right-2 w-10 h-10 rotate-12 z-20"
            animate={{
              rotate: [10, 14, 8, 10],
              x: [0, -4, 4, 0],
              y: [0, 3, -3, 0]
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </div>
      </motion.div>
    </section>
  );
}
