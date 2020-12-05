import React, { useEffect, useState } from "react";
import PeopleCarousel from "../../components/PeopleCarousel/PeopleCarousel";

import "./MovieDetails.scss";

function MovieDetails() {
  const [movieDetails, setMovieDetails] = useState({});
  const [movieCredits, setMovieCredits] = useState({});
  useEffect(() => {
    const fetchMovieDetails = async () => {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/724989?api_key=e72c32670258137d530fbad9bd33558f&language=en-US`
      );
      const data = await response.json();
      setMovieDetails(data);
    };
    const fetchMovieCredits = async () => {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/724989/credits?api_key=e72c32670258137d530fbad9bd33558f&language=en-US`
      );
      const data = await response.json();
      setMovieCredits(data);
    };
    const fetchMovieTrailers = async () => {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/724989/videos?api_key=e72c32670258137d530fbad9bd33558f&language=en-US`
      );
      const data = await response.json();
      console.log(data);
    };
    fetchMovieDetails();
    fetchMovieCredits();
    fetchMovieTrailers();
  }, []);
  const sizeDetails = Object.keys(movieDetails).length;
  const sizeCredits = Object.keys(movieCredits).length;
  if (sizeDetails > 0 && sizeCredits > 0) {
    const {
      title,
      overview,
      vote_average,
      genres,
      poster_path,
      backdrop_path,
    } = movieDetails;
    console.log(movieCredits.cast);
    const bgImage = `https://image.tmdb.org/t/p/original${backdrop_path}`;
    const rating = `${vote_average * 10}%`;
    return (
      <div className='movieDetails'>
        <div
          className='movieBg'
          style={{
            backgroundImage: `url(${bgImage})`,
          }}
        >
          <div className='darkBg'></div>
        </div>

        <div className='container-wrap'>
          <div className='movieDescription'>
            <img
              src={`https://image.tmdb.org/t/p/w300${poster_path}`}
              alt=''
              className='moviePoster'
            />
            <div className='movieText'>
              <h1 className='title'>{title}</h1>
              <p className='description'>{overview}</p>
              <div className='rating'>
                <div className='number'>{vote_average}</div>
                <div className='rating-outer'>
                  <div className='rating-inner' style={{ width: rating }}></div>
                </div>
              </div>
              <div className='genre'>
                {genres.map((genre, i, genres) =>
                  genres.length === i + 1 ? genre.name : `${genre.name} |`
                )}
              </div>
            </div>
          </div>
          <PeopleCarousel peoples={movieCredits.cast} carouselName='Cast' />
        </div>
      </div>
    );
  }
  return null;
}

export default MovieDetails;
