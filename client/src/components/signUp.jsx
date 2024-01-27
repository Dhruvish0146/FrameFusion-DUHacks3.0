import React, { useState } from 'react';
import axios from 'axios';
import Select from './select';
import Input from './input';
import { useNavigate } from 'react-router-dom';


const SignUp = () => {
  const [formData, setFormData] = useState({
    artistId: '',
    name: '',
    email: '',
    password: '',
    phoneNumber: '',
  });
  const navigate = useNavigate();
  const [actor, setActor] = useState('user');
  const [errors, setErrors] = useState({});

  const handleActorChange = (e) => {
    const { value } = e.currentTarget;
    setActor(value);
  };

  const validate = () => {
    // Implement validation logic if needed
    return null;
  };

  const handleChange = (e) => {
    const { name, value } = e.currentTarget;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validate();
    setErrors({ ...validationErrors });

    if (validationErrors) return;

    try {
      let response;
      if (actor === 'artist') {
        const { artistId,name, email, password, phoneNumber } = formData;
        const userFormData = { artistId,name, email, password, phoneNumber };
        response = await axios.post('http://localhost:5001/api/auth/registerArtist', userFormData);
      } else {
        const { name, email, password, phoneNumber } = formData;
      const userFormData = { name, email, password, phoneNumber };
      
      response = await axios.post('http://localhost:5001/api/auth/registerUser', userFormData);
      }

      // Handle the response as needed (redirect, show success message, etc.)
      console.log('Registration successful:', response.data);
      
      navigate('/login')

      // Optionally, you can navigate to a different page after successful registration
      // Example: navigate('/login');
    } catch (error) {
      // Handle errors from API or network issues
      console.error('Registration error:', error.message);

      // Optionally, you can update the state to display an error message to the user
      setErrors({ general: 'Registration failed. Please check your information.' });
    }
  };

  return (
    <>
      <div>
        <h1>Registration Form</h1>
        <Select
          label="Register as:"
          value={actor}
          onChange={handleActorChange}
        />
        <form onSubmit={handleSubmit}>
          {actor === 'artist' && (
            <>
              <Input
                name="artistId"
                type="text"
                label="Artist ID"
                value={formData.artistId}
                onChange={handleChange}
              />
            </>
          )}
          <Input
            name="name"
            type="text"
            label="Name"
            value={formData.name}
            onChange={handleChange}
          />
          <Input
            name="email"
            type="email"
            label="Email"
            value={formData.email}
            onChange={handleChange}
            error={errors.email}
          />
          <Input
            name="password"
            type="password"
            label="Password"
            value={formData.password}
            onChange={handleChange}
            error={errors.password}
          />
          <Input
            name="phoneNumber"
            type="text"
            label="Phone Number"
            value={formData.phoneNumber}
            onChange={handleChange}
          />

          <button className="btn btn-primary" disabled={validate()}>
            Sign Up
          </button>
        </form>
      </div>
    </>
  );
};

export default SignUp;
