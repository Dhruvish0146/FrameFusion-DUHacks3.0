import React, { useState } from "react";
import FAQs from "./faqs";
import { useDispatch } from 'react-redux';
import { updateDetails } from "../../store";
import axios from "axios";

const ProfileInfo = ({ user }) => {
  const dispatch = useDispatch();
  const [editable, setEditable] = useState(false);
  const [formData, setFormData] = useState({
    name: user.name,
    email: user.email,
    phoneNumber: user.phoneNumber,
    address: user.address,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleEdit = () => {
    setEditable(true);
  };

  const handleSave = async () => {
    // Here you can implement the logic to save the changes to MongoDB
    // For now, we'll just log the updated data
    console.log("Updated Data:", formData);
    try {
      await axios.put("http://localhost:5001/user/updateUserDetails", formData);
      dispatch(updateDetails(formData));
      setEditable(false);
      
  } catch (error) {
      console.error("Error creating art:", error);
  }
    
  };

  return (
    <div className="col-span-4 bg-gray-100 p-4 rounded-lg">
    <div className="flex items-center justify-between border-b border-gray-300 pb-2">
      <div className="font-bold text-lg">Personal Information</div>
      {!editable ? (
        <button
          className="text-blue-500 font-semibold hover:underline"
          onClick={handleEdit}
        >
          Edit
        </button>
      ) : (
        <button
          className="text-blue-500 font-semibold hover:underline"
          onClick={handleSave}
        >
          Save
        </button>
      )}
    </div>
    <form className="mt-4">
      <div className="mx-5 space-y-4"> {/* Added space-y-4 class */}
        <div>
          <label htmlFor="name" className="block mb-1">
            Name
          </label>
          <input
            type="text"
            id="name"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            name="name"
            required
            disabled={!editable}
            value={formData.name}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="email" className="block mb-1">
            Email
          </label>
          <input
            type="text"
            id="email"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            name="email"
            required
            disabled={!editable}
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="phoneNumber" className="block mb-1">
            Phone Number
          </label>
          <input
            type="number"
            id="phoneNumber"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            name="phoneNumber"
            required
            disabled={!editable}
            value={formData.phoneNumber}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="address" className="block mb-1">
            Address
          </label>
          <input
            type="text"
            id="address"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            name="address"
            required
            disabled={!editable}
            value={formData.address}
            onChange={handleChange}
          />
        </div>
      </div>
    </form>
    <FAQs />
  </div>
  
  );
};

export default ProfileInfo;
