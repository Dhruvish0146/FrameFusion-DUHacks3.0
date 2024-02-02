import React from "react"
import { useSelector } from "react-redux";

const Home = (props) => {
  const userId = useSelector(state=>state.userId);
  // console.log(userId)
  return (
    <div>
      {!userId && <h1>Home anonymous</h1>}
      {userId && <h1>Home {userId._id}</h1>}
    </div>
  )
};

export default Home;
