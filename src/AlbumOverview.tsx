import React from "react";
import axios from 'axios';
import { useQuery } from 'react-query';
import {ArtistJSON, AlbumJSON}from './types';

const fetchAlbums= async ():Promise<AlbumJSON[]>=>{
    const response= await axios.get("http://localhost:8080/api/albums");
    return response.data._embedded.albums;
};

export const AlbumOverview: React.FC= () =>{
    const {isLoading, error, data}= useQuery<AlbumJSON[], Error>("Albums",fetchAlbums);

    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>Error Loading Albums: {error.message}</p>

    return(
        <div className="Album-Overview">
            <table>
                <thead>
                <tr className="Table-Header">
                    <th>Album Title</th>
                    <th>Release Date</th>
                    <th>Total Plays</th>
                </tr>
                </thead>
                <tbody>
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
