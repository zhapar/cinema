import React from "react";

// import Swiper core and required components
import SwiperCore, { Navigation, Autoplay, A11y } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/swiper.scss";
import "swiper/components/navigation/navigation.scss";

import "./PeopleCarousel.scss";

// install Swiper components
SwiperCore.use([Navigation, Autoplay, A11y]);

function PeopleCarousel({ peoples, carouselName }) {
  return (
    <div>
      <h2 className='title-people-carousel'>{carouselName}</h2>
      <Swiper
        id='people'
        observer='true'
        slidesPerView={2}
        spaceBetween={10}
        loop='true'
        observeparents='true'
        navigation
        centeredSlides='true'
        breakpoints={{
          300: {
            slidesPerView: 3,
          },
          400: {
            slidesPerView: 4,
          },
          700: {
            slidesPerView: 5,
          },
          900: {
            slidesPerView: 6,
          },
          1100: {
            slidesPerView: 7,
          },
        }}
        className='people-carousel'
      >
        {peoples.map(({ profile_path, name, id }) => {
          return profile_path !== null ? (
            <SwiperSlide key={id}>
              <div className='people'>
                <img
                  src={`https://image.tmdb.org/t/p/w300${profile_path}`}
                  alt='Fatman'
                />
                <h3 className='title'>{name}</h3>
              </div>
            </SwiperSlide>
          ) : (
            ""
          );
        })}
        <div className='bg-shadow'></div>
      </Swiper>
    </div>
  );
}

export default PeopleCarousel;
