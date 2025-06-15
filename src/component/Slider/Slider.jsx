import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { motion } from "framer-motion"
import "swiper/css/navigation";
import { Link, Outlet } from "react-router";



function Slider() {
  const swiperRef = useRef(null);

  const slides = [
 {
  title: "Food Sharing Drive: Dhaka Edition",
  description:
    "Be part of our community initiative to collect surplus food from restaurants and distribute to those in need across Dhaka city.",
  image: "https://i.ibb.co/C3F02HkP/pexels-rdne-6646864.jpg",
  date: "2025-06-20",
},
{
  title: "Zero Waste Cooking Workshop",
  description:
    "Learn creative ways to use every part of your vegetables and reduce kitchen waste in this interactive session.",
  image: "https://i.ibb.co/XkCp2ZL7/pexels-rdne-6647010.jpg",
  date: "2025-06-28",
},
{
  title: "Community Fridge Launch Event",
  description:
    "Join us as we inaugurate our first community fridge, making it easier for everyone to donate or access free surplus food.",
  image: "https://i.ibb.co/VWsLgmb9/pexels-rdne-6646768.jpg",
  date: "2025-07-05",
}
// https://i.ibb.co/VWsLgmb9/pexels-rdne-6646768.jpg
// https://i.ibb.co/XkCp2ZL7/pexels-rdne-6647010.jpg
// https://i.ibb.co/C3F02HkP/pexels-rdne-6646864.jpg
  ];

  return (
  <>
      <div className="bg-gradient-to-r from-base-200 via-base-100 to-base-300 text-base-content rounded-lg ">
        <div className="w-[95vw] mx-auto h-auto md:h-[600px] lg:h-[650px] flex items-center md:px-6 lg:px-0">
          <Swiper
            ref={swiperRef}
            modules={[Autoplay]}
            loop={true}
            autoplay={{ delay: 2500, disableOnInteraction: false }}
            className="mySwiper w-full"
          >
            {slides.map((slide, index) => (
              <SwiperSlide key={index}>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6, ease: "easeInOut" }}
                  className="grid grid-cols-1 md:grid-cols-2 items-center gap-4 md:gap-6 p-4 md:p-6 lg:p-8 h-full overflow-hidden rounded-xl shadow-lg bg-base-100 bg-opacity-80 backdrop-blur-sm"
                >
                  {/* Image Part */}
                  <motion.div
                    initial={{ scale: 0.85, opacity: 0, rotate: -5 }}
                    animate={{ scale: 1, opacity: 1, rotate: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="w-full flex justify-center md:justify-end order-1 md:order-2"
                  >
                    <motion.img
                      loading="lazy"
                      src={slide.image}
                      alt={slide.title}
                      className="w-full max-w-[300px] sm:max-w-[350px] md:max-w-[450px] lg:max-w-[500px] h-auto object-contain rounded-lg shadow-md"
                      animate={{ y: [0, -10, 0] }}
                      transition={{
                        repeat: Infinity,
                        duration: 3,
                        ease: "easeInOut",
                      }}
                    />
                  </motion.div>

                  {/* Text Part */}
                  <motion.div
                    initial={{ x: -50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="text-center md:text-left order-2 md:order-1"
                  >
                    <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-base-content">
                      {slide.title}
                    </h2>
                    <p className="text-sm sm:text-base md:text-lg mt-3 sm:mt-4 md:mt-5 text-base-content/80">
                      {slide.description}
                    </p>
                    <p className="font-semibold text-sm sm:text-lg md:text-xl mt-2 text-base-content">
                      {slide.date}
                    </p>
                    <motion.div
                      animate={{ y: [0, -5, 0] }}
                      transition={{
                        repeat: Infinity,
                        duration: 1.5,
                        ease: "easeInOut",
                      }}
                      className="inline-block"
                    >
                      <Link to="/" className="btn btn-primary mt-3 sm:mt-4">
                        Join Now
                      </Link>
                    </motion.div>
                  </motion.div>
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>

      <div className="w-[90%] mx-auto mt-6">
        <Outlet />
      </div>
    </>






  );
}

export default Slider;
