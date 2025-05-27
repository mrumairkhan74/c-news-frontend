import axios from "axios";
import React, { useState, useEffect } from "react";
import {Link} from 'react-router-dom'


const apiurl = import.meta.env.VITE_BACKEND_API;
const EducationNews = () => {
  const [education, setEducation] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);


  // for fetch data from Database
  const educationData = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.get(`${apiurl}/post/get/education`, {
        withCredentials: true,
      });
      const posts = res.data.posts || res.data;
      setEducation(posts);
    } catch {
      setError("Something went wrong while fetching Education news.");
    } finally {
      setLoading(false);
    }
  };

  // for Data Display
  useEffect(() => {
    educationData();
  }, []);

  // for Loading
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
    <div className="m-5">
      <h1 className="text-4xl text-center tracking-wide p-2 font-mono font-bold">
        Education News
      </h1>

      
      <div className="border-2 border-gray-400 rounded-md p-3">
      {education.map((post) => (
        <div
          key={post._id}
          className="flex flex-col md:flex-row gap-4 p-4 border-2 rounded-md border-b border-gray-300"
        >
          <img
            src={`data:image/jpeg;base64,${post.image}`}
            alt={post.title}
            className="w-full md:w-48 h-auto object-contain rounded"
          />
          <div className="flex flex-col">
            <p className="text-gray-500 text-[12px] right">
              {new Date(post.createdAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
            </p>
            <h2 className="font-bold text-xl">{post.title?.slice(0,20)}</h2>
            <p className="text-gray-700 text-sm">
              {`${post.content?.slice(0, 200)}...`}
            </p>
            <Link 
              to={`/education`}
              className="mt-2 text-blue-600 text-sm"
            >
              ReadMore
            </Link>
          </div>
        </div>
      ))}
      </div>
    </div>
  );
};

export default EducationNews;
