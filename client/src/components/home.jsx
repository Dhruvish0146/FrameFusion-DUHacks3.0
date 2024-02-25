import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import img1 from "./assets/img.jpg"
import img2 from "./assets/img2.jpg"
import img3 from "./assets/img3.jpg"
import img4 from "./assets/img4.jpg"
import img5 from "./assets/img5.jpg"
import img6 from "./assets/img6.jpg"
import ArtCard from "./ArtCart";
import Fuse from 'fuse.js'
// import axios from "axios";

const Home = () => {
  // const [artists, setArtists] = useState([]);
  const name = useSelector((state) => state.name);
  const [arts, setArts] = useState([]);
  // const arts = useSelector(state => state.arts);
  const img = [img1, img2, img3, img4, img5, img6];
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [filteredArts, setFilteredArts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const fuse = new Fuse(arts, {
    keys: ["title",],
    threshold: 0.3,
  })

  useEffect(() => {
    // Fetch arts from the server
    const fetchArts = async () => {
      try {
        const response = await fetch("http://localhost:5001/art/getArts"); // Replace with your API endpoint
        const data = await response.json();
        setArts(data);
        setFilteredArts(data);
      } catch (error) {
        console.error("Error fetching arts:", error);
      }
    };

    fetchArts();
  }, []);

  // useEffect(() => {
  //   const fetchArtists = async () => {
  //     try {
  //       const response = await axios.get('http://localhost:5001/artist/getAllArtist'); // Replace 'your_api_endpoint_here' with your actual endpoint
  //       setArtists(response.data);
  //     } catch (error) {
  //       console.error('Error fetching artists:', error);
  //     }
  //   };

  //   fetchArtists();
  // }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        (prevIndex + 1) % img.length
      );
    }, 3000); // Change the background image every 5 seconds
    setFilteredArts(arts);
    return () => clearInterval(intervalId);
  }, [arts, img.length]);

  const handleSearch = (event) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);

    if (query.length > 0) {
      const results = fuse.search(query);
      setFilteredArts(results.map((r) => r.item));
    } else {
      setFilteredArts(arts);
    }
  };
  return (
    <>
      <div style={{
        background: `linear-gradient(to bottom right, #030637, #3C0753, #720455, #910A67)`,
      }}></div>
      <div className="relative rounded-xl p-10 mb-[200px]">
        <div className="absolute inset-0 z-0 h-[500px] overflow-hidden bg-black">
          <img
            className="absolute object-cover w-full h-full opacity-50 bottom-0"
            src={img[currentImageIndex]}
            alt="A beautiful landscape"
          />
        </div>

        <div className="relative z-10 text-white">
          <div className="container mx-auto py-8">
            <div className="mb-8 text-center">
              <h1 className="mb-4 text-4xl font-bold lg:text-5xl">
                Buy Your Favorite Art with One Click
              </h1>
              <p className="text-lg opacity-75">
                Welcome, {name}! Step into a realm where art meets passion.
                Discover extraordinary pieces to enrich your world. Immerse
                yourself in a world of unique artworks. Unlock the perfect piece
                to enrich your space.
              </p>
            </div>
            <form className="mb-4 flex items-center justify-center">
              <input
                type="text"
                className="form-input w-2/3 rounded-lg px-4 py-3 text-black"
                placeholder="Try search 'Art Name'"
                onChange={handleSearch}
                value={searchQuery}
              />
            
            </form>
          </div>
        </div>
      </div>
      <div className="container mx-auto px-4 mt-8">


        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">

          {filteredArts
            .slice()
            .sort((a, b) =>
              a.isAvailable === b.isAvailable ? 0 : a.isAvailable ? -1 : 1
            )
            .map((art) => (
              <div key={art._id} className="hover:scale-105">
                <ArtCard
                  price={art.price}
                  title={art.title}
                  artistId={art.artistId}
                  imageUrl={art.artPath}
                  isAvailable={art.isAvailable}
                  _id={art._id}
                />
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default Home;
