import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api_key } from "./constants";

export const fetchMoviesGenres = createAsyncThunk(
  "posts/fetchMoviesGenres",
  async () => {
    const response = await fetch(
      `https://api.themoviedb.org/3/genre/movie/list?api_key=${api_key}`
    );
    const data = await response.json();
    return data.genres;
  }
);

const INIT_STATE = {
  data: [],
  status: "idle",
  error: null,
};

const moviesGenres = createSlice({
  name: "moviesGenres",
  initialState: INIT_STATE,
  extraReducers: {
    [fetchMoviesGenres.pending]: (state, action) => {
      state.status = "loading";
      state.error = null;
    },
    [fetchMoviesGenres.fulfilled]: (state, action) => {
      if (state.status === "loading") {
        state.data = action.payload;
        state.status = "succeeded";
      }
    },
    [fetchMoviesGenres.rejected]: (state, action) => {
      if (state.status === "loading") {
        state.status = "failed";
        state.error = action.payload;
      }
    },
  },
});

export default moviesGenres.reducer;
