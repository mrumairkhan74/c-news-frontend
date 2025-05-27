import React from "react";

const Sponser = () => {
  return (
    <>
      <h1 className="block w-full m-auto text-center text-3xl font-bold tracking-wide uppercase my-4">
        Sponsors
      </h1>
      <div className="m-4 p-5 bg-gray-300 rounded-md flex flex-wrap justify-center items-center gap-6">
        <img
          src="./images/ptvsport.png"
          alt="Ptv Sport"
          className="w-24 h-24 object-contain grayscale"
        />
        <img
          src="./images/geonews.png"
          alt="Geo News"
          className="w-24 h-24 object-contain grayscale"
        />
        <img
          src="./images/expressnews.png"
          alt="Express News"
          className="w-24 h-24 object-contain grayscale"
        />
        <img
          src="./images/ptvnews.png"
          alt="PTV News"
          className="w-24 h-24 object-contain grayscale"
        />
        <img
          src="./images/arynews.png"
          alt="AryNews"
          className="w-24 h-24 object-contain grayscale"
        />
      </div>
    </>
  );
};

export default Sponser;
