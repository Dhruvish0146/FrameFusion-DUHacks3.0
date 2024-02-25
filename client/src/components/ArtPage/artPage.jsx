import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Image from "../Image";
import { Link } from "react-router-dom";
import Name from "../Name";

const ArtPage = (props) => {
  const { artId } = useParams();
  const [art, setArt] = useState(null);
  const [artist, setArtist] = useState(null);
  const actor = useSelector((state) => state.actor);
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const artResponse = await fetch(`http://localhost:5001/art/${artId}`);
        const artData = await artResponse.json();
        setArt(artData);

        if (artData) {
          const artistResponse = await fetch(
            `http://localhost:5001/artist/${artData.artistId}`
          );
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
    } else navigate(`/checkout/${artId}`);
  };

  return (
    <>
      {art && artist && (
        <section className="mx-36 max-w-screen max-h-full p-8">
          <div className="m-4 max-w-full rounded-md border border-gray-100 text-gray-600 shadow-md">
            <div className="relative flex h-full flex-col text-gray-600 md:flex-row">
              <div className="relative p-10 md:w-4/6">
                <div className="flex flex-col md:flex-row">
                  <h2 className="mb-auto text-3xl font-bold">
                    <Name name={art.title} size="25px" />
                  </h2>
                </div>
                <div className="mt-2 flex select flex-wrap items-center gap-1">
                  <Link
                    to={`/profile/artist/${artist._id}`}
                    className="italic hover:underline text-gray-400"
                  >
                    {artist.artistId}
                  </Link>
                </div>
                <div className="mt-2 flex select flex-wrap items-center gap-1">
                  {art.category}
                </div>
                <div className="mt-2 flex select-none flex-wrap items-center gap-1">
                  {new Date(art.createdAt).toLocaleDateString()}
                </div>
                <div className="mt-2 flex select-none flex-wrap items-center gap-1">
                  {art.size}
                </div>
                <div className="lg:col-span-3 mt-3">
                  <div className="border-b border-gray-300">
                    <nav className="flex gap-2">
                      <p className="border-b-2 border-gray-900 py-2 text-sm font-medium text-gray-900 hover:border-gray-400 hover:text-gray-800">
                        Description
                      </p>
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
                        <h1 className="text-3xl font-bold">₹{art.price}</h1>
                      </div>

                      {art.isAvailable ? (
                        <button
                          type="button"
                          className="mr-2 mb-4 flex cursor-pointer items-center justify-center rounded-md bg-emerald-400 py-2 px-8 text-center text-white transition duration-150 ease-in-out hover:translate-y-1 hover:bg-emerald-500"
                          onClick={handleBuy}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="shrink-0 mr-3 h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth="2"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                            />
                          </svg>
                          Buy Now
                        </button>
                      ) : (
                        <div className="text-red-500 font-bold">Out of Stock</div>
                      )}
                      <ToastContainer />
                    </div>
                    <ul className="mt-8 space-y-2">
                      <li className="flex items-center text-left text-sm font-medium text-gray-600">
                        <svg
                          className="mr-2 block h-5 w-5 align-middle text-gray-500"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18 .5a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                          />
                        </svg>
                        Free shipping worldwide
                      </li>

                      <li className="flex items-center text-left text-sm font-medium text-gray-600">
                        <svg
                          className="mr-2 block h-5 w-5 align-middle text-gray-500"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                          />
                        </svg>
                        Cancel Anytime
                      </li>
                    </ul>
                  </>
                )}
              </div>
              <div className="mx-auto flex items-center px-5 pt-1 md:p-8">
                <div className="lg:order-2 lg:ml-5">
                  <div className="max-w-xl overflow-hidden rounded-lg">
                    {art && (
                      <Image
                        art={art}
                        className="w-auto h-auto min-w-full min-h-full"
                        // Adjust min-width and min-height as needed
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default ArtPage;
