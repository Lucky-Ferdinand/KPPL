import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function Blog() {
  const [blogData, setBlogData] = useState([]);
  const [selectedBlog, setSelectedBlog] = useState(null);

  useEffect(() => {
    const storedBlogs = localStorage.getItem("blogs");
    if (storedBlogs) {
      const parsed = JSON.parse(storedBlogs);

      const formatted = parsed.map((item) => ({
        ...item,
        image: item.image || "/images/default.jpg",
        content: item.content || "-",
        author_name: item.author_name || "Tidak diketahui",
        published_at: item.published_at || "Tidak diketahui",
      }));

      setBlogData(formatted);
    }
  }, []);

  // Tutup modal jika tekan ESC
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") setSelectedBlog(null);
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  // Tutup modal jika klik di luar konten
  const handleBackdropClick = (e) => {
    if (e.target.id === "modalBackdrop") setSelectedBlog(null);
  };

  return (
    <div className="max-w-6xl mx-auto py-12">
      {/* Header */}
      <div className="px-6 lg:px-0 mb-10 flex justify-between items-center">
        <div>
          <h1 className="text-[32px] sm:text-[40px] md:text-[55px] font-bold text-gray-900 font-montserrat-B">
            From blog
          </h1>
          <p className="font-open-sans-L text-gray-500 text-base mt-1">
            Latest News & Events
          </p>
        </div>
      </div>

      {/* Blog Cards */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 px-6 lg:px-0">
        {blogData.length === 0 ? (
          <p className="text-gray-500">Belum ada blog tersedia.</p>
        ) : (
          blogData.map((item, index) => (
            <motion.div
              key={index}
              className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden flex flex-col cursor-pointer"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                delay: index * 0.2,
                duration: 0.5,
                ease: "easeOut",
              }}
              whileHover={{
                scale: 1.03,
                boxShadow: "0 10px 20px rgba(0,0,0,0.12)",
              }}
              onClick={() => setSelectedBlog(item)}
            >
              <img
                src={item.image}
                alt={`Blog oleh ${item.author_name}`}
                className="h-48 w-full object-cover"
              />

              <div className="p-5 flex flex-col justify-between flex-grow">
                <div className="font-open-sans-L flex items-center justify-between text-sm text-gray-500 mb-2">
                  <span>{item.author_name}</span>
                  <span>{item.published_at}</span>
                </div>

                <h2 className="font-bold text-lg text-gray-800 mb-2">
                  {item.title_blog}
                </h2>

                <p className="font-open-sans-L text-gray-700 text-sm line-clamp-3">
                  {item.content}
                </p>
              </div>
            </motion.div>
          ))
        )}
      </div>

      {/* Modal Popup */}
      {selectedBlog && (
        <div
          id="modalBackdrop"
          onClick={handleBackdropClick}
          className="fixed inset-0 backdrop-blur-sm bg-black/10 z-50 flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-xl shadow-lg max-w-2xl w-full max-h-[90vh] overflow-auto"
          >
            <img
              src={selectedBlog.image}
              alt="Gambar Blog"
              className="w-full h-64 object-cover rounded-t-xl"
            />
            <div className="p-6">
              <div className="flex justify-between text-sm text-gray-500 mb-2">
                <span>{selectedBlog.author_name}</span>
                <span>{selectedBlog.published_at}</span>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                {selectedBlog.title_blog}
              </h2>
              <p className="text-gray-700 whitespace-pre-line text-justify">
                {selectedBlog.content}
              </p>
              <div className="flex justify-end">
                <button
                  onClick={() => setSelectedBlog(null)}
                  className="mt-6 px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
                >
                  Tutup
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
