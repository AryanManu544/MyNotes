import { useState } from "react";
import NoteContext from "./NoteContext";

const NoteState = (props) => { 
   const notesinitial = [
    {
      "_id": "6799eb85a33c6f93d74c9974",
      "user": "679279b9b7a38455bfc3cf5e",
      "title": "mytitle",
      "description": "Please wake up early",
      "tag": "Personal",
      "date": "2025-01-29T08:49:09.203Z",
      "__v": 0
    }
  ]   
  const [notes,setNotes] = useState(notesinitial)

  //Add a note
  const addnote = (title, description,tag) => {
    const note = {
      //Todo api call
      "_id": "6799eb85a33c6f93d74c9974",
      "user": "679279b9b7a38455bfc3cf5e",
      "title": title,
      "description": description,
      "tag": tag,
      "date": "2025-01-29T08:49:09.203Z",
      "__v": 0
    };
    setNotes(notes.concat(note))
  }
  //Delete a note
  const deletenote = (id) => {
    //Todo api call
    console.log("Deleting the note with id:"+id)
    const newnotes = notes.filter((note) => {return note._id!==id})
    setNotes(newnotes)
  }
  
  //Edit a note
  const editnote = (id, title, description, tag) => {
    for (let index = 0; index < notes.length; index++){
      const element = notes[index]
      if(element._id === id){
        element.title = title
        element.description = description 
        element.tag = tag 
      }
    }
  }
    return (
        <NoteContext.Provider value={{notes, addnote, deletenote, editnote}}> 
            {props.children}  
        </NoteContext.Provider>
    );
};

export default NoteState;
