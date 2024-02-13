import React from "react";
import Joi from "joi-browser";
import { useState } from "react";
import Input from "./input";
import axios from "axios"
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLogin, setPicturePath } from "../store";
import { jwtDecode } from "jwt-decode";
import Select from "./select";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [select, setSelect] = useState('user');
  const [errors, setErrors] = useState({});

  const schema = {
    password: Joi.string().required().label('Password'),
    email: Joi.string().required().label('Email').email()
  };

  const validate = () => {
    const result = Joi.validate(formData, schema);
    if (!result.error) return null;
    const errors = {};
    for (let item of result.error.details) {
      errors[item.path[0]] = item.message;
    }
    return errors;
  };

  const validateProperty = ({ name, value }) => {
    if (name === "email" && !value.trim()) return 'Email is required';
    if (name === "password" && !value.trim()) return 'Password is required';
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors({ ...validationErrors });
    if (validationErrors) return;

    const BACKEND_URL = "http://localhost:5001";
    try {
      const response = await axios.post(`${BACKEND_URL}/api/auth/${select === 'artist' ? 'loginArtist' : 'loginUser'}`, formData);
      const { token, user } = response.data;
      console.log(response.data)
      const { _id, actor } = jwtDecode(token);
      // console.log(444444, user)

      dispatch(
        setLogin({
          userId: _id,
          token: token,
          name: user.name,
          actor: actor,
          user: user,
        })
      );
      if (actor === "artist") {
        dispatch(
          setPicturePath({
            picturePath: user.picturePath
          }));
      }
      navigate("/");
    } catch (error) {
      console.error('Authentication error:', error.message);
      setErrors({ general: 'Authentication failed. Please check your credentials.' });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.currentTarget;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
    const errorMessage = validateProperty({ name, value });
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: errorMessage,
    }));
  };

  const handleActorChange = (e) => {
    const { value } = e.currentTarget;
    setSelect(value);
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-br from-purple-600 to-cyan-400">
      <div className="relative bottom-[150px] max-w-md w-full mx-auto p-8 bg-white rounded-lg shadow-lg">
        <h2 className="text-3xl font-semibold text-gray-900 text-center mb-8">Log in to your account</h2>
        <Select label="Login as:" value={select} onChange={handleActorChange} />
        <form className="space-y-6" onSubmit={handleSubmit}>
          <Input
            name="email"
            type="email"
            label="Email address"
            autoComplete="email"
            value={formData.email}
            onChange={handleChange}
            error={errors.email}
            placeholder="Enter your Email"
            className="input-field"
          />
          <Input
            name="password"
            type="password"
            label="Password"
            autoComplete="current-password"
            value={formData.password}
            onChange={handleChange}
            error={errors.password}
            placeholder="Enter your Password"
            className="input-field"
          />
          {errors.general && <p className="text-red-500 text-sm">{errors.general}</p>}
          <div>
            <button
              type="submit"
              className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              disabled={validate()}
            >
              Sign in
            </button>
          </div>

          <p className="text-sm text-gray-600 text-center">Don't have an account? <Link to="/register" className="font-medium text-indigo-600 hover:text-indigo-500">Register</Link></p>
        </form>
      </div>
    </div>
  );
};

export default Login;
