import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api_key } from "./constants";

export const fetchMoviesNowPlaying = createAsyncThunk(
  "posts/fetchMoviesNowPlaying",
  async () => {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/now_playing?api_key=${api_key}&language=en-US&page=1`
    );
    const data = await response.json();
    return data.results;
  }
);

const INIT_STATE = {
  data: [],
  status: "idle",
  error: null,
};

const moviesNowPlaying = createSlice({
  name: "moviesNowPlaying",
  initialState: INIT_STATE,
  extraReducers: {
    [fetchMoviesNowPlaying.pending]: (state, action) => {
      state.status = "loading";
      state.error = null;
    },
    [fetchMoviesNowPlaying.fulfilled]: (state, action) => {
      if (state.status === "loading") {
        state.data = action.payload;
        state.status = "succeeded";
      }
    },
    [fetchMoviesNowPlaying.rejected]: (state, action) => {
      if (state.status === "loading") {
        state.status = "failed";
        state.error = action.payload;
      }
    },
  },
});

export default moviesNowPlaying.reducer;
