import React, { useState } from 'react';
import axios from 'axios'

const SignUp = () => {
  const [artistId, setArtistId] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const handleSignUp = async (e) => {
    e.preventDefault();
    // You can perform the signup logic here, e.g., sending data to a server
    // console.log('Signing up:', { artistId, name, email, password, phoneNumber });
    const artistData = { artistId, name, email, password, phoneNumber };
    // const res = axios.post("http://localhost:5001/api/artist/create", artistData);
    const response = await fetch("http://localhost:5001/api/artist/create",{
            method: "POST",
            body: JSON.stringify({ artistId, name, email, password, phoneNumber }),
            headers:{
                "Content-Type" : "application/json"
            }
        });
    console.log(response);
  };

  return (
    <div>
      <h2>Sign Up</h2>
      <form onSubmit={handleSignUp}>
        <label>
          Artist ID:
          <input type="text" value={artistId} onChange={(e) => setArtistId(e.target.value)} />
        </label>
        <br />

        <label>
          Name:
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        </label>
        <br />

        <label>
          Email:
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </label>
        <br />

        <label>
          Password:
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>
        <br />

        <label>
          Phone Number:
          <input type="tel" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
        </label>
        <br />

        <button type="submit" >
          Sign Up
        </button>
      </form>
      <button type="button" >
          Sign Up with Google
        </button>
    </div>
  );
};

export default SignUp;
