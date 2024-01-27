import React from "react"
import { useSelector } from "react-redux";

const Home = (props) => {
  const user = useSelector(state=>state.user);
  // console.log(user)
  return (
    <div>
      {!user && <h1>Home anonymous</h1>}
      {user && <h1>Home {user._id}</h1>}
    </div>
  )
};

export default Home;
