import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { updateDetails } from "../../store";
import axios from "axios";

const ChangeProfilePicture = ({ user }) => {
    const [file, setFile] = useState(null);
    const [showInput, setShowInput] = useState(false);
    const dispatch = useDispatch();
    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        setFile(selectedFile);
    };

    const handleUpload = async () => {
        const response = await fetch('http://localhost:5001/api/upload', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                filename: file.name,
                contentType: file.type,
            }),
        });

        try {
            const responseData = await response.json();
            console.log('Server Response:', responseData);

            const uploadResponse = await fetch(responseData.url, {
                method: 'PUT',
                body: file,
                headers: {
                    'Content-Type': file.type,
                },
            });

            console.log('Image uploaded successfully:', uploadResponse);

            // Now, construct the data object with the updated objectUrl
            const data = {
               ...user,picturePath: responseData.objectUrl
            };
            console.log(data);

            try {
                const response = await axios.put("http://localhost:5001/artist/updateArtist", data);
                console.log("Updated:", response.data);
                dispatch(updateDetails(response.data.artist));



            } catch (error) {
                console.error("Error creating art:", error);
            }
        } catch (error) {
            console.error('Error parsing server response:', error);
        }

    };

    return (
        <div className="mt-8 flex flex-col items-center justify-center">
            {/* Display current profile picture with gradient border */}
            <div className="relative">
                <div className="absolute inset-0 rounded-full border border-gradient"></div>
                <img
                    src={user.picturePath}
                    alt="Profile"
                    className="w-64 h-64 rounded-full object-cover"
                />
            </div>

            {/* Button to change profile picture */}
            <div>
                {!showInput && <button
                    onClick={() => setShowInput(true)}
                    className="bg-blue-500 text-white py-2 px-4 rounded-lg cursor-pointer mt-4"
                >
                    Change Profile Picture
                </button>}
                {showInput && (
                    <div className="flex flex-col items-center">
                        <input
                            type="file"
                            id="fileInput"
                            accept="image/*"
                            className="mt-2"
                            onChange={handleFileChange}
                        />
                        <button
                            onClick={handleUpload}
                            className="bg-blue-500 text-white py-2 px-4 rounded-lg cursor-pointer mt-4"
                            disabled={!file} // Disable the button if no file is chosen
                        >
                            Upload
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ChangeProfilePicture;
