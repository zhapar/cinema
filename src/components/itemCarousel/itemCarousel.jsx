import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import noImage from "../../images/no-image.png";

// import Swiper core and required components
import SwiperCore, { Navigation, Autoplay, A11y } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/swiper.scss";
import "swiper/components/navigation/navigation.scss";

import "./ItemCarousel.scss";

// install Swiper components
SwiperCore.use([Navigation, Autoplay, A11y]);

function ItemCarousel({ items, carouselName }) {
  const moviesGenres = useSelector((state) => state.moviesGenres.data);

  const getGenres = (ids) => {
    const genresArr = moviesGenres.filter((genre) =>
      genre.id === ids[0] || genre.id === ids[1] ? genre.name : null
    );
    let genresName = "";
    if (genresArr.length === 1) genresName = genresArr[0].name;
    else if (genresArr.length > 1)
      genresName = `${genresArr[0].name} | ${genresArr[1].name}`;
    return genresName;
  };

  if (items.length) {
    return (
      <div>
        <h2 className='title-carousel'>{carouselName}</h2>
        <Swiper
          id='items'
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
          className='item-carousel'
        >
          {items.map(({ poster_path, title, vote_average, id, genre_ids }) => (
            <SwiperSlide key={id}>
              <Link to={`/movie/${id}`} className='item'>
                <img
                  src={
                    poster_path
                      ? `https://image.tmdb.org/t/p/w300${poster_path}`
                      : noImage
                  }
                  alt={title}
                />
                <h3 className='title'>{title}</h3>
                <div className='add_data'>
                  <div className='genre'>{getGenres(genre_ids)}</div>
                  <div className='rating'>
                    <i className='fas fa-star star'></i>
                    {vote_average}
                  </div>
                </div>
              </Link>
            </SwiperSlide>
          ))}
          <div className='bg-shadow'></div>
        </Swiper>
        <div className='separator'></div>
      </div>
    );
  }

  return null;
}

export default ItemCarousel;
