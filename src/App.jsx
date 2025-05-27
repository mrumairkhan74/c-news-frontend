import React, { useState, useEffect } from "react";
import axios from "axios";
import { BrowserRouter, Routes, Route } from "react-router-dom"; // react-router-dom is preferred
import Home from "./pages/Home";
import Logo from "./pages/Logo";
import Navbar from "./pages/Navbar";
import Footer from "./pages/Footer";
import CreatePost from "./pages/posts/CreatePost";
import Education from "./pages/AllNewsPages/Education";
import Games from "./pages/AllNewsPages/Games";
import Music from "./pages/AllNewsPages/Music";
import Technology from "./pages/AllNewsPages/Technology";
import Government from "./pages/AllNewsPages/Government";
import Protected from "./pages/Protected";
import Login from "./pages/posts/Login";
import Celebrity from "./pages/AllNewsPages/Celebrity";

const apiurl = import.meta.env.VITE_BACKEND_API;
const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Check login status on app load
    axios
      .get(`${apiurl}/user/verify`, { withCredentials: true })
      .then((res) => setUser(res.data.user))
      .catch(() => setUser(null));
  }, []);

  const handleLogout = async () => {
    await axios.get(`{apiurl}/user/logout`, {
      withCredentials: true,
    });
    setUser(null);
  };

  return (
    <BrowserRouter>
      <Logo />
      <Navbar user={user} onLogout={handleLogout} />
      <Routes>
        <Route
          path="/create"
          element={
            <Protected user={user}>
              <CreatePost />
            </Protected>
          }
        />
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/education" element={<Education />} />
        <Route path="/games" element={<Games />} />
        <Route path="/government" element={<Government />} />
        <Route path="/celebrity" element={<Celebrity />} />
        <Route path="/technology" element={<Technology />} />
        <Route path="/music" element={<Music />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
