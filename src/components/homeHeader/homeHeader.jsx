import React from "react";
import { useSelector } from "react-redux";
import PosterSlide from "../PosterSlide/PosterSlide";

// import Swiper core and required components
import SwiperCore, { Navigation, Pagination, Autoplay, A11y } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/swiper.scss";
import "swiper/components/navigation/navigation.scss";
import "swiper/components/pagination/pagination.scss";
// install Swiper components
SwiperCore.use([Navigation, Pagination, Autoplay, A11y]);

function HomeHeader() {
  const nowPlayingMovies = useSelector((state) =>
    state.moviesNowPlaying.data.slice(1, 4)
  );

  if (nowPlayingMovies.length) {
    return (
      <Swiper
        id='main'
        observer='true'
        loop='true'
        observeparents='true'
        autoplay={{ delay: 5000 }}
        pagination={{ clickable: true }}
      >
        {nowPlayingMovies.map(
          ({ id, title, overview, vote_average, backdrop_path, genre_ids }) => (
            <SwiperSlide key={id}>
              <PosterSlide
                id={id}
                title={title}
                description={overview}
                rating={vote_average}
                imageUrl={backdrop_path}
                genreIds={genre_ids}
              />
            </SwiperSlide>
          )
        )}
      </Swiper>
    );
  }
  return null;
}

export default HomeHeader;
