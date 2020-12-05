import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMoviesGenres } from "./store/moviesGenres";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import HomePage from "./pages/Home/Home";
import MovieDetails from "./pages/MovieDetails/MovieDetails";
import Footer from "./components/Footer/Footer";

function App() {
  const moviesGenresStatus = useSelector((state) => state.moviesGenres.status);
  const dispatch = useDispatch();

  useEffect(() => {
    if (moviesGenresStatus === "idle") {
      dispatch(fetchMoviesGenres());
    }
  }, [moviesGenresStatus, dispatch]);

  return (
    <>
      <Navbar />
      {/* <HomePage /> */}
      <MovieDetails />
      <Footer />
    </>
  );
}

export default App;
