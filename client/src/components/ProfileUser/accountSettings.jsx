import React from "react"
import { useSelector } from "react-redux";
import ProfileInfo from "./profileInfo";
import ChangePass from "./changePass";

const AccountSettings = (props) => {
    const user = useSelector(state => state.user);
    console.log(user);
  return (
    <>
      {props.selectedItem==="Profile Information" && <ProfileInfo user={user}/>}
      {props.selectedItem==="Change Password" && <ChangePass user={user}/>}
    </>
  )
};

export default AccountSettings;
