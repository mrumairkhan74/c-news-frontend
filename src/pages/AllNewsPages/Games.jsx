import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaSearch } from "react-icons/fa";


const apiurl = import.meta.env.VITE_BACKEND_API;

const Games = () => {
  const [games, setGames] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [expandedPostId, setExpandedPostId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const gamesData = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.get(`${apiurl}/post/get/games`, {
        withCredentials: true,
      });
      const posts = res.data.posts || res.data;
      setGames(posts);
      setFilteredPosts(posts); // initially show all
    } catch {
      setError("Something went wrong while fetching Games news.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    gamesData();
  }, []);

  const handleSearch = (e) => {
    const keyword = e.target.value.toLowerCase();
    setSearchTerm(keyword);
    if (keyword.trim() === "") {
      setFilteredPosts(games);
    } else {
      const filtered = games.filter((post) =>
        post.title.toLowerCase().includes(keyword)
      );
      setFilteredPosts(filtered);
    }
  };

  const ToggleReadMore = (id) => {
    setExpandedPostId((prevId) => (prevId === id ? null : id));
  };

  return (
    <>
      <ToastContainer position="top-right" />
      <h1 className="text-center text-4xl font-mono tracking-wide my-6">
        Games News
      </h1>

      <div className="flex flex-col lg:flex-row gap-6 px-4 lg:px-10 mb-10">
        {/* Posts Section */}
        <div className="flex-1 space-y-6">
          {loading ? (
            <div className="flex justify-center items-center min-h-[200px]">
              <img
                src="/images/logo.png" // Make sure this path is correct
                alt="Loading..."
                className="h-16 w-16 animate-spin"
              />
            </div>
          ) : error ? (
            <p className="text-red-500 text-center">{error}</p>
          ) : filteredPosts.length === 0 ? (
            <p className="text-gray-500">No posts found.</p>
          ) : (
            filteredPosts.map((post) => (
              <div
                key={post._id}
                className="flex flex-col md:flex-row gap-4 p-4 border-b border-gray-300"
              >
                <img
                  src={`data:image/jpeg;base64,${post.image}`}
                  alt={post.title}
                  className="w-full md:w-24 h-24 object-cover rounded"
                />
                <div className="flex flex-col">
                <p className="text-gray-500 text-[12px] right">
                  {new Date(post.createdAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </p>
                  <h2 className="font-bold text-xl">{post.title}</h2>
                  <p className="text-gray-700 text-sm">
                    {expandedPostId === post._id
                      ? post.content
                      : `${post.content?.slice(0, 200)}...`}
                  </p>
                  <button
                    onClick={() => ToggleReadMore(post._id)}
                    className="mt-2 text-blue-600 text-sm"
                  >
                    {expandedPostId === post._id ? "Show Less" : "Read More"}
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Search Sidebar */}
        <div className="lg:w-1/3 w-full border rounded-md shadow-md p-4 max-h-[500px] overflow-y-auto">
          <div className="flex items-center gap-2 mb-4">
            <input
              type="text"
              name="search"
              placeholder="Search by title"
              value={searchTerm}
              onChange={handleSearch}
              className="w-full p-2 rounded-md outline-none text-sm border"
            />
            <FaSearch className="text-gray-600" />
          </div>
          {searchTerm && (
            <p className="text-gray-500 text-xs">
              Showing results for:{" "}
              <span className="text-black font-semibold">{searchTerm}</span>
            </p>
          )}
        </div>
      </div>
    </>
  );
};

export default Games;
