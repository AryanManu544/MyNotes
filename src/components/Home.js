import React, { useContext } from "react";
import Notes from "./Notes";
import AddNotes from "./AddNotes";

const Home = () => {
    
    return (
        <div>
            <AddNotes/>
            <Notes/>
        </div>
    )
}
export default Home;
