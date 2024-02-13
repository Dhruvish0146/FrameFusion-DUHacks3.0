import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

const Home = () => {
  const name = useSelector((state) => state.name);
  const [arts, setArts] = useState([]);

  useEffect(() => {
    // Fetch arts from the server
    const fetchArts = async () => {
      try {
        const response = await fetch("http://localhost:5001/art/getArts"); // Replace with your API endpoint
        const data = await response.json();
        setArts(data);
      } catch (error) {
        console.error("Error fetching arts:", error);
      }
    };

    fetchArts();
  }, []);

  return (
    <>
    
      <div className="relative rounded-xl p-10 mb-[200px]">
        <div className="absolute inset-0 z-0 h-[500px] overflow-hidden bg-black">
        <img className="absolute object-cover w-full h-full opacity-50 bottom-0" src="https://images.unsplash.com/photo-1553949345-eb786bb3f7ba?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="A beautiful landscape" />

        </div>

        <div className="relative z-10 text-white">
          <div className="container mx-auto py-8">
            <div className="mb-8 text-center">
              <h1 className="mb-4 text-4xl font-bold lg:text-5xl">Buy Your Favorite Art with One Click</h1>
              <p className="text-lg opacity-75">Welcome, {name}! Step into a realm where art meets passion. Discover extraordinary pieces to enrich your world. Immerse yourself in a world of unique artworks. Unlock the perfect piece to enrich your space.</p>
            </div>
            <form className="mb-4 flex items-center justify-center">
              <input type="text" className="form-input w-2/3 rounded-l-lg px-4 py-3" placeholder="Try search 'Artist Name'" />
              <button className="ml-4 rounded-r-lg bg-gradient-to-r from-yellow-500 to-yellow-600 px-6 py-3 font-bold text-white transition duration-300 ease-in-out hover:from-yellow-600 hover:to-yellow-700">Search</button>
            </form>
          </div>
        </div>
      </div>


      <div className="container mx-auto mt-8">
        {!name && <h1 className="text-3xl mb-4">Welcome, Anonymous!</h1>}
        {name && <h1 className="text-3xl mb-4">Hello, {name}!</h1>}



          <h2 className="text-2xl mb-8">Art Gallery</h2>

          {/* Masonry grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {arts.map((art) => (
              <a href={`/art/${art._id}`} key={art._id} className="relative overflow-hidden bg-gray-200 rounded-lg shadow-md">
                <img
                  src={art.artPath}
                  alt={art.title}
                  className="w-full h-auto object-cover"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-75 opacity-0 transition duration-300 ease-in-out hover:opacity-100">
                  <p className="text-white text-center">{art.title}</p>
                </div>
              </a>
            ))}
          </div>
        </div>
      
    </>
  );
};

export default Home;
