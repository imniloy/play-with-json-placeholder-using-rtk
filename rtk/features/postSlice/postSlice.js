const fetch = require("node-fetch");
const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

const initialState = {
  loading: false,
  postData: {},
  error: "",
};

// fetch thunkMiddleware
const fetchPost = createAsyncThunk("post/fetchPost", async () => {
  const response = await fetch("https://jsonplaceholder.typicode.com/posts/1");

  const data = response.json();
  return data;
});

const postSlice = createSlice({
  name: "post",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchPost.pending, (state, action) => {
      state.loading = true;
      state.error = "";
    });

    builder.addCase(fetchPost.fulfilled, (state, action) => {
      state.loading = false;
      state.error = "";
      state.postData = action.payload;
    });

    builder.addCase(fetchPost.rejected, (state, action) => {
      state.loading = false;
      state.postData = {};
      state.error = action.error.message;
    });
  },
});

module.exports = postSlice.reducer;
module.exports.fetchPost = fetchPost;
