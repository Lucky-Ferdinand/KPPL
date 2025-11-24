import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import logo from "../../assets/Images/Logo-Job-portal.png";

export default function Navbar() {
  const navVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1 + 0.4,
        duration: 0.4,
        ease: "easeOut",
      },
    }),
  };

  // Scroll ke ID section
  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <motion.header
      initial={{ opacity: 0, y: -30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="flex items-center justify-between bg-white px-6 py-4 shadow-sm border-b border-gray-100 sticky top-0 z-50"
    >
      {/* Logo klik scroll ke Hero */}
      <motion.div
        className="basis-1/5 flex justify-start pl-6"
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <img
          src={logo}
          alt="JobHub Logo"
          className="h-10 w-auto cursor-pointer"
          onClick={() => scrollToSection("hero")}
        />
      </motion.div>

      {/* Navigation */}
      <nav className="basis-3/5 hidden lg:flex justify-center">
        <ul className="flex justify-center gap-8 text-sm font-medium text-gray-900">
          {[
            { id: "hero", label: "Home" },
            { id: "slider", label: "Slider" },
            { id: "category", label: "Categories" },
            { id: "jobs", label: "Browse Jobs" },
            { id: "blog", label: "Blog" },
          ].map((item, i) => (
            <motion.li
              key={item.id}
              custom={i}
              initial="hidden"
              animate="visible"
              variants={navVariants}
              className="cursor-pointer"
              onClick={() => scrollToSection(item.id)}
            >
              <span className="font-montserrat-M text-[16px] hover:text-green-600 transition-colors">
                {item.label}
              </span>
            </motion.li>
          ))}
        </ul>
      </nav>

      {/* Actions */}
      <div className="basis-1/5 flex justify-end pr-6 items-center gap-4 font-medium">
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <span
            onClick={() => scrollToSection("board")}
            className="cursor-pointer font-montserrat-M text-green-600 text-[16px] hover:text-green-800 transition"
          >
            Apply Now
          </span>
        </motion.div>
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <Link
            to="/login"
            className="font-open-sans-R bg-green-600 hover:bg-green-700 text-[18px] text-white px-5 py-2 rounded-md shadow-md transition"
          >
            Sign in
          </Link>
        </motion.div>
      </div>
    </motion.header>
  );
}
