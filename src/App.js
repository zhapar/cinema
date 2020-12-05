import React, { useEffect } from "react";
import { Route, Redirect, Switch } from "react-router-dom";
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
      <Switch>
        <Route exact path='/' component={HomePage} />
        <Route exact path='/movie/:id' component={MovieDetails} />
      </Switch>
      <Footer />
    </>
  );
}

export default App;
