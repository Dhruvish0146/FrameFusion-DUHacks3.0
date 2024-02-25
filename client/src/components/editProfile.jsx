import axios from "axios";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { updateDetails } from "../store";

const EditProfile = (props) => {
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        bio: "",
        picture: null,
    });
    const navigate = useNavigate();

    const userId = useSelector(state => state.userId);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handlePictureChange = (e) => {
        setFormData((prevData) => ({ ...prevData, picture: e.target.files[0] }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Handle form submission, update profile picture, name, and bio
        // You can use formData.name, formData.bio, and formData.picture here
        const response = await fetch('http://localhost:5001/api/upload', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                filename: formData.picture.name,
                contentType: formData.picture.type,
            }),
        });

        try {
            const responseData = await response.json();
            console.log('Server Response:', responseData);

            const uploadResponse = await fetch(responseData.url, {
                method: 'PUT',
                body: formData.picture,
                headers: {
                    'Content-Type': formData.picture.type,
                },
            });

            console.log('Image uploaded successfully:', uploadResponse);

            // Now, construct the data object with the updated objectUrl
            const data = {
                name: formData.name,
                email: formData.email,
                phone: formData.phone,
                bio: formData.bio,
                picturePath: responseData.objectUrl,
                artistId: userId,
            };
            console.log(data);

            try {
                const response = await axios.put("http://localhost:5001/artist/updateArtist", data);
                console.log("Updated:", response.data);
                dispatch(updateDetails(response.data.artist));
                navigate(`/profile/artist/${userId}`);

                
            } catch (error) {
                console.error("Error creating art:", error);
            }
        } catch (error) {
            console.error('Error parsing server response:', error);
        }

    };

    return (
        <div className="flex justify-center items-center h-screen bg-gradient-to-br from-purple-600 to-cyan-400">
            <div className="relative bottom-[40px] max-w-md w-full mx-auto p-8 bg-white rounded-lg shadow-lg">
                <h2 className="text-3xl font-semibold text-gray-900 text-center mb-8">Edit Profile</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                            Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        />
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        />
                    </div>
                    <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                            Phone Number
                        </label>
                        <input
                            type="text"
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        />
                    </div>
                    <div>
                        <label htmlFor="bio" className="block text-sm font-medium text-gray-700">
                            Bio
                        </label>
                        <textarea
                            id="bio"
                            name="bio"
                            value={formData.bio}
                            onChange={handleChange}
                            cols={6}
                            className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        ></textarea>
                    </div>
                    <div>
                        <label htmlFor="picture" className="block text-sm font-medium text-gray-700">
                            Profile Picture
                        </label>
                        <input
                            type="file"
                            id="picture"
                            name="picture"
                            accept="image/*"
                            onChange={handlePictureChange}
                            className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        />
                    </div>
                    <div>
                        <button
                            type="submit"
                            className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Save Changes
                        </button>
                    </div>
                    <p className="text-sm text-gray-600 text-center">
                        <Link to="/" className="font-medium text-indigo-600 hover:text-indigo-500">
                            Back to Home
                        </Link>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default EditProfile;
