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
    return (
        <NoteContext.Provider value={{notes, setNotes}}> 
            {props.children}  
        </NoteContext.Provider>
    );
};

export default NoteState;
