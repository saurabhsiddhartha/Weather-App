import React from "react";
import TempCard from "./TempCard";
 

const Home = () => {
    return (
        <>
        <div className="cover-page">
            <h1>Current Weather</h1>
            <div className="search-container">
                <input type="text" placeholder="Enter location" />
                <button>Search</button>
            </div>
        <TempCard/>
        </div>
        </>
    );
}

export default Home;
