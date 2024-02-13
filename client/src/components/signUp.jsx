import React, { useState } from 'react';
import axios from 'axios';
import Select from './select';
import Input from './input';
import { useNavigate, Link } from 'react-router-dom';

const SignUp = () => {
  const BACKEND_URL = "http://localhost:5001";
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
        const { artistId, name, email, password, phoneNumber } = formData;
        const userFormData = { artistId, name, email, password, phoneNumber };
        response = await axios.post(`${BACKEND_URL}/api/auth/registerArtist`, userFormData);
      } else {
        const { name, email, password, phoneNumber } = formData;
        const userFormData = { name, email, password, phoneNumber };

        response = await axios.post(`${BACKEND_URL}/api/auth/registerUser`, userFormData);
      }

      // Handle the response as needed (redirect, show success message, etc.)
      console.log('Registration successful:', response.data);

      navigate('/login');

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
    <div className="overflow-hidden min-h-screen bg-gradient-to-br from-purple-600 to-cyan-400">
      <div className="rrelative bottom-[150px] flex justify-center items-center">
        <div className="max-w-xl w-full mx-auto p-8 bg-white rounded-lg shadow-lg mt-24">
          <h2 className="text-3xl font-semibold text-gray-900 text-center mb-8">Create your account</h2>
          <Select label="Register as:" value={actor} onChange={handleActorChange} />
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            {actor === 'artist' && (
              <Input
                name="artistId"
                type="text"
                label="Artist ID"
                autoComplete="off"
                value={formData.artistId}
                onChange={handleChange}
                placeholder="Enter Artist ID"
              />
            )}
            <Input
              name="name"
              type="text"
              label="Name"
              autoComplete="off"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter Name"
            />
            <Input
              name="email"
              type="email"
              label="Email"
              autoComplete="off"
              value={formData.email}
              onChange={handleChange}
              error={errors.email}
              placeholder="Enter Email"
            />
            <Input
              name="password"
              type="password"
              label="Password"
              autoComplete="off"
              value={formData.password}
              onChange={handleChange}
              error={errors.password}
              placeholder="Enter Password"
            />
            <Input
              name="phoneNumber"
              type="text"
              label="Phone Number"
              autoComplete="off"
              value={formData.phoneNumber}
              onChange={handleChange}
              placeholder="Enter Phone Number"
            />
            {errors.general && <p className="text-red-500 text-sm">{errors.general}</p>}
            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                disabled={validate()}
              >
                Sign Up
              </button>
            </div>
            <p className="mt-2 text-sm text-gray-600 text-center">Already have an account? <Link to="/login" className="font-medium text-indigo-600 hover:text-indigo-500">Log in</Link></p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
