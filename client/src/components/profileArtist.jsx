import React from "react";
import { Link,  } from "react-router-dom";

import { useSelector } from "react-redux";

const ProfileArtist = () => {
  const currentUser = useSelector(state => state.user);
  

  return (
    <div>
      {currentUser ? (
        <>
          <main className="profile-page">
            <section className="relative block h-500-px">
              <div className="absolute top-0 w-full h-full bg-center bg-cover" style={{
                backgroundImage: `url('https://images.unsplash.com/photo-1499336315816-097655dcfbda?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=crop&amp;w=2710&amp;q=80')`
              }}>
                <span id="blackOverlay" className="w-full h-full absolute opacity-50 bg-black"></span>
              </div>
              <div className="top-auto bottom-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden h-70-px" style={{ transform: "translateZ(0px)" }}>
                <svg className="absolute bottom-0 overflow-hidden" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" version="1.1" viewBox="0 0 2560 100" x="0" y="0">
                  <polygon className="text-blueGray-200 fill-current" points="2560 0 2560 100 0 100"></polygon>
                </svg>
              </div>
            </section>

            <section className="relative py-16 bg-blueGray-200">
              <div className="container mx-auto px-20">
                <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg -mt-64">
                  <div className="px-6">
                    <div className="flex flex-wrap justify-center">
                      <div className="w-full lg:w-3/12 px-4 lg:order-2 flex justify-center">
                        <div className="relative ">
                          <img alt="Profile Pic" src={currentUser.picturePath} className="shadow-xl rounded-full h-auto align-middle border-none absolute -m-16 -ml-20 lg:-ml-16 max-w-150-px" />
                        </div>
                      </div>
                      <div className="w-full lg:w-4/12 px-4 lg:order-3 lg:text-right lg:self-center">
                        <div className="py-6 px-3 mt-32 sm:mt-0">
                          <button className="bg-pink-500 active:bg-pink-600 uppercase text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1 ease-linear transition-all duration-150" type="button">
                            <Link to="/editProfile">Edit profile</Link>
                          </button>
                        </div>
                      </div>
                      <div className="w-full lg:w-4/12 px-4 lg:order-1">
                        <div className="flex justify-center py-4 lg:pt-4 pt-8">
                          <div className="mr-4 p-3 text-center">
                            <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">{currentUser.arts.length}</span><span className="text-sm text-blueGray-400">Arts</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="text-center mt-3">
                      <h3 className="text-4xl font-semibold leading-normal mb-2 text-blueGray-700 mb-2">
                        {currentUser.name}
                      </h3>
                    </div>

                    <div className="mt-5 py-8 border-t border-blueGray-200 text-center">
                      <div className="flex flex-wrap justify-center">
                        <div className="w-full lg:w-9/12 px-4">
                          <p className="text-lg leading-relaxed text-gray-500 italic">
                            {currentUser.bio}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="py-5 border-t border-blueGray-200 text-center">
                      <div className="flex flex-wrap justify-center">
                        <div className="w-full lg:w-9/12 px-4">
                          <p className="mb-2 text-sm leading-relaxed text-gray-500 italic">
                            {currentUser.email}
                          </p>
                          <p className="text-sm leading-relaxed text-gray-500 italic">
                            {new Date(currentUser.registeredAt).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    </div>

                  </div>
                </div>
              </div>

            </section>
          </main>
        </>
      ) : (
        <p className="text-center">Loading...</p>
      )}
    </div>
  );
};

export default ProfileArtist;
