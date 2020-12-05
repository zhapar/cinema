import React, { useEffect, useState } from "react";
import Loader from "../../components/Loader/Loader";
import PeopleCarousel from "../../components/PeopleCarousel/PeopleCarousel";
import TrailerCarousel from "../../components/TrailerCarousel/TrailerCarousel";
import { api_key } from "../../store/constants";

import noImage from "../../images/no-image.png";

import "./MovieDetails.scss";

function MovieDetails({ match }) {
  const [movieDetails, setMovieDetails] = useState({});
  const [movieCredits, setMovieCredits] = useState({});
  const [movieTrailers, setMovieTrailers] = useState([]);
  const [movieReviews, setMovieReviews] = useState([]);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${match.params.id}?api_key=${api_key}&language=en-US`
      );
      const data = await response.json();
      setMovieDetails(data);
    };
    const fetchMovieCredits = async () => {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${match.params.id}/credits?api_key=${api_key}&language=en-US`
      );
      const data = await response.json();
      setMovieCredits(data);
    };
    const fetchMovieTrailers = async () => {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${match.params.id}/videos?api_key=${api_key}&language=en-US`
      );
      const data = await response.json();
      setMovieTrailers(data.results);
    };
    const fetchMovieReviews = async () => {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${match.params.id}/reviews?api_key=${api_key}&language=en-US`
      );
      const data = await response.json();
      setMovieReviews(data.results);
    };

    // Fetching
    fetchMovieDetails();
    fetchMovieCredits();
    fetchMovieTrailers();
    fetchMovieReviews();
  }, [match.params.id]);

  // To short text
  const shortText = (str, length = 100) => {
    const strArr = str.split(" ");
    return strArr.length < length
      ? str
      : strArr.filter((word, i) => i < length).join(" ") + "...";
  };

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

    const bgImage = `https://image.tmdb.org/t/p/original${backdrop_path}`;
    const rating = `${vote_average * 10}%`;

    return (
      <>
      <Loader/>
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
              src={
                poster_path
                  ? `https://image.tmdb.org/t/p/w300${poster_path}`
                  : noImage
              }
              alt={title}
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
          {movieTrailers.length ? (
            <TrailerCarousel trailers={movieTrailers} carouselName='Trailers' />
          ) : (
            <h3 className='noFound'>No trailers found :(</h3>
          )}
          <div className='reviews'>
            <h3 className='title-reviews'>Popular Reviews</h3>
            {movieReviews.length ? (
              movieReviews.map(({ author, content, id }) => (
                <div className='review' key={id}>
                  <h4 className='author'>{author}</h4>
                  <p className='text'>{shortText(content)}</p>
                </div>
              ))
            ) : (
              <div className='noFound'>No Reviews Found :(</div>
            )}
          </div>
        </div>
      </div>
      </>
    );
  }
  return <Loader/>;
}

export default MovieDetails;
