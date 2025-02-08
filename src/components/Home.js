import React, { useContext } from "react";
import Notes from "./Notes";
import AddNotes from "./AddNotes";

const Home = (props) => {
    const { showalert, mode } = props;
    return (
        <div style={{ backgroundColor: mode === "dark" ? "#121212" : "white", color: mode === "dark" ? "white" : "black", minHeight: "100vh" }}>
            <Notes showalert={showalert} mode={mode} />
        </div>
    );
};
export default Home;