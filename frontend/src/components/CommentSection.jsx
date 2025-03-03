import React, { useState } from "react";
import { useSelector } from "react-redux";

const CommentSection = ({ post }) => {
  const { user } = useSelector((state) => state.auth);
  const [comment, setComment] = useState("");

  const handleComment = () => {
    if (!user) {
      alert("You need to login to comment.");
      return;
    }
    console.log("Comment added:", comment);
    setComment("");
  };

  return (
    <div className="mt-4">
      <h3 className="text-lg font-bold">Comments</h3>
      <div className="space-y-2">
        {post.comments.map((c, index) => (
          <div key={index} className="bg-gray-200 p-2 rounded">
            {c.text}
          </div>
        ))}
      </div>

      {user && (
        <div className="mt-2 flex space-x-2">
          <input
            type="text"
            placeholder="Write a comment..."
            className="flex-1 p-2 border rounded"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <button
            onClick={handleComment}
            className="bg-blue-500 text-white p-2 rounded"
          >
            Post
          </button>
        </div>
      )}
    </div>
  );
};

export default CommentSection;
