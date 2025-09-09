import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/autoplay"; // Ensure you import this CSS for autoplay

import { Navigation, Pagination, Autoplay } from "swiper/modules";

// Import local images
import one from "/b1.png";
import two from "/b1.png";
import three from "/b1.png";

const Slider = () => {
  // Array of imported images
  const slides = [one, two, three];

  return (
    <div className="w-2/3 mt-2 mx-20">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={50}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000 }}
        className="w-full h-[600px]" // Increased height from 400px to 600px
      >
        {slides.map((image, index) => (
          <SwiperSlide key={index}>
            <img
              src={image} // Use image directly
              alt={`Slide ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Slider;
