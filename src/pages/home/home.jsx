import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchMoviesNowPlaying } from "../../store/moviesNowPlaying";
import { fetchMoviesUpcoming } from "../../store/moviesUpcoming";
import { fetchMoviesPopular } from "../../store/moviesPopular";
import { fetchMoviesTopRated } from "../../store/moviesTopRated";

import HomeHeader from "../../components/HomeHeader/HomeHeader";
import ItemCarousel from "../../components/ItemCarousel/ItemCarousel";

import "./Home.scss";

function HomePage() {
  const moviesUpcoming = useSelector((state) => state.moviesUpcoming.data);
  const moviesPopular = useSelector((state) => state.moviesPopular.data);
  const moviesNowPlaying = useSelector((state) => state.moviesNowPlaying.data);
  const moviesTopRated = useSelector((state) => state.moviesTopRated.data);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchMoviesNowPlaying());
    dispatch(fetchMoviesUpcoming());
    dispatch(fetchMoviesPopular());
    dispatch(fetchMoviesTopRated());
  }, []);

  const movies = (
    <>
      <ItemCarousel items={moviesUpcoming} carouselName='Upcoming' />
      <ItemCarousel items={moviesPopular} carouselName='Popular' />
      <ItemCarousel items={moviesNowPlaying} carouselName='Now Playing' />
      <ItemCarousel items={moviesTopRated} carouselName='Top Rated' />
    </>
  );
  return (
    <div className='home-page'>
      <HomeHeader />
      <div className='container-wrap'>{movies}</div>
    </div>
  );
}

export default HomePage;
