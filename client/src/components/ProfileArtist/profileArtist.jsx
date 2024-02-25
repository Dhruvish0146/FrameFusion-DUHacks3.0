import React, { useState } from "react";
import HelloMessage from "./helloMessage";
import { useSelector } from "react-redux";
import ListGroup from "./listGroup";
import AccountSettings from "./accountSettings";

const EditProfileArtist = (props) => {
  const [selectedItem, setSelectedItem] = useState("Profile Information");
  const user = useSelector((state) => state.user);
  const list = ["Profile Information", "Change Password","Change Profile Picture"];

  const handleItemSelect = (item) => {
    setSelectedItem(item);
    console.log(item);
    // Do something with the selected item, like updating state or performing an action
  };

  return (
    <div className="bg-gradient-to-r from-cyan-500 to-blue-500 min-h-screen p-8 px-4 md:px-[120px]">
      <div className="grid grid-cols-1 md:grid-cols-5 max-h-full gap-4">
        <div className="col-span-1">
          <div className="bg-white rounded-lg  shadow">
            <HelloMessage user={user} />
            <ListGroup
              items={list}
              selectedItem={selectedItem}
              onItemSelect={handleItemSelect}
            />
          </div>
        </div>
        <div className="col-span-4">
          <div className="bg-white rounded-lg p-8 shadow">
            <AccountSettings selectedItem={selectedItem} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProfileArtist;
