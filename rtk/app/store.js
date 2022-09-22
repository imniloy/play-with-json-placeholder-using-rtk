const { configureStore, getDefaultMiddleware } = require("@reduxjs/toolkit");
const { createLogger } = require("redux-logger");
const logger = createLogger();
const postReducer = require("../features/postSlice/postSlice");
const relatedPostsReducer = require("../features/relatedPostsSlice/relatedPostsSlice");

// Configure store
const store = configureStore({
  reducer: {
    post: postReducer,
    relatedPosts: relatedPostsReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

module.exports = store;
