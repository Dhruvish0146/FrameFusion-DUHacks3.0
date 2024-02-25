import React from 'react';
import { useSelector } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';
import Name from './Name';


const Navbar = () => {
  const userId = useSelector(state => state.userId);
  const name = useSelector(state => state.name);
  const actor = useSelector(state => state.actor);
  const user = useSelector(state => state.user);
  const picturePath = useSelector(state => state.picturePath);


  return (
    <>
      <nav className="bg-gray-100 shadow-lg relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
              <Link to="/" className="text-black font-bold text-[25px]" style={{ fontFamily: 'cursive', /* other styles */ }}>
                  <Name name="FrameFusion" size="32px" fontFamily="cursive"/>
                </Link>
              </div>

            </div>
            <div className="hidden md:flex md:items-center md:space-x-4">
              <div className="flex items-center">
                {userId ? (
                  <>
                    {actor === "artist" &&
                      <NavLink to={`/profile/artist/${userId}`} className="text-black hover:bg-indigo-200 px-3 py-2 rounded-md text-sm font-medium">
                        <div className='flex items-center'>

                          <img className='rounded-full' src={picturePath} alt={name} style={{ marginRight: '5px', width: '30px', height: '30px' }} />

                          <Name name={user.artistId} size="17px"/>
                        </div>
                      </NavLink>
                    }
                    {actor === false &&
                      <>
                        <NavLink to={`/profile/user/${userId}`} className="text-black hover:bg-indigo-200 px-3 py-2 rounded-md text-sm font-medium">
                          <div className='flex items-center'>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7m " fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                            </svg>
                          </div>
                        </NavLink>
                        <NavLink to="/orders" className="text-black hover:bg-indigo-200 px-3 py-2 rounded-md text-sm font-medium">
                          <Name name="MyOrders" size="17px"/>
                        </NavLink>
                      </>
                    }



                    <NavLink to="/logout" className="text-black hover:bg-indigo-200 px-3 py-2 rounded-md text-sm font-medium">
                    <Name name="Logout" size="17px" className=" w-50"/>
                    </NavLink>
                    {actor === "artist" &&
                      <NavLink to="/addArt" className="text-black px-3 py-2 rounded-md text-sm font-medium">
                        <div className="inline-flex items-center justify-center w-auto h-auto mr-2  transition-colors duration-150 bg-slate-200 rounded-lg focus:shadow-outline hover:bg-slate-400 p-2">
                          <svg className="w-6 h-6 fill-current" viewBox="0 0 20 20">
                            <path d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" fillRule="evenodd"></path>
                          </svg>
                          <span className="ml-2"><Name name="Add New Art" size="17px"/></span>
                        </div>

                      </NavLink>
                    }

                  </>
                ) : (
                  <>
                    <NavLink to="/login" className={`text-black hover:bg-indigo-200 px-3 py-2 rounded-md text-sm font-medium `}>
                    <Name name="Login" size="17px"/>
                    </NavLink>
                    <NavLink to="/register" className="text-black hover:bg-indigo-200 px-3 py-2 rounded-md text-sm font-medium">
                    <Name name="Register" size="17px"/>
                    </NavLink>
                  </>
                )}
              </div>
            </div>
          </div>

        </div>

      </nav>
    </>
  );
};

export default Navbar;