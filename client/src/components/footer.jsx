import React from "react";

const Footer = (props) => {
  return (
    <footer className="bg-gray-800 text-white py-4 mt-8">
      <div className="container mx-auto">
        <div className="flex justify-between items-center">
          <p className="text-sm">&copy; 2024 Your Website</p>
          {/* <ul className="flex space-x-4">
            <li><a href="#" className="hover:text-gray-300">Home</a></li>
            <li><a href="#" className="hover:text-gray-300">About</a></li>
            <li><a href="#" className="hover:text-gray-300">Services</a></li>
            <li><a href="#" className="hover:text-gray-300">Contact</a></li>
          </ul> */}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
