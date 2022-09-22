const store = require("./app/store");
const { fetchPost } = require("./features/postSlice/postSlice");
const {
  fetchRelatedPost,
} = require("./features/relatedPostsSlice/relatedPostsSlice");

store.subscribe(() => {
  //   console.log(store.getState());
});

// dispatch actions
(async function () {
  await store.dispatch(fetchPost());
  const querytitle = await store.getState().post?.postData?.title;
  await store.dispatch(fetchRelatedPost(querytitle));
})();
