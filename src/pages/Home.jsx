import React, { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";
import axios from "axios";
import Card from "./Card";
import Sponser from "./Sponser";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import GovernmentNews from "./NewsHome/GovernmentNews";
import EducationNews from "./NewsHome/EducationNews";
import GamesNews from "./NewsHome/GamesNews";
import TechnologyNews from "./NewsHome/TechnologyNews";
import MusicNews from "./NewsHome/MusicNews";
import CelebrityNews from "./NewsHome/CelebrityNews";

const apiurl = import.meta.env.VITE_BACKEND_API;
const Home = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const today = new Date();
  const formattedDate = today.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const GetPost = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.get(`${apiurl}/post/get`, {
        withCredentials: true,
      });
      setPosts(res.data.posts);
      setFilteredPosts(res.data.posts);
    } catch (err) {
      setError("Failed to fetch posts");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    GetPost();
  }, []);

  const handleSearch = (e) => {
    const keyword = e.target.value.toLowerCase();
    setSearchTerm(keyword);
    if (keyword.trim() === "") {
      setFilteredPosts(posts);
    } else {
      const filtered = posts.filter((post) =>
        post.title.toLowerCase().includes(keyword)
      );
      setFilteredPosts(filtered);
    }
  };

  return (
    <>
      <div className="flex lg:flex-row flex-col gap-6 m-5 h-full">
        {/* Left Panel */}
        <div className="lg:flex-[3] border-2 p-3 rounded-md shadow-sm h-auto max-h-[600px] overflow-y-auto">
          {loading && (
            <div className="flex justify-center items-center h-80 relative">
              <img
                src="/images/logo.png"
                className="animate-ping absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                alt="Loading..."
              />
            </div>
          )}
          {error && <p className="text-red-500">{error}</p>}

          <Swiper
            spaceBetween={30}
            slidesPerView={1}
            autoplay={{
              delay: 4000,
              disableOnInteraction: false,
            }}
            pagination={{ clickable: true }}
            modules={[Autoplay, Pagination]}
            className="w-full"
          >
            {filteredPosts.length > 0
              ? filteredPosts.slice(0, 3).map((p) => (
                  <SwiperSlide key={p._id}>
                    <div className="mb-6">
                      <img
                        src={
                          p.image
                            ? `data:image/png;base64,${p.image}`
                            : "/images/placeholder.png"
                        }
                        alt="News"
                      />
                      <h2 className="font-bold text-xl sm:text-2xl lg:text-3xl mb-1 px-2 text-red-700">
                        {p.title}
                      </h2>
                      <p className="text-sm sm:text-base text-gray-700 mb-2 px-2">
                        {p.content?.slice(0, 200)}...
                      </p>
                      <p className="text-xs sm:text-sm text-gray-400 mb-2 font-bold px-2">
                        {new Date(p.createdAt).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </p>
                      <Link
                        to={`/post/${p._id}`}
                        className="text-blue-500 hover:underline text-sm px-2"
                      >
                        Read More
                      </Link>
                    </div>
                  </SwiperSlide>
                ))
              : !loading && <p>No posts found.</p>}
          </Swiper>
        </div>

        {/* Right Panel - Search */}
        <div className="lg:flex-[1] border rounded-md shadow-md p-4 h-auto max-h-[600px]">
          <div className="flex items-center gap-2 mb-4">
            <input
              type="text"
              name="search"
              placeholder="Search by title"
              value={searchTerm}
              onChange={handleSearch}
              className="w-full p-2 rounded-md outline-none text-sm"
            />
            <FaSearch className="text-gray-600" />
          </div>
          <p className="text-gray-500 text-xs">
            Showing results for:{" "}
            <span className="text-black font-semibold">{searchTerm}</span>
          </p>
        </div>
      </div>

      <Card />

      <GovernmentNews />
      <EducationNews />
      <TechnologyNews />

      <GamesNews />
      <MusicNews />
      <CelebrityNews />

      <Sponser />
    </>
  );
};

export default Home;
