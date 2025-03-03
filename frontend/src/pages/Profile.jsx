import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/authSlice";

const Profile = () => {
  const dispatch = useDispatch();
  const { user, token } = useSelector((state) => state.auth);
  const [profile, setProfile] = useState(null);
  const [bio, setBio] = useState("");
  const [profilePicture, setProfilePicture] = useState("");

  const BASE_URL = "http://localhost:3030/api";

  // Fetch User Profile
  useEffect(() => {
    if (user) {
      fetch(`${BASE_URL}/users/${user._id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((res) => res.json())
        .then((data) => {
          setProfile(data);
          setBio(data.bio || "");
          setProfilePicture(data.profilePicture || "");
        })
        .catch((err) => console.error("Error fetching profile:", err));
    }
  }, [user, token]);

  // Update Profile
  const handleUpdate = async () => {
    try {
      const response = await fetch(`${BASE_URL}/users/${user._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ bio, profilePicture }),
      });

      if (!response.ok) throw new Error("Profile update failed");

      const updatedUser = await response.json();
      setProfile(updatedUser);
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  // Handle Logout
  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-center mb-4">My Profile</h2>

      {profile ? (
        <div className="text-center">
          <img
            src={profile.profilePicture || "https://via.placeholder.com/150"}
            alt="Profile"
            className="w-24 h-24 rounded-full mx-auto mb-4"
          />
          <h3 className="text-lg font-semibold">{profile.username}</h3>
          <p className="text-gray-600">{profile.email}</p>

          <div className="mt-4">
            <label className="block text-sm font-semibold">Bio:</label>
            <textarea
              className="w-full p-2 border rounded"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
            ></textarea>

            <label className="block text-sm font-semibold mt-3">Profile Picture URL:</label>
            <input
              type="text"
              className="w-full p-2 border rounded"
              value={profilePicture}
              onChange={(e) => setProfilePicture(e.target.value)}
            />

            <button
              onClick={handleUpdate}
              className="w-full bg-blue-500 text-white p-2 rounded mt-4"
            >
              Update Profile
            </button>
          </div>

          <button
            onClick={handleLogout}
            className="w-full bg-red-500 text-white p-2 rounded mt-4"
          >
            Logout
          </button>
        </div>
      ) : (
        <p className="text-center">Loading profile...</p>
      )}
    </div>
  );
};

export default Profile;
