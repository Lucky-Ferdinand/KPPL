import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";

const TypingText = ({ text, className = "", delay = 0 }) => {
  const [displayedText, setDisplayedText] = useState("");
  useEffect(() => {
    let index = 0;
    const timeout = setTimeout(() => {
      const interval = setInterval(() => {
        setDisplayedText(text.slice(0, index + 1));
        index++;
        if (index === text.length) clearInterval(interval);
      }, 40);
    }, delay * 1000);
    return () => clearTimeout(timeout);
  }, [text, delay]);
  return <span className={className}>{displayedText}</span>;
};

const Footer = () => {
  const sections = [
    {
      title: "Company",
      links: ["About us", "Our Team", "Products", "Contact"],
    },
    {
      title: "Product",
      links: ["Feature", "Pricing", "Credit", "FAQ"],
    },
    {
      title: "Download",
      links: ["iOS", "Android", "Microsoft", "Desktop"],
    },
    {
      title: "Support",
      links: ["Privacy", "Help", "Terms", "FAQ"],
    },
  ];

  return (
    <footer className="bg-white text-gray-700 pt-16 px-8 md:px-24">
      {/* Main Content */}
      <div className="max-w-screen-xl mx-auto grid grid-cols-1 md:grid-cols-5 gap-12">
        {/* Logo & Deskripsi */}
        <motion.div
          className="md:col-span-1"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <span id="logo-title" className="font-poppins-extrabold text-[38px] text-gray-900 block">
            <TypingText text="Job Portal" className="inline-block" />
            <b id="logo-dot" className="text-green-600">.</b>
          </span>
          <p className="font-open-sans-L mt-6 text-sm leading-relaxed">
            Job Portal is the heart of the design community and the best resource to discover and connect with designers and jobs worldwide.
          </p>
        </motion.div>

        {/* Sections */}
        {sections.map((section, i) => (
          <motion.div
            key={section.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: i * 0.2 + 0.3 }}
            viewport={{ once: true }}
          >
            <h3 className="font-montserrat-M text-[16px] text-gray-900 mb-6">
              <TypingText text={section.title} delay={i * 0.2 + 0.5} />
            </h3>
            <ul className="font-open-sans-L space-y-3 text-[14px]">
              {section.links.map((link, j) => (
                <li key={link}>
                  <a href="#" className="hover:text-green-600 transition">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>

      {/* Garis Pembatas */}
      <div className="border-t border-green-200 my-8" />

      {/* Copyright & Social */}
      <motion.div
        className="max-w-screen-xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 pb-8 px-4"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }}
        viewport={{ once: true }}
      >
        <p className="font-open-sans-L text-sm text-gray-600 text-center md:text-left">
          Copyright ©2025{" "}
          <span className="text-green-600 font-semibold">Job Portal</span>. All Rights Reserved
        </p>
        <div className="flex gap-4">
          {[FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn].map((Icon, i) => (
            <motion.a
              key={i}
              href="#"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="w-9 h-9 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100"
            >
              <Icon className="text-gray-500 text-sm" />
            </motion.a>
          ))}
        </div>
      </motion.div>
    </footer>
  );
};

export default Footer;
