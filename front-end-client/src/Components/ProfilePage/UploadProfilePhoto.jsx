import {useEffect, useState} from "react";
import {useDropzone} from "react-dropzone";

const UploadProfilePhoto = ({currentUser}) => {

    const [file, setFile] = useState(null);


    const onDrop = (acceptedFiles) => {
        setFile(acceptedFiles[0]);
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
        fetch('http://localhost:8080/users/upload', {
            method: 'POST',
            body: data,
        });
    }

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
        </>
    );
};

export default UploadProfilePhoto;