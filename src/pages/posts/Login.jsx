import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const apiurl = import.meta.env.VITE_BACKEND_API;

const Login = ({ setUser }) => {
  // receive setUser prop to save logged user
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await axios.post(
        `${apiurl}/user/login`,
        { email, password },
        { withCredentials: true }
      );
      console.log("User data from backend:", res.data.user);
      setUser(res.data.user);
      toast.success(`${res.data.user.email} Login Successfully`);

      if (res.data.user.email === "mrumairkhan74@gmail.com") {
        console.log("Redirecting admin to /create");
        navigate("/create");
      } else {
        console.log("Redirecting user to /");
        navigate("/");
      }
    } catch (err) {
      setError("Something went wrong");
      toast.error(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <ToastContainer position="top-right" />
      <div className="relative w-full h-[600px]">
        <div className="absolute w-[400px] h-[500px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ">
          <form
            onSubmit={handleLogin}
            className="flex flex-col w-full border-3 rounded-md border-gray-300 p-5"
          >
            <img
              src="./images/logo.png"
              className="w-[100px] h-[100px] flex items-center justify-center m-auto animate-bounce mix-blend-multiply"
              alt=""
            />
            <input
              type="email"
              className="w-full p-2 bg-gray-300 rounded-md my-2"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={loading}
            />
            <input
              type="password"
              className="w-full p-2 bg-gray-300 rounded-md my-2"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={loading}
            />
            <button
              type="submit"
              className="w-full p-2 bg-gray-300 rounded-md my-2 flex justify-center items-center"
              disabled={loading}
            >
              {loading ? (
                <img
                  src="https://i.gifer.com/ZZ5H.gif"
                  alt="loading"
                  className="w-6 h-6"
                />
              ) : (
                "Submit"
              )}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
