import React, { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ArtPage = (props) => {
  const { artId } = useParams();
  const [art, setArt] = useState(null); // Initialize state with null instead of an empty array
  const [artist, setArtist] = useState(null); // Initialize state with null instead of an empty array
  const actor = useSelector(state => state.actor);
  const user = useSelector(state => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch the art using the artId from the URL parameter
        const artResponse = await fetch(`http://localhost:5001/art/${artId}`);
        const artData = await artResponse.json();
        setArt(artData);

        // Check if artData has artistId before fetching artist details
        if (artData) {
          // Fetch the artist details using the artistId from artData
          const artistResponse = await fetch(`http://localhost:5001/artist/${artData.artistId}`);
          const artistData = await artistResponse.json();
          setArtist(artistData);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [artId]);

  const handleBuy = () => {
    if (!user) {
      toast.warn("Login in to buy this art");
    }
    else
      navigate(`/checkout/${artId}`);
  }



  console.log(artist, art);
  return (
    <>
      {art && artist && <section className="py-1 sm:py-1">
        <div className="container mx-auto px-4">

          <div className="lg:col-gap-12 xl:col-gap-16 mt-8 grid grid-cols-1 gap-12 lg:mt-12 lg:grid-cols-5 lg:gap-16">
            <div className="lg:col-span-3 lg:row-end-1">
              <div className="lg:flex lg:items-start">
                <div className="lg:order-2 lg:ml-5">
                  <div className="max-w-xl overflow-hidden rounded-lg">
                    {art && <img className="h-full w-full max-w-full object-cover" src={art.artPath} alt="" />}
                  </div>
                </div>

                <div className="mt-2 w-full lg:order-1 lg:w-32 lg:flex-shrink-0">
                </div>
              </div>
            </div>

            <div className="lg:col-span-2 lg:row-span-2 lg:row-end-2">
              <h1 className="sm: text-2xl font-bold text-gray-900 sm:text-3xl">{art.title}</h1>


              <div className="mt-2 flex select flex-wrap items-center gap-1">
                <h2 className=" text-base text-gray-900">Art Type:</h2>
                {art.category}
              </div>

              <div className="mt-2 flex select flex-wrap items-center gap-1">
                <h2 className=" text-base text-gray-900">Artist:</h2>
                {artist.artistId}
              </div>

              <div className="mt-2 flex select-none flex-wrap items-center gap-1">
                <h2 className="text-base text-gray-900">Date:</h2>
                {new Date(art.createdAt).toLocaleDateString()}
              </div>

              <div className="mt-2 flex select-none flex-wrap items-center gap-1">
                <h2 className="text-base text-gray-900">Size:</h2>
                {art.size}
              </div>

              <div className="lg:col-span-3 mt-3">
                <div className="border-b border-gray-300">
                  <nav className="flex gap-2">
                    <p className="border-b-2 border-gray-900 py-2 text-sm font-medium text-gray-900 hover:border-gray-400 hover:text-gray-800">Description</p>
                  </nav>
                </div>

                <div className="mt-1 flow-root sm:mt-1">
                  {art.description}
                </div>
              </div>




              {!actor && (
                <>
                  <div className="mt-10 flex flex-col items-center justify-around space-y-4 border-t border-b py-4 sm:flex-row sm:space-y-0">
                    <div className="flex items-end">
                      <h1 className="text-3xl font-bold ">₹{art.price}</h1>
                    </div>

                    <button type="button"
                      className="inline-flex items-center justify-center rounded-md border-2 border-transparent bg-gray-900 bg-none px-12 py-3 text-center text-base font-bold text-white transition-all duration-200 ease-in-out focus:shadow hover:bg-gray-800"
                      onClick={handleBuy}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="shrink-0 mr-3 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                      </svg>
                      Buy Now
                    </button>
                    <ToastContainer />
                  </div>
                  <ul className="mt-8 space-y-2">
                    <li className="flex items-center text-left text-sm font-medium text-gray-600">
                      <svg className="mr-2 block h-5 w-5 align-middle text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" className=""></path>
                      </svg>
                      Free shipping worldwide
                    </li>

                    <li className="flex items-center text-left text-sm font-medium text-gray-600">
                      <svg className="mr-2 block h-5 w-5 align-middle text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" className=""></path>
                      </svg>
                      Cancel Anytime
                    </li>
                  </ul>
                </>
              )}


            </div>


          </div>
        </div>
      </section>


      }
    </>
  )
};

export default ArtPage;
