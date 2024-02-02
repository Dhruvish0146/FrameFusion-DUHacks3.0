import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const ProfileArtist = () => {
  const { userId } = useParams();
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:5001/artist/${userId}`);
        setCurrentUser(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchData();
  }, [userId]);

  return (
    <div className="container mt-5">
      {currentUser ? (
        <div className="text-center">
          <h1>{currentUser.name}</h1>
          <img
            src={currentUser.picturePath}
            alt="Profile"
            className="img-fluid rounded-circle"
            style={{ maxWidth: "100px", maxHeight: "100px" }}
          />
          <p className="mt-2">Email: {currentUser.email}</p>
          <p>Bio: {currentUser.bio}</p>
          <p>Registration Date: {new Date(currentUser.registeredAt).toLocaleDateString()}</p>

          

          <div className="mt-4">
            <h2>Arts made by {currentUser.name}</h2>
            <ul>
              {currentUser.artIds.map((artId) => (
                <li key={artId}>{artId}</li>
              ))}
            </ul>
          </div>
        </div>
      ) : (
        <p className="text-center">Loading...</p>
      )}
    </div>
  );
};

export default ProfileArtist;
