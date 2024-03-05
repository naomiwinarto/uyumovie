import React from "react";
import { useState } from "react";
import './App.css'
import SearchIcon from './Search.svg'
import MovieCard from "./MovieCard";

//API key = ec20f209

const API_URL = 'http://www.omdbapi.com/?i=tt3896198&apikey=ec20f209';

const App = () => {
    const [movies, setMovies] = useState([]);
    const [types, setTypes] = useState("");
    const [searchTerm, setSearchTerm] = useState([]);

    const searchMovies = async (title, type) => {
        const response = await fetch(`${API_URL}&s=${title}&type=${type}`);
        const data = await response.json();
        console.log(data);
        setMovies(data.Search);
    }

    return (
        <div className="app">
            <h1>UyuMovie</h1>
            <div className="search">
                <input 
                    placeholder="Search for movies"
                    value={searchTerm}
                    onChange={(e) => {setSearchTerm(e.target.value)}}
                />
                <img 
                    src={SearchIcon}
                    alt="search"
                    onClick={() => searchMovies(searchTerm, types)}
                />
            </div>

            <div className="type"> 
                <label> 
                    <input type={"radio"} name="type" onChange={(e) => setTypes("")}/>
                    <h2 className="checkButton"> All </h2>
                </label>
                <label>
                    <input type={"radio"} name="type" onChange={(e) => setTypes("movie")} /> {/* e.target.checked ? setTypes("movie") : setType("") */}
                    <h2 className="checkButton"> Movie </h2>
                </label>
                <label>
                    <input type={"radio"} name="type" onChange={(e) => setTypes("series")} />
                    <h2 className="checkButton"> Series </h2>
                </label>
                <label>
                    <input type={"radio"} name="type" onChange={(e) => setTypes("episode")} />
                    <h2 className="checkButton"> Episode </h2>
                </label>
            </div>

            {
                movies?.length > 0 ? (
                    <div className="container">
                        {movies.map((movie) => (
                            <MovieCard key={movie.imdbID} movie={movie}/>
                        ))}
                    </div>
                ) : (
                    <div className="empty">
                        <h2>No movies found.</h2>
                    </div>
                )
            }

            
        </div>
    );
}

export default App;