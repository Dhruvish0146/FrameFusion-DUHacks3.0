import React, { useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Input from "./input";
import { setArt } from "../store";

const AddArt = () => {
  const [file, setFile] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    description: "",
    category: "",
    title: "",
    price: "",
    size: "",
    artPath: null, // Change to null for file input
  });
  const userId = useSelector((state) => state.userId);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      alert("Please select an image file.");
      return;
    }

    setLoading(true);

    const response = await fetch("http://localhost:5001/api/upload", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        filename: file.name,
        contentType: file.type,
      }),
    });

    try {
      const responseData = await response.json();
      console.log("Server Response:", responseData);

      const uploadResponse = await fetch(responseData.url, {
        method: "PUT",
        body: file,
        headers: {
          "Content-Type": file.type,
        },
      });

      console.log("Image uploaded successfully:", uploadResponse);

      // Now, construct the data object with the updated objectUrl
      const data = {
        description: formData.description,
        category: formData.category,
        title: formData.title,
        price: formData.price,
        size: formData.size,
        artPath: responseData.objectUrl, // Use responseData.objectUrl directly
        artistId: userId,
      };
      console.log(data);
      dispatch(setArt({ arts: data }));

      try {
        const response = await axios.post(
          "http://localhost:5001/artist/addArt",
          data
        );
        console.log("Art added:", response.data);
        navigate("/");
        toast.success("Art added successfully");
      } catch (error) {
        console.error("Error creating art:", error);
        toast.error("Error creating art. Please try again later");
      }
    } catch (error) {
      console.error("Error parsing server response:", error);
      toast.error("Error uploading art. Please try again later");
    } finally {
      setLoading(false);
    }
  };
    

    return (
        <div className=" flex justify-center items-center p-10  bg-gradient-to-br from-purple-600 to-cyan-400">
            <div className="relative bottom-[40px] max-w-md w-full m-8 p-8 bg-white rounded-lg shadow-lg">
                <h2 className="text-3xl font-semibold text-gray-900 text-center mb-8">Add New Art</h2>
                <form className="space-y-6" onSubmit={handleSubmit}>
                    <Input
                        name="title"
                        type="text"
                        label="Title"
                        value={formData.title}
                        onChange={handleChange}
                        required
                    />
                    <Input
                        name="description"
                        type="text"
                        label="Description"
                        value={formData.description}
                        onChange={handleChange}
                        required
                    />
                    <Input
                        name="category"
                        type="text"
                        label="Category"
                        value={formData.category}
                        onChange={handleChange}
                        required
                    />
                    <Input
                        name="price"
                        type="text"
                        label="Price"
                        value={formData.price}
                        onChange={handleChange}
                        required
                    />
                    <Input
                        name="size"
                        type="text"
                        label="Size"
                        value={formData.size}
                        onChange={handleChange}
                        required
                    />
                    <div className="form-group">
                        <label htmlFor="artPath" className="block text-sm font-medium text-gray-700">
                            Art Path (File Location)
                        </label>
                        <div className="mt-1">
                            <input
                                id="artPath"
                                name="artPath"
                                type="file"
                                accept="image/*"
                                required
                                onChange={handleFileChange}
                                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            />
                        </div>
                    </div>
                    <div>
                        <button
                            type="submit"
                            className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            disabled={loading}
                        >
                            {loading ? "Adding Art..." : "Add Art"}
                        </button>
                    </div>
                </form>
            </div>
            <ToastContainer />
        </div>
    );
};

export default AddArt;