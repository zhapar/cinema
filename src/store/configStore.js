import { configureStore } from "@reduxjs/toolkit";
import moviesNowPlaying from "./moviesNowPlaying";
import moviesGenres from "./moviesGenres";
import moviesUpcoming from "./moviesUpcoming";
import moviesPopular from "./moviesPopular";
import moviesTopRated from "./moviesTopRated";

export default configureStore({
  reducer: {
    moviesNowPlaying,
    moviesGenres,
    moviesUpcoming,
    moviesPopular,
    moviesTopRated,
  },
});
