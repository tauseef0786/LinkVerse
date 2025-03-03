import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const BASE_URL = "http://localhost:3030/api/posts";

// 1️⃣ Fetch All Posts
export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
  const response = await fetch(`${BASE_URL}`);
  if (!response.ok) {
    throw new Error("Failed to fetch posts");
  }
  return response.json();
});

// 2️⃣ Create a Post (Fixing Duplicate Export)
export const createPost = createAsyncThunk("posts/createPost", async ({ content, media, token }) => {
  const response = await fetch(`${BASE_URL}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ content, media }),
  });

  if (!response.ok) {
    throw new Error("Failed to create post");
  }

  return response.json();
});

// 3️⃣ Like a Post
export const likePost = createAsyncThunk("posts/likePost", async ({ postId, token }) => {
  const response = await fetch(`${BASE_URL}/${postId}/like`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to like post");
  }

  return response.json();
});

// 4️⃣ Comment on a Post
export const addComment = createAsyncThunk("posts/addComment", async ({ postId, text, token }) => {
  const response = await fetch(`${BASE_URL}/${postId}/comment`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ text }),
  });

  if (!response.ok) {
    throw new Error("Failed to add comment");
  }

  return response.json();
});

const postSlice = createSlice({
  name: "posts",
  initialState: {
    posts: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = action.payload;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(createPost.fulfilled, (state, action) => {
        state.posts.push(action.payload);
      })
      .addCase(likePost.fulfilled, (state, action) => {
        const updatedPost = action.payload;
        state.posts = state.posts.map((post) => (post._id === updatedPost._id ? updatedPost : post));
      })
      .addCase(addComment.fulfilled, (state, action) => {
        const updatedPost = action.payload;
        state.posts = state.posts.map((post) => (post._id === updatedPost._id ? updatedPost : post));
      });
  },
});

// ✅ Fix: Only ONE export statement
export default postSlice.reducer;
