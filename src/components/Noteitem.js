import React, {useContext} from "react"
import noteContext from "../context/notes/NoteContext";

const Noteitem = (props) => {
    const context = useContext(noteContext)
    const {deletenote} = context
    const { note } = props
    return (
        <div className="col-md-3">
            <div className="card my-3">
                <div className="card-body">
                    <div className="d-flex">
                    <h5 className="card-title">{note.title}</h5>
                    <i className="fa-solid fa-trash-can my-1 mx-2" onClick={() => {deletenote(note._id)}}></i>
                    <i className="fa-regular fa-pen-to-square my-1 mx-2"></i>
                    </div>
                    <p className="card-text">{note.description}</p>
                </div>
            </div>
        </div>
    )
}
export default Noteitem