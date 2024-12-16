import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/autoplay"; // Ensure you import this CSS for autoplay

import { Navigation, Pagination, Autoplay } from "swiper/modules";

// Import local images
import image1 from "../assets/images/image1.png";
import image2 from "../assets/images/image2.png";
import image3 from "../assets/images/image3.png";

const Slider = () => {
  // Array of imported images
  const slides = [image1, image2, image3];

  return (
    <div className="w-full mt-8">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={50}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000 }}
        className="w-full h-[400px]"
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
