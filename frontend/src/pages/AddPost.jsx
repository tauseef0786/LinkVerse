import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createPost } from "../redux/postSlice"; // ✅ Correct Import
import { useNavigate } from "react-router-dom";

const AddPost = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token, isAuthenticated } = useSelector((state) => state.auth);
  const [content, setContent] = useState("");
  const [media, setMedia] = useState("");

  if (!isAuthenticated) {
    navigate("/login"); // Redirect if not logged in
    return null;
  }

  const handlePost = (e) => {
    e.preventDefault();
    dispatch(createPost({ content, media, token })).then((result) => {
      if (!result.error) {
        navigate("/"); // Redirect to home after posting
      }
    });
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-center mb-4">Add New Post</h2>

      <form onSubmit={handlePost} className="space-y-4">
        <textarea
          placeholder="What's on your mind?"
          className="w-full p-2 border rounded"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        ></textarea>

        <input
          type="text"
          placeholder="Media URL (optional)"
          className="w-full p-2 border rounded"
          value={media}
          onChange={(e) => setMedia(e.target.value)}
        />

        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded"
        >
          Post
        </button>
      </form>
    </div>
  );
};

export default AddPost;
