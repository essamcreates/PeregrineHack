import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';

const UploadProfilePhoto = () => {
    const [file, setFile] = useState(null);

    const onDrop = (acceptedFiles) => {
        setFile(acceptedFiles[0]);
    };

    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        accept: 'image/*,image/jpeg, image/png,image/jpg',
    });

    // const handleSubmit = async () => {
    //     if (file) {
    //         const formData = new FormData();
    //         formData.append('profilePicture', file);
    //
    //         try {
    //             await axios.post('http://localhost:8080/users/upload-profile-picture', formData, {
    //                 headers: {
    //                     'Content-Type': 'multipart/form-data',
    //                 },
    //             });
    //             // Handle successful upload, e.g., show a success message or update the user's profile picture
    //         } catch (error) {
    //             // Handle the error, e.g., show an error message to the user
    //         }
    //     }
    // };

    const handleSubmit = async () => {
        if (file) {
            const formData = new FormData();
            formData.append('profilePicture', file);

            try {
                const url = `http://localhost:8080/users/upload-profile-picture`;
                await fetch(url, {
                    method: "POST",
                    headers: { "Content-Type": "multipart/form-data" },
                })
                // Handle successful upload, e.g., show a success message or update the user's profile picture
            } catch (error) {
                // Handle the error, e.g., show an error message to the user
            }
        }
    };

    return (
        <div>
            <h1>Upload Profile Photo</h1>
            <div {...getRootProps()} className="dropzone">
                <input {...getInputProps()} />
                <p>Click Here to Import Image or Drag one in</p>
            </div>
            {file && <p>Selected file: {file.name}</p>}
            <button onClick={handleSubmit}>Save Profile</button>
        </div>
    );
};

export default UploadProfilePhoto;
