import React from "react";
import axios from 'axios';
import { useQuery } from 'react-query';//importing useQuery so we can query database for data
import {UserPlaylistJSON, SongJSON}from './types';//importing PlaylistJSON type

// creating async function to call API to get playlist JSON data
const fetchPlaylist= async ():Promise<UserPlaylistJSON[]>=>{
    const response= await axios.get("http://localhost:8080/api/userPlaylists");
    return response.data._embedded.userPlaylists;//returning embedded playlist data
};
export const UserPlaylistOverview: React.FC= () =>{
    const {isLoading, error, data}= useQuery<UserPlaylistJSON[], Error>("Playlists",fetchPlaylist);//calling aync function to fetch playlist data

    // Error handling to check if data is being imported correctly
    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>Error Loading Albums: {error.message}</p>

    return(
        <div className="Playlist-Overview">
            <table>
                <thead>
                     {/* Creating Table header */}
                <tr className="Table-Header">
                    <th>Playlist Name</th>
                    <th>Playlist Length</th>
                    {/* <th>Songs</th> */}
                </tr>
                </thead>
                <tbody>
                     {/* Mapping Data to table and printing to front end screen */}
                    {data?.map((playlist)=>(
                        <tr key={playlist._links.self.href}>
                            <td>{playlist.playlistName}</td>
                            <td>{playlist.playlistLength}</td>
                            {/* <td>{playlist._links.song.href}</td>  */}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};
