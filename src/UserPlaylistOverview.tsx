import React from "react";
import axios from 'axios';
import { useQuery } from 'react-query';
import {UserPlaylistJSON, SongJSON}from './types';

const fetchPlaylist= async ():Promise<UserPlaylistJSON[]>=>{
    const response= await axios.get("http://localhost:8080/api/userPlaylists");
    return response.data._embedded.userPlaylists;
};
export const UserPlaylistOverview: React.FC= () =>{
    const {isLoading, error, data}= useQuery<UserPlaylistJSON[], Error>("Playlists",fetchPlaylist);

    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>Error Loading Albums: {error.message}</p>

    return(
        <div className="Playlist-Overview">
            <table>
                <thead>
                <tr className="Table-Header">
                    <th>Playlist Name</th>
                    <th>Playlist Length</th>
                    <th>Songs</th>
                </tr>
                </thead>
                <tbody>
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
