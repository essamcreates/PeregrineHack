import {useEffect, useState} from "react";
import {useDropzone} from "react-dropzone";


const UploadProfilePhoto = ({setImageName,imageName,setCurrentUser,currentUser}) => {

    const [file, setFile] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [confirmedUpload, setConfirmedUpload] = useState("");


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
                    setConfirmedUpload("Your profile photo has been uploaded successfully.");
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
        <div className="min-h-screen bg-[conic-gradient(at_bottom_right,_var(--tw-gradient-stops))] from-emerald-200 via-cyan-400 to-yellow-100 flex flex-col items-center justify-center">
           <div>
               <img
                   src={file ? imagePreview : `http://localhost:8080/${currentUser.profilePictureURL}`}
                   alt="User Profile Picture"
                   className="shadow-xl rounded-full h-48 w-48 max-w-none align-middle border-none relative object-cover -m-16 -ml-20 lg:-ml-16 mb-10"
               />
           </div>

            <div className="bg-white shadow-lg rounded-lg p-8 w-3/4 mx-auto mt-4 text-center">

                <form>
                    <div {...getRootProps()} className="w-1/2 mx-auto p-5 border-dashed border-2 border-gray-300 text-center cursor-pointer rounded-lg">
                        <input {...getInputProps()} />
                        <p className="text-base text-gray-700 font-weight: 600">Click or drag a file to upload</p>
                    </div>
                    {/*{file && <p>Selected file: {file.name}</p>}*/}

                    {file && (
                        <div>
                            <p className="mt-2 font-weight: 600">Select Upload to Confirm</p>
                            {/*<img src={imagePreview} alt="Selected Image" style={{ maxWidth: "100%" }} />*/}
                        </div>
                    )}

                    <div>
                        <p className="font-weight: 600">{confirmedUpload}</p>
                    </div>

                    <button type="submit" onClick={(e) => handleForm(e)} className="w-1/2 my-4 bg-teal-500 text-white text-center py-2 px-4 rounded hover:bg-teal-800">
                        Upload
                    </button>

                </form>
            </div>
        </div>

    );
};

export default UploadProfilePhoto;