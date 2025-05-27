import axios from "axios";
import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { Link } from "react-router";

const apiurl = import.meta.env.VITE_BACKEND_API;

const Card = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const GetPost = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.get(`${apiurl}/post/get`, {
        withCredentials: true,
      });
      setPosts(res.data.posts);
    } catch (err) {
      setError("Failed to fetch posts");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    GetPost();
  }, []);

  return (
    <>
      <h1 className="text-center w-full block m-3 text-2xl sm:text-3xl uppercase font-bold tracking-wide animate-bounce text-red-700">
        Latest News
      </h1>

      <div className="shadow-md p-3 border-2 max-h-[600px] h-auto rounded-md m-2 sm:m-5">
        {loading && <p>Loading posts...</p>}
        {error && <p className="text-red-500">{error}</p>}
        {!loading && !error && posts.length === 0 && <p>No posts available.</p>}

        {!loading && !error && posts.length > 0 && (
          <Swiper
            spaceBetween={30}
            pagination={{ clickable: true }}
            autoplay={{
              delay: 4000,
              disableOnInteraction: false,
            }}
            breakpoints={{
              640: {
                slidesPerView: 1,
              },
              768: {
                slidesPerView: 2,
              },
              1024: {
                slidesPerView: 3,
              },
            }}
            modules={[Autoplay, Pagination]}
          >
            {posts.map((post) => (
              <SwiperSlide key={post._id}>
                <div className="border mb-10 rounded-md p-3 shadow-sm flex flex-col h-full">
                  {post.image ? (
                    <img
                      src={`data:image/png;base64,${post.image}`}
                      alt={post.title}
                      className="w-full h-40 sm:h-46 md:h-52 object-cover rounded-md mb-3"
                    />
                  ) : (
                    <div className="w-full h-48 bg-gray-200 rounded-md mb-3 flex items-center justify-center text-gray-500">
                      No Image
                    </div>
                  )}

                  <h2 className="text-lg font-bold mb-2">
                    {post.title?.slice(0, 40)}...
                  </h2>
                  <p className="text-sm text-gray-600 mb-3">
                    {post.content?.slice(0, 100)}...
                  </p>

                  <Link
                    to={`/post/${post._id}`}
                    className="mt-auto bg-blue-500 text-white px-4 py-2 text-sm rounded-md hover:bg-blue-600 transition"
                  >
                    Read More
                  </Link>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>
    </>
  );
};

export default Card;
