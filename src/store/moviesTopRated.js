import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api_key } from "./constants";

export const fetchMoviesTopRated = createAsyncThunk(
  "posts/fetchMoviesTopRated",
  async () => {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/top_rated?api_key=${api_key}&language=en-US&page=1`
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

const moviesTopRated = createSlice({
  name: "moviesTopRated",
  initialState: INIT_STATE,
  extraReducers: {
    [fetchMoviesTopRated.pending]: (state, action) => {
      state.status = "loading";
      state.error = null;
    },
    [fetchMoviesTopRated.fulfilled]: (state, action) => {
      if (state.status === "loading") {
        state.data = action.payload;
        state.status = "succeeded";
      }
    },
    [fetchMoviesTopRated.rejected]: (state, action) => {
      if (state.status === "loading") {
        state.status = "failed";
        state.error = action.payload;
      }
    },
  },
});

export default moviesTopRated.reducer;
