import React from "react";
import axios from 'axios';
import { useQuery } from 'react-query';
import { SongJSON }from './types';

const fetchSongs= async ():Promise<SongJSON[]>=>{
    const response= await axios.get("http://localhost:8080/api/songs");
    return response.data._embedded.songs;
};

export const SongOverview: React.FC= () =>{
    const {isLoading, error, data}= useQuery<SongJSON[], Error>("Songs",fetchSongs);

    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>Error Loading Songs: {error.message}</p>

    return(
        <div className="Album-Overview">
            <table>
                <thead>
                <tr className="Table-Header">
                    <th>Song Title</th>
                    <th>Song Length(in minutes)</th>
                    <th>Release Date</th>
                </tr>
                </thead>
                <tbody>
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
