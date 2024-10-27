import React from "react";
import axios from 'axios';
import { useQuery } from 'react-query';//importing useQuery so we can query database for data
import { SongJSON }from './types';//importing SongJSON type

// creating async function to call API to get album JSON data
const fetchSongs= async ():Promise<SongJSON[]>=>{
    const response= await axios.get("http://localhost:8080/api/songs");
    return response.data._embedded.songs;//returning embedded song data
};

export const SongOverview: React.FC= () =>{
    const {isLoading, error, data}= useQuery<SongJSON[], Error>("Songs",fetchSongs);//calling aync function to fetch song data

    // Error handling to check if data is being imported correctly
    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>Error Loading Songs: {error.message}</p>

    return(
        <div className="Album-Overview">
            <table>
                <thead>
                    {/* Creating Table header */}
                <tr className="Table-Header">
                    <th>Song Title</th>
                    <th>Song Length(in minutes)</th>
                    <th>Release Date</th>
                </tr>
                </thead>
                <tbody>
                     {/* Mapping Data to table and printing to front end screen */}
                    {data?.map((song)=>(
                        <tr key={song._links.self.href}>
                            <td>{song.songTitle}</td>
                            <td>{song.songLength}</td>
                            <td>{song.releaseDate}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};
