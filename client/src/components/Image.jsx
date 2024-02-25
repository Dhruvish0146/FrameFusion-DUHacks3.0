import React from 'react';
import watermarkImage from './assets/watermark.jpg'; // Path to your watermark image

const Image = ({ art }) => {
  return (
    <div className="relative group w-full h-auto min-w-full min-h-full">
      <img
        src={art.artPath}
        alt={art.title}
        className="w-full h-auto object-cover"
      />
      <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-75 opacity-0 transition duration-300 ease-in-out group-hover:opacity-100">
        <p className="text-white text-lg font-bold">{art.title}</p>
      </div>
      <div
        className="absolute inset-0 flex items-center justify-center"
        style={{
          backgroundImage: `url(${watermarkImage})`,
          backgroundSize: 'cover',
          opacity: '0.1', // Adjust the opacity as needed
          pointerEvents: 'none', // Ensure the watermark is not clickable
        }}
      />
    </div>
  );
};

export default Image;
