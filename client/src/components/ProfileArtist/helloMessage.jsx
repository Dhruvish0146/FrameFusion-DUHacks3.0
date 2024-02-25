import React from "react";

const HelloMessage = ({ user }) => {
  return (
    <div className="flex items-center bg-white overflow-x-auto p-4 rounded-lg ">
      <img src={user.picturePath} className="w-10 h-10 rounded-full" />
      <div className="ml-4">
        <div className="_2QZ3Er">Hello, {user.name}</div>

      </div>
    </div>

  );
};

export default HelloMessage;
