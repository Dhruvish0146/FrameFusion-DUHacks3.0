import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { updateDetails } from "../../store";
import axios from "axios";
import DeliveryAddressSelected from "./deliveryAddressSelected";

const DeliveryAddress = ({ user, selectedItem, changeSelected }) => {
    const [edit, setEdit] = useState(false);
    const [address, setAddress] = useState(user.address);
    const dispatch = useDispatch();

    const handleDeliverHere = async () => {
        // Handle edit action here
        if (edit) {
            console.log("handleDeliverHere...");
            try {
                const updatedUser = { ...user, address: address }; // Create a new object with updated address
                await axios.put(
                    "http://localhost:5001/user/updateUserDetails",
                    updatedUser
                );
                dispatch(updateDetails(updatedUser));
            } catch (error) {
                console.error("Error updating user details:", error);
            }
        }
        changeSelected("ORDER SUMMARY");
    };

    const handleEdit = () => {
        setEdit(true);
    };
    const handleChange = (e) => {
        const { value } = e.target;
        setAddress(value);
    };

    return (
        <>
            {selectedItem === "DELIVERY ADDRESS" && (
                <DeliveryAddressSelected
                    user={user}
                    edit={edit}
                    address={address}
                    onChangeDeliverHere={handleDeliverHere}
                    onChangeEdit={handleEdit}
                    onChangeChange={handleChange}
                />
            )}
            {selectedItem !== "DELIVERY ADDRESS" && (
                <>
                    <div className="flex justify-between">
                        <div className="ml-4 p-2">
                            <div className="font-bold text-xl text-gray-500">
                                <div className="flex items-center">
                                    DELIVERY ADDRESS
                                    <svg
                                        height="20" // Increased height
                                        width="20" // Increased width
                                        viewBox="0 0 24 24"
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="ml-1 h-6 w-6 text-blue-500" // Adjusted size with h-6 and w-6 classes
                                    >
                                        <path
                                            d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"
                                            stroke="#2974f0"
                                        ></path>
                                    </svg>
                                </div>
                            </div>
                            <div className="flex mb-2">
                                <div className="font-bold mr-2">{user.name}</div>
                                <div>{user.address}</div>
                            </div>
                        </div>
                        <div className="mt-1">
                            <button
                                className="m-4 text-blue-500 px-7 py-2 rounded text-sm border border-gray-300"
                                onClick={() => changeSelected("DELIVERY ADDRESS")}
                            >
                                Change
                            </button>

                        </div>
                    </div>
                </>

            )}
        </>
    );
};

export default DeliveryAddress;
