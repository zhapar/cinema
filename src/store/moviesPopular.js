import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api_key } from "./constants";

export const fetchMoviesPopular = createAsyncThunk(
  "posts/fetchMoviesPopular",
  async () => {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/popular?api_key=${api_key}&language=en-US&page=1`
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

const moviesPopular = createSlice({
  name: "moviesPopular",
  initialState: INIT_STATE,
  extraReducers: {
    [fetchMoviesPopular.pending]: (state, action) => {
      state.status = "loading";
      state.error = null;
    },
    [fetchMoviesPopular.fulfilled]: (state, action) => {
      if (state.status === "loading") {
        state.data = action.payload;
        state.status = "succeeded";
      }
    },
    [fetchMoviesPopular.rejected]: (state, action) => {
      if (state.status === "loading") {
        state.status = "failed";
        state.error = action.payload;
      }
    },
  },
});

export default moviesPopular.reducer;
