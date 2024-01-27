import React from "react";
import Joi from "joi-browser";
import { useState } from "react";
import Input from "./input";
import axios from "axios"
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLogin } from "../store";
import { jwtDecode } from "jwt-decode";
import Select from "./select";

const Login = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [actor, setActor] = useState('user')
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
    if (name === "email") {
      if (value.trim() === "") return 'Email is required';
      // other validation for email
    }
    if (name === "password") {
      if (value.trim() === "") return 'Password is required';
      // other validation for password
    }

    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validate();
    setErrors({ ...validationErrors });
    if (validationErrors) return;
    // console.log(actor)
    if (actor === "artist") {

      try {
        // Make API call to the backend using axios

        const response = await axios.post('http://localhost:5001/api/auth/loginArtist', formData);

        // Assuming your API returns a JSON object with a 'token' property
        const { token } = response.data;
        localStorage.setItem('token', token);
        const user = jwtDecode(token);


        // Continue with whatever you want to do with the token
        console.log('Authentication successful. Token:', token);
        if (token) {
          dispatch(
            setLogin({
              user: user,
              token: token,
            })
          );
          navigate("/");
        }

      } catch (error) {
        // Handle errors from API or network issues
        console.error('Authentication error:', error.message);
        // Optionally, you can update the state to display an error message to the user
        setErrors({ general: 'Authentication failed. Please check your credentials.' });
      }
    }
    if (actor === "user") {

      try {
        // Make API call to the backend using axios

        const response = await axios.post('http://localhost:5001/api/auth/loginUser', formData);

        // Assuming your API returns a JSON object with a 'token' property
        const { token } = response.data;
        localStorage.setItem('token', token);
        const user = jwtDecode(token);

        // Continue with whatever you want to do with the token
        console.log('Authentication successful. Token:', token);
        if (token) {
          dispatch(
            setLogin({
              user: user,
              token: token,
            })
          );
          navigate("/");
        }

      } catch (error) {
        // Handle errors from API or network issues
        console.error('Authentication error:', error.message);
        // Optionally, you can update the state to display an error message to the user
        setErrors({ general: 'Authentication failed. Please check your credentials.' });
      }
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
    // console.log(value);
    setActor(value);
  };

  return (
    <>
      <div>
        <h1>Login Form</h1>
        <Select
          label="Login as:"
          value={actor}
          onChange={handleActorChange}
        />
        <form onSubmit={handleSubmit}>
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
          <br></br>
          <button className="btn btn-primary" disabled={validate()}>
            Login
          </button>
        </form>
      </div>
    </>
  );
};

export default Login;
