import React from "react";
import axios from 'axios';
import { useQuery } from 'react-query';//importing useQuery so we can query database for data
import {ArtistJSON, AlbumJSON}from './types';//importing AlbumJSON type

// creating async function to call API to get album JSON data
const fetchAlbums= async ():Promise<AlbumJSON[]>=>{
    const response= await axios.get("http://localhost:8080/api/albums");
    return response.data._embedded.albums;//returning embedded album data
};

export const AlbumOverview: React.FC= () =>{
    const {isLoading, error, data}= useQuery<AlbumJSON[], Error>("Albums",fetchAlbums);//calling aync function to fetch album data

    // Error handling to check if data is being imported correctly
    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>Error Loading Albums: {error.message}</p>

    return(
        <div className="Album-Overview">
            <table>
                <thead>
                    {/* Creating Table header */}
                <tr className="Table-Header">
                    <th>Album Title</th>
                    <th>Release Date</th>
                    <th>Total Plays</th>
                </tr>
                </thead>
                <tbody>
                    {/* Mapping Data to table and printing to front end screen */}
                    {data?.map((album)=>(
                        <tr key={album._links.self.href}>
                            <td>{album.albumTitle}</td>
                            <td>{album.releaseDate}</td>
                            <td>{album.totalPlays}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};
