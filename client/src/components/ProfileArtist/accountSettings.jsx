import React from "react"
import { useSelector } from "react-redux";
import ProfileInfo from "./profileInfo";
import ChangePass from "./changePass";
import ChangeProfilePicture from "./changeProfilePicture";

const AccountSettings = (props) => {
    const user = useSelector(state => state.user);
    console.log(user);
  return (
    <>
      {props.selectedItem==="Profile Information" && <ProfileInfo user={user}/>}
      {props.selectedItem==="Change Password" && <ChangePass user={user}/>}
      {props.selectedItem==="Change Profile Picture" && <ChangeProfilePicture user={user}/>}
    </>
  )
};

export default AccountSettings;
