import {useEffect, useState} from "react";
import {useDropzone} from "react-dropzone";

const UploadProfilePhoto = ({setImageName,imageName,setCurrentUser,currentUser}) => {

    const [file, setFile] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);


    const onDrop = (acceptedFiles) => {
        setFile(acceptedFiles[0]);

        const previewUrl = URL.createObjectURL(acceptedFiles[0]);
        setImagePreview(previewUrl);

    };

    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        accept: 'image/*',
        multiple: false,
    });

    function handleForm(e) {
        e.preventDefault();

        if (!file) {
            console.error('No file selected');
            return;
        }

        // Extract the original file extension
        const originalFileName = file.name;
        const fileExtension = originalFileName.split('.').pop();

        // Rename the file using the original extension
        const newFileName = `profilephoto${currentUser.id}.${fileExtension}`;
        const renamedFile = new File([file], newFileName, { type: file.type });

        const data = new FormData();
        data.append('image', renamedFile);

        // Send the image to the backend
        fetch('http://localhost:8080/users/upload', {
            method: 'POST',
            body: data,
        })
            .then((response) => {
                if (response.ok) {
                    // Update the image name in the state
                    setImageName(newFileName);
                }
            });
    }

    // if imageName changes fetch the user by its id to get the most up-to-date version use a useEffect
    const fetchUpdatedUser = async () =>{
        const response = await fetch('http://localhost:8080/users/'+ currentUser.id);
        const data = await response.json();
        setCurrentUser(data);
    }

    useEffect(()=>{
        fetchUpdatedUser();

    },[imageName]);

// completed logic for profile photo image upload

    return (
        <>
            <form>
                <div {...getRootProps()}>
                    <input {...getInputProps()} />
                    <p>Click or drag a file to upload</p>
                </div>
                {file && <p>Selected file: {file.name}</p>}

                <button type="submit" onClick={(e) => handleForm(e)}>
                    Submit
                </button>
            </form>

            {file && (
                <div>

                    <p>Chosen Image: Select Upload to Confirm:</p>
                    <img src={imagePreview} alt="Selected Image" style={{ maxWidth: "100%" }} />
                </div>
            )}

        </>
    );
};

export default UploadProfilePhoto;