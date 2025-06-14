import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
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
  <div className="bg-base-100 text-base-content mt-10 md:mt-15 lg:mt-20">
    <div className="w-[95vw] mx-auto h-auto md:h-[520px] lg:h-[calc(100vh-60px)] md:px-6 lg:px-0">
      <Swiper
        ref={swiperRef}
        modules={[Autoplay]}
        loop={true}
        autoplay={{ delay: 2500, disableOnInteraction: false }}
        className="mySwiper w-full"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-4 md:gap-6 p-4 md:p-6 lg:p-8 h-full overflow-hidden">
              
              {/* Text Part */}
              <div className="text-center md:text-left">
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-medium leading-tight">
                  {slide.title}
                </h2>
                <p className="text-sm sm:text-base md:text-lg mt-3 sm:mt-4 md:mt-5">
                  {slide.description}
                </p>
                <p className="font-semibold text-base sm:text-lg md:text-xl mt-2">
                  {slide.date}
                </p>
                <Link to="/" className="btn btn-primary mt-3 sm:mt-4">
                  Join Now
                </Link>
              </div>

              {/* Image Part */}
              <div className="w-full flex justify-center md:justify-end">
                <img
                  loading="lazy"
                  className="w-full max-w-[300px] sm:max-w-[350px] md:max-w-[450px] lg:max-w-[500px] h-auto object-cover rounded-lg shadow-lg"
                  alt={slide.title}
                  src={slide.image}
                />
              </div>

            </div>
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
