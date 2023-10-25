// NoteTaking.jsx
import React, { useState } from "react";
import "./NoteTaking.css";

const NoteTaking2 = () => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState("");
  const [editedNoteIndex, setEditedNoteIndex] = useState(-1);

  const addNote = () => {
    setNotes([...notes, newNote]);
    setNewNote("");
  };

  const editNote = (index) => {
    setNewNote(notes[index]);
    setEditedNoteIndex(index);
  };

  const updateNote = () => {
    if (editedNoteIndex !== -1) {
      const updatedNotes = [...notes];
      updatedNotes[editedNoteIndex] = newNote;
      setNotes(updatedNotes);
      setNewNote("");
      setEditedNoteIndex(-1);
    }
  };

  const deleteNote = (index) => {
    const updatedNotes = [...notes];
    updatedNotes.splice(index, 1);
    setNotes(updatedNotes);
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Notes</h2>
      <div className="mb-4">
        <textarea
          className="w-full h-24 p-2 border rounded text-black"
          value={newNote}
          onChange={(e) => setNewNote(e.target.value)}
        />
      </div>
      <button
        className="px-3 text-md py-2 bg-teal-400 hover:bg-teal-600 text-white rounded"
        onClick={editedNoteIndex !== -1 ? updateNote : addNote}
      >
        {editedNoteIndex !== -1 ? "Update Note" : "Add Note"}
      </button>
      <ul className="mt-4">
        {notes.map((note, index) => (
          <li key={index} className="border-b py-2">
            {editedNoteIndex !== index ? (
              <div className="note-item flex justify-between items-center">
                <div>{note}</div>
                <div className="note-buttons space-x-2">
                  <button
                    className="bg-[#333] text-white px-2 py-1 rounded"
                    onClick={() => editNote(index)}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-white text-[#555] px-2 py-1 rounded"
                    onClick={() => deleteNote(index)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ) : null}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NoteTaking2;
