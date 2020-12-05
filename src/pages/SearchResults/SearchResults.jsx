import React, { useEffect, useState } from "react";
import Loader from "../../components/Loader/Loader";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { api_key } from "../../store/constants";
import noImage from "../../images/no-image.png";

import "./SearchResults.scss";

function SearchResults({ match }) {
  const moviesGenres = useSelector((state) => state.moviesGenres.data);

  const [search, setSearch] = useState({});
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchSearchResults = async () => {
      const response = await fetch(
        `https://api.themoviedb.org/3/search/multi?api_key=${api_key}&language=en-US&query=${match.params.name}&page=${page}&include_adult=false`
      );
      const data = await response.json();
      setSearch(data);
    };
    fetchSearchResults();
  }, [page]);

  // It returns genres of item
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

  // Genearate page buttons
  let pageButtons = "";
  if (search.total_pages > 1 && page === 1) {
    pageButtons = (
      <div
        className='pageButton'
        onClick={() => {
          setPage(page + 1);
          window.scrollTo(0, 0);
        }}
      >
        NEXT <i class='fas fa-chevron-right nextIcon'></i>
      </div>
    );
  } else if (search.total_pages > page && page > 1) {
    pageButtons = (
      <>
        <div
          className='pageButton'
          onClick={() => {
            setPage(page - 1);
            window.scrollTo(0, 0);
          }}
        >
          <i class='fas fa-chevron-left prevIcon'></i> PREV
        </div>
        <div
          className='pageButton'
          onClick={() => {
            setPage(page + 1);
            window.scrollTo(0, 0);
          }}
        >
          NEXT <i class='fas fa-chevron-right nextIcon'></i>
        </div>
      </>
    );
  } else if (search.total_pages === page) {
    pageButtons = (
      <div
        className='pageButton'
        onClick={() => {
          setPage(page - 1);
          window.scrollTo(0, 0);
        }}
      >
        <i class='fas fa-chevron-left prevIcon'></i> PREV
      </div>
    );
  }

  const size = Object.keys(search).length;

  if (size > 0) {
    // Generate search results
    const results = (
      <div className='results'>
        {search.results.map(
          ({ poster_path, title, genre_ids, id, vote_average }) => {
            console.log(genre_ids);
            return (
              <Link to={`/movie/${id}`} className='item' key={id}>
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
                  <div className='genre'>
                    {genre_ids !== undefined && getGenres(genre_ids)}
                  </div>
                  <div className='rating'>
                    <i className='fas fa-star star'></i>
                    {vote_average}
                  </div>
                </div>
              </Link>
            );
          }
        )}
      </div>
    );

    return (
      <>
      <Loader/>
      <div className='searchResults'>
        <div className='container-wrap'>
          <h1 className='titleSearch'>Search Results For Your Name</h1>
          {search.results.length ? (
            results
          ) : (
            <div className='noFound'>Nothing is found :(</div>
          )}
          <div className='pageButtons'>{pageButtons}</div>
        </div>
      </div>
      </>
    );
  }
  return <Loader/>;
}

export default SearchResults;
