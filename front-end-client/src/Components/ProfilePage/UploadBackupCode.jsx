import { useState } from "react";
import {useDropzone} from "react-dropzone";

const UploadProfilePhoto = () => {

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

        const data = new FormData();
        data.append('image', file);
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
