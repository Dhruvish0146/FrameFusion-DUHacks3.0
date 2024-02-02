import React, { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

const AddArt = () => {
    const [objectUrl, setObjectUrl] = useState('');
    const [file, setFile] = useState(null);
    const [formData, setFormData] = useState({
        name: "",
        category: "",
        title: "",
        price: "",
        size: "",
        artPath: null, // Change to null for file input
    });
    const { _id: artistId } = useSelector(state => state.userId);

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
            alert('Please select an image file.');
            return;
        }
    
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
    
            // Update objectUrl after successful image upload
            setObjectUrl(responseData.objectUrl);
    
            // Now, construct the data object with the updated objectUrl
            const data = {
                name: formData.name,
                category: formData.category,
                title: formData.title,
                price: formData.price,
                size: formData.size,
                artPath: responseData.objectUrl, // Use responseData.objectUrl directly
                artistId: artistId,
            };
            console.log(data);
    
            try {
                const response = await axios.post("http://localhost:5001/artist/addArt", data);
                console.log("Art added:", response.data);
            } catch (error) {
                console.error("Error creating art:", error);
            }
        } catch (error) {
            console.error('Error parsing server response:', error);
        }
    };
    

        return (
            <div className="container mt-5">
                <h2>Add New Art</h2>
                <form onSubmit={handleSubmit}>
                    {/* ... Other form fields ... */}
                    <div className="form-group">
                        <label>Name:</label>
                        <input
                            type="text"
                            className="form-control"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Title:</label>
                        <input
                            type="text"
                            className="form-control"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Category:</label>
                        <input
                            type="text"
                            className="form-control"
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Price:</label>
                        <input
                            type="text"
                            className="form-control"
                            name="price"
                            value={formData.price}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Size:</label>
                        <input
                            type="text"
                            className="form-control"
                            name="size"
                            value={formData.size}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Art Path (File Location):</label>
                        <input
                            type="file"
                            className="form-control"
                            name="artPath"
                            onChange={handleFileChange}
                            required
                        />
                    </div>

                    <button type="submit" className="btn btn-primary">
                        Add Art
                    </button>
                </form>
            </div>
        );
    };

    export default AddArt;
