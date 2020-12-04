import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api_key } from "./constants";

export const fetchMoviesUpcoming = createAsyncThunk(
  "posts/fetchMoviesUpcoming",
  async () => {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/upcoming?api_key=${api_key}&language=en-US&page=1`
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

const moviesUpcoming = createSlice({
  name: "moviesUpcoming",
  initialState: INIT_STATE,
  extraReducers: {
    [fetchMoviesUpcoming.pending]: (state, action) => {
      state.status = "loading";
      state.error = null;
    },
    [fetchMoviesUpcoming.fulfilled]: (state, action) => {
      if (state.status === "loading") {
        state.data = action.payload;
        state.status = "succeeded";
      }
    },
    [fetchMoviesUpcoming.rejected]: (state, action) => {
      if (state.status === "loading") {
        state.status = "failed";
        state.error = action.payload;
      }
    },
  },
});

export default moviesUpcoming.reducer;
