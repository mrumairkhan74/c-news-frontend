import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaSearch } from "react-icons/fa";


const apiurl = import.meta.env.VITE_BACKEND_API;

const Education = () => {
  const [education, setEducation] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [expandedPostId, setExpandedPostId] = useState(null);

  const today = new Date();
  const formattedDate = today.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const educationNews = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.get(`${apiurl}/post/get/education`, {
        withCredentials: true,
      });
      const posts = res.data.posts || res.data;
      setEducation(posts);
      setFilteredPosts(posts); // initially show all
    } catch {
      setError("Something went wrong while fetching education news.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    educationNews();
  }, []);

  const handleSearch = (e) => {
    const keyword = e.target.value.toLowerCase();
    setSearchTerm(keyword);
    if (keyword.trim() === "") {
      setFilteredPosts(education);
    } else {
      const filtered = education.filter((post) =>
        post.title.toLowerCase().includes(keyword)
      );
      setFilteredPosts(filtered);
    }
  };

  const toggleReadMore = (id) => {
    setExpandedPostId((prevId) => (prevId === id ? null : id));
  };

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <img
          src="/images/logo.png" // Make sure this path is correct
          alt="Loading..."
          className="h-16 w-16 animate-spin"
        />
      </div>
    );
  if (error) return <p className="p-4 text-red-500">{error}</p>;

  return (
    <>
      <h1 className="text-center text-4xl tracking-wide font-mono p-5 m-5">
        Education News
      </h1>
      <div className="flex flex-col lg:flex-row gap-6 p-4 mb-10">
        {/* Posts Section */}
        <div className="flex-3 w-full lg:w-2/3">
          {filteredPosts.length === 0 && (
            <p className="text-gray-500">No matching posts found.</p>
          )}
          {filteredPosts.map((post) => (
            <div
              key={post._id}
              className="border p-4 rounded shadow-md flex flex-col sm:flex-row gap-4 items-start mb-6"
            >
              <img
                src={`data:image/jpeg;base64,${post.image}`}
                alt={post.title}
                className="w-full sm:w-48 object-contain h-48 rounded-md"
                onError={(e) => (e.target.style.display = "none")}
              />
              <div className="flex-1 p-4">
                <p className="text-gray-500 text-[12px] right">
                  {new Date(post.createdAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </p>
                <h1 className="text-xl font-semibold mb-2">{post.title}</h1>
                <p>
                  {expandedPostId === post._id
                    ? post.content
                    : `${post.content?.slice(0, 200)}...`}
                </p>
                <button
                  className="text-blue-500 text-[16px] mt-2"
                  onClick={() => toggleReadMore(post._id)}
                >
                  {expandedPostId === post._id ? "Show Less" : "Read More"}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Search Sidebar */}
        <div className="lg:w-1/4 border rounded-md shadow-md p-4 max-h-[500px] overflow-y-auto">
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

export default Education;
