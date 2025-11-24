import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { supabase } from "../../utils/supabaseClient";
import { Link } from "react-router-dom";
import { Briefcase } from "lucide-react";

const Category = () => {
  const [categories, setCategories] = useState([]);

  // Gradien pastel (warna lembut)
  const gradientBgs = [
    "bg-gradient-to-r from-purple-100 to-pink-100",
    "bg-gradient-to-r from-blue-100 to-sky-100",
    "bg-gradient-to-r from-green-100 to-teal-100",
    "bg-gradient-to-r from-pink-100 to-rose-100",
    "bg-gradient-to-r from-yellow-100 to-orange-100",
    "bg-gradient-to-r from-indigo-100 to-blue-100",
    "bg-gradient-to-r from-rose-100 to-red-100",
    "bg-gradient-to-r from-teal-100 to-cyan-100",
    "bg-gradient-to-r from-orange-100 to-amber-100",
    "bg-gradient-to-r from-sky-100 to-blue-100",
  ];

  const gradientIconBg = [
    "bg-gradient-to-br from-purple-300 to-pink-300",
    "bg-gradient-to-br from-blue-300 to-sky-300",
    "bg-gradient-to-br from-green-300 to-teal-300",
    "bg-gradient-to-br from-pink-300 to-rose-300",
    "bg-gradient-to-br from-yellow-300 to-orange-300",
    "bg-gradient-to-br from-indigo-300 to-blue-300",
    "bg-gradient-to-br from-rose-300 to-red-300",
    "bg-gradient-to-br from-teal-300 to-cyan-300",
    "bg-gradient-to-br from-orange-300 to-amber-300",
    "bg-gradient-to-br from-sky-300 to-blue-300",
  ];

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data, error } = await supabase.from("job").select("category");
        if (error) throw error;

        const countMap = {};
        data.forEach((item) => {
          const cat = item.category || "Lainnya";
          countMap[cat] = (countMap[cat] || 0) + 1;
        });

        const countedCategories = Object.entries(countMap).map(
          ([category, count], i) => ({
            title: category,
            desc: `${count} lowongan tersedia`,
            bg: gradientBgs[i % gradientBgs.length],
            iconBg: gradientIconBg[i % gradientIconBg.length],
          })
        );

        setCategories(countedCategories);
      } catch (err) {
        console.error("Gagal mengambil data kategori:", err.message);
      }
    };

    fetchCategories();
  }, []);

  return (
    <motion.div
      className="max-w-6xl mx-auto py-10 px-6 lg:px-0"
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      viewport={{ once: true }}
    >
      <div className="mb-16">
        <motion.h1
          className="text-[32px] sm:text-[40px] md:text-[48px] lg:text-[55px] font-montserrat-B text-gray-900 font-bold"
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.6 }}
          viewport={{ once: true }}
        >
          Browse by category
        </motion.h1>
        <motion.p
          className="font-open-sans-L text-[16px] text-gray-600 max-w-2xl text-left"
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          viewport={{ once: true }}
        >
          Find the type of work you need, clearly defined and ready to start.
          Work begins as soon as you purchase and provide requirements.
        </motion.p>
      </div>

      {/* Grid Card */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={{
          hidden: {},
          visible: {
            transition: {
              staggerChildren: 0.2,
            },
          },
        }}
      >
        {categories.map((item, index) => (
          <motion.div
            key={index}
            className={`rounded-xl p-6 shadow-md hover:shadow-xl transition duration-300 transform hover:scale-105 ${item.bg}`}
            variants={{
              hidden: { opacity: 0, y: 60, rotate: -5 },
              visible: { opacity: 1, y: 0, rotate: 0 },
            }}
            whileTap={{ scale: 0.97 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <Link to={`/jobs?category=${encodeURIComponent(item.title)}`}>
              <div className="flex justify-center mb-4">
                <div
                  className={`p-4 rounded-full shadow-inner ${item.iconBg}`}
                >
                  <motion.div
                    className="w-10 h-10 flex items-center justify-center"
                    animate={{ y: [0, -6, 0] }}
                    transition={{
                      repeat: Infinity,
                      repeatType: "loop",
                      duration: 2,
                      ease: "easeInOut",
                    }}
                  >
                    <Briefcase className="w-8 h-8 text-white" />
                  </motion.div>
                </div>
              </div>
              <h3 className="text-[22px] font-semibold text-center mb-2 text-gray-800">
                {item.title}
              </h3>
              <p className="text-gray-700 text-[14px] text-center">
                {item.desc}
              </p>
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default Category;
