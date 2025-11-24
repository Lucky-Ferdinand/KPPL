import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules"; // Tambahkan Autoplay
import "swiper/css";

export default function CompanyLogoSlider() {
  const [logos, setLogos] = useState([]);

  useEffect(() => {
    const data = localStorage.getItem("sliders");
    if (data) {
      const parsed = JSON.parse(data);
      const formatted = parsed.map((item) => ({
        src: item.image,
        alt: item.title || "slider",
      }));
      setLogos(formatted);
    }
  }, []);

  if (logos.length === 0) return null;

  return (
    <div className="max-w-7xl mx-auto py-12">
      <Swiper
        modules={[Autoplay]}
        spaceBetween={24}
        slidesPerView={2}
        loop={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        breakpoints={{
          640: { slidesPerView: 2 },
          768: { slidesPerView: 3 },
          1024: { slidesPerView: 5 },
        }}
        className="z-10"
      >
        {logos.map((logo, idx) => (
          <SwiperSlide key={idx}>
            <div className="card bg-white rounded-xl shadow-md hover:shadow-xl transition-transform hover:scale-105 p-4">
              <figure className="h-20 flex items-center justify-center">
                <img
                  src={logo.src}
                  alt={logo.alt}
                  className="h-full max-h-16 object-contain"
                />
              </figure>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
