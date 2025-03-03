import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const Chat = () => {
  const { userId } = useParams(); // ✅ Get userId from URL
  const { token } = useSelector((state) => state.auth);
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const [receiver, setReceiver] = useState(null);

  const BASE_URL = "http://localhost:3030/api/chat";

  // ✅ Fetch Chat Messages
  useEffect(() => {
    if (!userId) return;

    fetch(`${BASE_URL}/${userId}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          console.error("Chat Error:", data.error);
          return;
        }
        setMessages(data.messages || []);
        setReceiver(data.participants?.find((p) => p._id !== userId)); // ✅ Get receiver info
      })
      .catch((err) => console.error("Error fetching chat:", err));
  }, [userId, token]);

  // ✅ Handle Sending Message
  const handleSend = async (e) => {
    e.preventDefault();
    if (!text.trim()) return;

    try {
      const response = await fetch(`${BASE_URL}/${userId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ text }),
      });

      if (!response.ok) throw new Error("Failed to send message");

      const newMessage = await response.json();
      setMessages([...messages, newMessage]);
      setText("");
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-center mb-4">
        Chat with {receiver ? receiver.username : "User"}
      </h2>

      {/* ✅ Chat Messages */}
      <div className="h-64 overflow-y-auto border p-3 mb-4">
        {messages.length > 0 ? (
          messages.map((msg, index) => (
            <div key={index} className={`mb-2 ${msg.sender === userId ? "text-right" : ""}`}>
              <span className="inline-block bg-gray-200 px-3 py-1 rounded-lg">
                {msg.text}
              </span>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-center">No messages yet</p>
        )}
      </div>

      {/* ✅ Message Input */}
      <form onSubmit={handleSend} className="flex">
        <input
          type="text"
          className="w-full p-2 border rounded-l-lg"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type a message..."
        />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded-r-lg">
          Send
        </button>
      </form>
    </div>
  );
};

export default Chat;
