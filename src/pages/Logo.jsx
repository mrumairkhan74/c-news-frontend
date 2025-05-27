import React, { useEffect, useState } from 'react';
import './logo.css';

const Logo = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const formattedDate = currentTime.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const formattedTime = currentTime.toLocaleTimeString("en-US", {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true,
  });

  return (
    <div className="flex flex-col items-center justify-center text-center mt-6 p-4 sm:p-6">
      <img 
        src="/images/logo.png" 
        alt="Logo" 
        className="logo-animation mix-blend-darken w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 drop-shadow-md rounded-lg mb-4"
      />

      <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-3 text-gray-700 font-mono text-center">
        <p className="text-sm sm:text-base text-gray-500 mb-2 sm:mb-0">{formattedDate}</p>
        <span className="bg-blue-500 text-white font-semibold tracking-wide text-sm sm:text-base p-2 rounded-md">
          ⏱ {formattedTime}
        </span>
      </div>
    </div>
  );
};

export default Logo;
