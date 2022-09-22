const fetch = require("node-fetch");
const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

const initialState = {
  loading: false,
  posts: [],
  error: "",
};

// const queryString = querytitle.split(" ").join("&title_like=");
// fetch thunkMiddleware
const fetchRelatedPost = createAsyncThunk(
  "relatedPost/fetchRelatedPost",
  async (querytitle) => {
    const queryString = querytitle.split(" ").join("&title_like=");
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/posts?title_like=${queryString}`
    );

    const data = response.json();
    return data;
  }
);

const relatedPostsSlice = createSlice({
  name: "relatedPosts",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchRelatedPost.pending, (state, action) => {
      state.loading = true;
      state.error = "";
    });

    builder.addCase(fetchRelatedPost.fulfilled, (state, action) => {
      state.loading = false;
      state.error = "";
      state.posts = action.payload;
    });

    builder.addCase(fetchRelatedPost.rejected, (state, action) => {
      state.loading = false;
      state.posts = [];
      state.error = action.error.message;
    });
  },
});

module.exports = relatedPostsSlice.reducer;
module.exports.fetchRelatedPost = fetchRelatedPost;
