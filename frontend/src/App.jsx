import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import MyPosts from "./pages/MyPosts";
import Chat from "./pages/Chat";
import AddPost from "./pages/AddPost";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

// ✅ Private Route Component (Redirects to login if not authenticated)
const PrivateRoute = ({ element }) => {
  const { isAuthenticated } = useSelector((state) => state.auth);
  return isAuthenticated ? element : <Navigate to="/login" />;
};

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <div className="flex flex-grow">
          <Sidebar /> {/* ✅ Sidebar should be collapsible in small screens */}
          <div className="ml-64 mt-16 p-4 w-full">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              
              {/* ✅ Protected Routes (Only Logged-in Users Can Access) */}
              <Route path="/profile" element={<PrivateRoute element={<Profile />} />} />
              <Route path="/my-posts" element={<PrivateRoute element={<MyPosts />} />} />
              <Route path="/chat" element={<PrivateRoute element={<Chat />} />} />
              <Route path="/add-post" element={<PrivateRoute element={<AddPost />} />} />
            </Routes>
          </div>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
