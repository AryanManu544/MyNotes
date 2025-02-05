import { useState, useEffect } from "react";
import NoteContext from "./NoteContext";

const NoteState = (props) => {
  const host = "http://localhost:4000";
  const notesinitial = [];
  const [notes, setNotes] = useState(notesinitial);

  // Fetch all notes
  const fetchNotes = async () => {
    try {
      console.log("Fetching notes from backend...");
      const response = await fetch(`${host}/api/notes/fetchallnotes`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjc5Mjc5YjliN2EzODQ1NWJmYzNjZjVlIn0sImlhdCI6MTczNzY5ODQ2M30.IRe1ve1bVamopF5o5_qNwzXQVgWqEiO157dxTjHVUTg"
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch notes: ${response.status}`);
      }

      const json = await response.json();
      console.log("Fetched notes:", json);
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
          "Content-Type": "application/json",
          "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjc5Mjc5YjliN2EzODQ1NWJmYzNjZjVlIn0sImlhdCI6MTczNzY5ODQ2M30.IRe1ve1bVamopF5o5_qNwzXQVgWqEiO157dxTjHVUTg"
        },
        body: JSON.stringify({ title, description, tag }),
      });

      if (!response.ok) {
        throw new Error(`Failed to add note: ${response.status}`);
      }

      const json = await response.json();
      console.log("Added note:", json);
      setNotes([...notes, json]); // Add the new note to the state
    } catch (error) {
      console.error("Add note error:", error);
    }
  };

  // Delete a note
  const deletenote = async (id) => {
    try {
      const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjc5Mjc5YjliN2EzODQ1NWJmYzNjZjVlIn0sImlhdCI6MTczNzY5ODQ2M30.IRe1ve1bVamopF5o5_qNwzXQVgWqEiO157dxTjHVUTg"
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to delete note: ${response.status}`);
      }

      const json = await response.json();
      console.log("Deleted note response:", json);

      // Update local state by removing the deleted note
      const newNotes = notes.filter((note) => note._id !== id);
      setNotes(newNotes);
    } catch (error) {
      console.error("Delete note error:", error);
    }
  };

  // Edit a note
  const editnote = async (id, title, description, tag) => {
    try {
      const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjc5Mjc5YjliN2EzODQ1NWJmYzNjZjVlIn0sImlhdCI6MTczNzY5ODQ2M30.IRe1ve1bVamopF5o5_qNwzXQVgWqEiO157dxTjHVUTg"
        },
        body: JSON.stringify({ title, description, tag }),
      });

      if (!response.ok) {
        throw new Error(`Failed to update note: ${response.status}`);
      }

      const json = await response.json();
      console.log("Updated note response:", json);

      // Update local state with the edited note
      const newNotes = notes.map((note) =>
        note._id === id ? { ...note, title, description, tag } : note
      );
      setNotes(newNotes);
    } catch (error) {
      console.error("Edit note error:", error);
    }
  };

  return (
    <NoteContext.Provider value={{ notes, fetchNotes, addnote, deletenote, editnote }}>
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;