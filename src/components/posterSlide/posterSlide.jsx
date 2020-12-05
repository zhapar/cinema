import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import "./PosterSlide.scss";

function PosterSlide({ title, description, imageUrl, rating, genreIds, id }) {
  const moviesGenres = useSelector((state) => state.moviesGenres.data);

  let genres = "";
  if (moviesGenres) {
    const genresArr = moviesGenres.filter((genre) =>
      genre.id === genreIds[0] || genre.id === genreIds[1] ? genre.name : null
    );
    genres = `${genresArr[0] ? `${genresArr[0].name} |` : ""}  ${
      genresArr[1] ? `${genresArr[1].name} |` : ""
    }`;
  }

  const link = `url(https://image.tmdb.org/t/p/original${imageUrl})`;
  return (
    <div
      className='poster-slide'
      style={{
        backgroundImage: link,
      }}
    >
      <div className='bg-dark'></div>
      <div className='container'>
        <div className='movie-details'>
          <h2 className='title'>{title}</h2>
          <p className='description'>{description}</p>
          <div className='info'>
            <div className='genre'>{genres}</div>
            <div className='rating'>
              <i className='fas fa-star'></i> {rating}
            </div>
          </div>
          <Link to={`/movie/${id}`} className='watch-button'>
            <i className='fas fa-play'></i> WATCH
          </Link>
        </div>
      </div>
    </div>
  );
}

export default PosterSlide;
