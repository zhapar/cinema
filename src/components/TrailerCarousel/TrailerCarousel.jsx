import React from "react";

// import Swiper core and required components
import SwiperCore, { Navigation, Autoplay, A11y } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/swiper.scss";
import "swiper/components/navigation/navigation.scss";

import "./TrailerCarousel.scss";

// install Swiper components
SwiperCore.use([Navigation, Autoplay, A11y]);

function TrailerCarousel({ trailers, carouselName }) {
  return (
    <div>
      <h2 className='title-trailer-carousel'>{carouselName}</h2>
      <Swiper
        id='trailers'
        observer='true'
        slidesPerView={1}
        spaceBetween={10}
        observeparents='true'
        navigation
        centeredSlides='true'
        breakpoints={{
          800: {
            slidesPerView: 2,
          },
          1500: {
            slidesPerView: 3,
          },
        }}
        className='trailer-carousel'
      >
        {trailers.map(({ key, id }) => (
          <SwiperSlide key={id}>
            <iframe
              title='1'
              width='420'
              height='315'
              className='youtubeFrame'
              src={`https://www.youtube.com/embed/${key}`}
            ></iframe>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default TrailerCarousel;
