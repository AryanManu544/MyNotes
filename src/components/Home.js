import React, { useContext } from "react";
import Notes from "./Notes";
import AddNotes from "./AddNotes";

const Home = (props) => {
    const {showalert} = props 
    return (
        <div>
            <Notes showalert = {showalert}/>
        </div>
    )
}
export default Home;
