import React, { useState } from "react";
import { useDispatch } from 'react-redux';
import { updateDetails } from "../../store";
import axios from "axios";

const ProfileInfo = ({ user }) => {
  const dispatch = useDispatch();
  const [editable, setEditable] = useState(false);
  const [formData, setFormData] = useState({
    name: user.name,
    artistId: user.artistId,
    email: user.email,
    phoneNumber: user.phoneNumber,
    bio: user.bio,
    picturePath: user.picturePath,
  });
  const [updateStatus, setUpdateStatus] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleEdit = () => {
    setEditable(true);
  };

  const handleSave = async () => {

    try {
      const response = await axios.put("http://localhost:5001/artist/updateArtist", formData);
      console.log("Updated:", response.data);
      dispatch(updateDetails(response.data.artist));
      setEditable(false);
      setUpdateStatus("success");
    } catch (error) {
      console.error("Error updating profile:", error);
      setUpdateStatus("error");
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
      {updateStatus === "success" && (
        <div className="text-green-600 mt-2">Profile updated successfully!</div>
      )}
      {updateStatus === "error" && (
        <div className="text-red-600 mt-2">Error updating profile. Please try again later.</div>
      )}
      <form className="mt-4">
        <div className="mx-5 space-y-4">
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
            <label htmlFor="artistId" className="block mb-1">
              Artist ID
            </label>
            <input
              type="text"
              id="artistId"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              name="artistId"
              required
              disabled={!editable}
              value={formData.artistId}
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
              type="text"
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
            <label htmlFor="bio" className="block mb-1">
              Bio
            </label>
            <textarea
              id="bio"
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md resize-y focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              name="bio"
              required
              disabled={!editable}
              value={formData.bio}
              rows={3}
              onChange={handleChange}
            />
          </div>
          {/* <div>
            <label htmlFor="picturePath" className="block mb-1">
              Profile Picture
            </label>
            <input
              type="file"
              id="picturePath"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              name="picturePath"
              required
              disabled={!editable}
              accept="image/*"
              onChange={handlePictureChange}
            />


          </div> */}
        </div>
      </form>
    </div>
  );
};

export default ProfileInfo;
