import React, { useContext, useState } from 'react';
import noteContext from "../context/notes/NoteContext";

const AddNotes = (props) => {
    const context = useContext(noteContext);
    const { addnote } = context;
    const { mode } = props; // ✅ Fix: Extract mode from props

    const [note, setnote] = useState({ title: "", description: "", tag: "default" });

    const handleclick = (e) => {
        e.preventDefault();
        addnote(note.title, note.description, note.tag);
        props.showalert("Added successfully", "success");
    };

    const onChange = (e) => {
        setnote({ ...note, [e.target.name]: e.target.value });
    };

    return (
        <div className="container my-3">
            <h2>Add a note</h2>
            <form>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        id="title" 
                        name="title" 
                        onChange={onChange} 
                        style={{
                            backgroundColor: mode === "dark" ? "#333" : "white",
                            color: mode === "dark" ? "white" : "black",
                            border: "1px solid #666"
                        }} 
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        id="description" 
                        name="description" 
                        onChange={onChange} 
                        style={{
                            backgroundColor: mode === "dark" ? "#333" : "white",
                            color: mode === "dark" ? "white" : "black",
                            border: "1px solid #666"
                        }} 
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="tag" className="form-label">Tag</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        id="tag" 
                        name="tag" 
                        onChange={onChange} 
                        style={{
                            backgroundColor: mode === "dark" ? "#333" : "white",
                            color: mode === "dark" ? "white" : "black",
                            border: "1px solid #666"
                        }} 
                    />
                </div>
                <button type="submit" className="btn btn-primary" onClick={handleclick}>Submit</button>
            </form>
        </div>
    );
};

export default AddNotes;
