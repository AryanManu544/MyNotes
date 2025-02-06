import { useContext, useEffect, useRef, useState } from "react";
import noteContext from "../context/notes/NoteContext";
import Noteitem from "./Noteitem";
import AddNotes from "./AddNotes";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

const Notes = () => {
    const context = useContext(noteContext);
    const { notes, fetchNotes, editnote } = context;

    const [note, setNote] = useState({ id: "", etitle: "", edescription: "", etag: "" });

    useEffect(() => {
        fetchNotes();
    }, []);

    const ref = useRef(null);

    const handleUpdateNote = (currentNote) => {
        setNote({ id: currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag });

        if (window.bootstrap) {
            const modal = new window.bootstrap.Modal(ref.current);
            modal.show();
        } else {
            console.error("Bootstrap is not loaded");
        }
    };

    const handleSaveChanges = async () => {
        await editnote(note.id, note.etitle, note.edescription, note.etag);

        // Close the modal
        if (window.bootstrap) {
            const modal = window.bootstrap.Modal.getInstance(ref.current);
            modal.hide();
        }
    };

    return (
        <>
            <AddNotes />
            
            <div className="modal fade" id="editModal" tabIndex="-1" ref={ref} aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Edit Note</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="mb-3">
                                    <label htmlFor="etitle" className="form-label">Title</label>
                                    <input type="text" className="form-control" id="etitle" value={note.etitle} onChange={(e) => setNote({ ...note, etitle: e.target.value })} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="edescription" className="form-label">Description</label>
                                    <textarea className="form-control" id="edescription" rows="3" value={note.edescription} onChange={(e) => setNote({ ...note, edescription: e.target.value })}></textarea>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="etag" className="form-label">Tag</label>
                                    <input type="text" className="form-control" id="etag" value={note.etag} onChange={(e) => setNote({ ...note, etag: e.target.value })} />
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary" onClick={handleSaveChanges}>Save changes</button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="row my-3">
                <h2>Your notes</h2>
                <div className="container mx-1">
                {notes.length===0 && "No notes to display"}
                </div>
                {notes.map((note) => {
                    return <Noteitem key={note._id} updateNote={handleUpdateNote} note={note} />;
                })}
            </div>
        </>
    );
};

export default Notes;