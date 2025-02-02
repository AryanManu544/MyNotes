import { useContext } from "react";
import react from "react";
import noteContext from "../context/notes/NoteContext";
import Noteitem from "./Noteitem"
import AddNotes from "./AddNotes";
 

const Notes = () => {
    const context = useContext(noteContext)
    const {notes, addnote} = context
    return(
        <>
        <div className="row my-3">
            <h2>Your notes</h2>
            {notes.map((note) => {
                return <Noteitem key = {note._id} note = {note}/>
            })}
        </div>
        </>
    )
}
export default Notes;