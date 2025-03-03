import React, { useState } from "react";
import { FaRegComment, FaHeart, FaPaperPlane } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { likePost, addComment } from "../redux/postSlice";
import { Link, useNavigate } from "react-router-dom";

const PostCard = ({ post }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, token } = useSelector((state) => state.auth);
  const [comment, setComment] = useState("");

  // Handle Like Post
  const handleLike = () => {
    if (!isAuthenticated) {
      navigate("/login"); // ✅ Redirect to Login if not logged in
      return;
    }
    dispatch(likePost({ postId: post._id, token }));
  };

  // Handle Add Comment
  const handleComment = (e) => {
    e.preventDefault();
    if (!isAuthenticated) {
      navigate("/login"); // ✅ Redirect to Login if not logged in
      return;
    }
    if (comment.trim() === "") return;
    dispatch(addComment({ postId: post._id, text: comment, token }));
    setComment("");
  };

  return (
    <div className="bg-white p-4 shadow-md rounded-lg mb-6 max-w-lg mx-auto">
      {/* Post Owner Info */}
      <div className="flex items-center space-x-3">
        <img
          src={post.user?.profilePicture || "https://via.placeholder.com/50"}
          alt="User"
          className="w-12 h-12 rounded-full border"
        />
        <div>
          <h3 className="font-semibold">{post.user?.username || "Unknown User"}</h3>
          <Link
            to={`/chat/${post.user?._id}`}
            className="text-blue-500 text-sm flex items-center space-x-2 hover:underline"
          >
            <FaPaperPlane /> <span>Send Message</span>
          </Link>
        </div>
      </div>

      {/* Post Content */}
      <p className="mt-3 text-lg">{post.content}</p>

      {/* Media (Image/Video) */}
      {post.media && (
        <div className="mt-3">
          {post.media.endsWith(".mp4") ? (
            <video src={post.media} controls className="w-full max-h-96 rounded-lg object-cover" />
          ) : (
            <img src={post.media} alt="Post" className="w-full max-h-96 rounded-lg object-cover" />
          )}
        </div>
      )}

      {/* Like & Comment Section */}
      <div className="flex justify-between items-center mt-4 border-t pt-3">
        <button onClick={handleLike} className="flex items-center space-x-2 text-red-500 hover:text-red-700">
          <FaHeart className="text-xl" /> <span>{post.likes.length} Likes</span>
        </button>
        <div className="flex items-center space-x-2 text-gray-600">
          <FaRegComment className="text-xl" /> <span>{post.comments.length} Comments</span>
        </div>
      </div>

      {/* Comments Section */}
      <div className="mt-4">
        {post.comments.length > 0 ? (
          post.comments.map((comment) => (
            <div key={comment._id} className="flex items-start space-x-3 mt-2">
              <img
                src={comment.user?.profilePicture || "https://via.placeholder.com/30"}
                alt="User"
                className="w-8 h-8 rounded-full border"
              />
              <div className="bg-gray-100 p-2 rounded-lg">
                <h4 className="font-semibold">{comment.user?.username}</h4>
                <p>{comment.text}</p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-sm">No comments yet</p>
        )}
      </div>

      {/* Add Comment (Only Logged-in Users) */}
      {isAuthenticated && (
        <form onSubmit={handleComment} className="flex items-center mt-4 border-t pt-3">
          <input
            type="text"
            className="w-full p-2 border rounded-lg"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Write a comment..."
          />
          <button type="submit" className="ml-2 bg-blue-500 text-white px-4 py-2 rounded-lg">
            Post
          </button>
        </form>
      )}
    </div>
  );
};

export default PostCard;
