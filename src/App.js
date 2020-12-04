import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMoviesGenres } from "./store/moviesGenres";
import "./App.css";
import HomePage from "./pages/home/home";

function App() {
  const moviesGenresStatus = useSelector((state) => state.moviesGenres.status);
  const dispatch = useDispatch();

  useEffect(() => {
    if (moviesGenresStatus === "idle") {
      dispatch(fetchMoviesGenres());
    }
  }, [moviesGenresStatus, dispatch]);

  return <HomePage />;
}

export default App;
