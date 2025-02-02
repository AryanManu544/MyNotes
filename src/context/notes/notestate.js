import { useState, useEffect } from "react";
import NoteContext from "./NoteContext";

const NoteState = (props) => { 
  const host = "http://localhost:4000";
  const notesinitial = [];
  const [notes, setNotes] = useState(notesinitial);

  // Fetch all notes
  const fetchNotes = async () => {
    try {
      console.log("Sending request to backend...");
  
      const response = await fetch(`${host}/api/notes/fetchallnotes`, {
        method: "GET",
        headers: {
          "Content-type": "application/json",
          "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjc5Mjc5YjliN2EzODQ1NWJmYzNjZjVlIn0sImlhdCI6MTczODUwMjg1Nn0.8o3AOEjK3Vha-V8ynAqmRnetgZkhYE-jKLJK6yD7am8"
        }
      });
  
      console.log("Response received:", response);
      
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }
  
      const json = await response.json();
      console.log("Notes data:", json);
      setNotes(json);
    } catch (error) {
      console.error("Fetch notes error:", error);
    }
  };

  // Fetch notes on component mount
  useEffect(() => {
    fetchNotes();
  }, []);

  // Add a note
  const addnote = async (title, description, tag) => {
    try {
      const response = await fetch(`${host}/api/notes/addnote`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjc5Mjc5YjliN2EzODQ1NWJmYzNjZjVlIn0sImlhdCI6MTczNzY5ODQ2M30.IRe1ve1bVamopF5o5_qNwzXQVgWqEiO157dxTjHVUTg"
        },
        body: JSON.stringify({ title, description, tag })
      });
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }
      const json = await response.json();
      setNotes(notes.concat(json));
    } catch (error) {
      console.error(error.message);
    }
  };

  // Delete a note
  const deletenote = async (id) => {
    try {
        const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
            method: "DELETE",
            headers: {
                "Content-type": "application/json",
                "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjc5Mjc5YjliN2EzODQ1NWJmYzNjZjVlIn0sImlhdCI6MTczNzY5ODQ2M30.IRe1ve1bVamopF5o5_qNwzXQVgWqEiO157dxTjHVUTg"
            }
        });
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }
        const json = await response.json();
        console.log(json); // Log the deletion response

        // Delete note locally from the state only after successful response
        const newNotes = notes.filter((note) => note._id !== id);
        setNotes(newNotes);
    } catch (error) {
        console.error(error.message);
    }
};

  // Edit a note
  const editnote = async (id, title, description, tag) => {
    try {
      const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
          "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjc5Mjc5YjliN2EzODQ1NWJmYzNjZjVlIn0sImlhdCI6MTczNzY5ODQ2M30.IRe1ve1bVamopF5o5_qNwzXQVgWqEiO157dxTjHVUTg"
        },
        body: JSON.stringify({ title, description, tag })
      });
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }
      const json = await response.json();
      console.log(json);
      const newNotes = notes.map((note) => {
        if (note._id === id) {
          return { ...note, title, description, tag };
        }
        return note;
      });
      setNotes(newNotes);
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <NoteContext.Provider value={{ notes, addnote, deletenote, editnote }}>
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;