import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import img1 from '../assets/images/img1.jpg';
import img2 from '../assets/images/img2.jpg';
import img3 from '../assets/images/img3.png';

function Headpage() {
  return (
    <div className="min-h-[400px] w-screen">
      {/* Swiper */}
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={20}
        slidesPerView={1} // Adjust based on screen size
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000 }}
        loop={true} // Enables infinite scrolling
      >
        <SwiperSlide>
          <img src={img1} alt="Slide 1" className="w-full h-[400px] object-cover rounded-lg shadow-lg" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={img2} alt="Slide 2" className="w-full h-[400px] object-cover rounded-lg shadow-lg" />
        </SwiperSlide>
        <SwiperSlide>
          <div className="flex items-center justify-center h-64 bg-gray-300 text-xl font-semibold">
          <img src={img1} alt="Slide 3" className="w-full h-[400px] object-cover rounded-lg shadow-lg" />

          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="flex items-center justify-center h-64 bg-gray-300 text-xl font-semibold">
          <img src={img3} alt="Slide 4" className="w-full h-[400px] object-cover rounded-lg shadow-lg" />

          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
}

export default Headpage;
