import React from "react";
import { Link } from "react-router-dom";

const ArtCard = ({ price, title, artistId, imageUrl, isAvailable, _id }) => {
  return (
    <div className="relative m-4 p-4 w-full max-w-sm rounded-lg border border-gray-200 bg-white shadow-md hover:shadow-lg transition duration-300">
      <div className="relative h-48 overflow-hidden rounded-xl">
        <Link to={`/art/${_id}`}>
          <img
            className="object-cover w-full h-full transition-transform duration-300 transform hover:scale-105"
            src={imageUrl}
            alt="Product"
          />
        </Link>
      </div>

      <div className="mt-4">
        <Link to={`/art/${_id}`} className="block">
          <h5 className="text-lg font-semibold text-gray-800 hover:text-indigo-500 line-clamp-2">{title}</h5>
        </Link>
        {!isAvailable && (
          <p className="text-red-500 font-semibold">Out of Stock</p>
        )}
        <div className="mt-2 flex justify-between items-center">
          <p className="text-lg font-bold text-gray-800">₹{price}</p>
          {/* Your rating icons */}
        </div>
      </div>
    </div>
  );
};

export default ArtCard;