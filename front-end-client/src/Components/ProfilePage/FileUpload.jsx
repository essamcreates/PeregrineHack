import { useState } from "react";
const FileUpload = () => {
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [file, setFile] = useState("");

    function handleForm(e) {
        e.preventDefault();

        const data = new FormData();
        data.append("image", file);
        data.append("title", title);
        data.append("desc", desc);

        fetch("http://localhost:8080/users/upload", {
            method: "POST",
            body: data,
        });
    }

    function handleFileChange(e) {
        if (e.target.files && e.target.files[0]) setFile(e.target.files[0]);
    }

    return (
        <>
            <form>
                <input
                    type="text"
                    name="title"
                    placeholder="title"
                    onKeyUp={(e) => setTitle(e.target.value)}
                />
                <input
                    type="text"
                    name="description"
                    placeholder="description"
                    onKeyUp={(e) => setDesc(e.target.value)}
                />
                <input type="file" name="image" onChange={handleFileChange} />
                <button type="submit" onClick={(e) => handleForm(e)}>
                    Submit
                </button>
            </form>
        </>
    );
}
export default FileUpload;