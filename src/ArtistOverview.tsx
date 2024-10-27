import React from 'react';
import axios from 'axios';
import { useQuery } from 'react-query';//importing useQuery so we can query database for data
import {ArtistJSON, AlbumJSON}from './types';//importing ArtistJSON type

//creating async function to call API to get artist JSON data
const fetchArtists = async (): Promise<ArtistJSON[]> => {
  const response = await axios.get("http://localhost:8080/api/artists");
  console.log(response.data._embedded.artists)
  return response.data._embedded.artists; //returning embedded artists data
};

export const ArtistOverview: React.FC = () => {
  const { isLoading, error, data } = useQuery<ArtistJSON[], Error>("Artists", fetchArtists);//calling aync function to fetch data

  // Error handling to check if data is being imported correctly
  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading artists: {error.message}</p>;

  return (
    <div className="Artist-Overview">
      <table>
        <thead>
             {/* Creating Table header */}
          <tr className='Table-Header'>
            <th>Artist Username</th>
            <th>Real Name</th>
            <th>Genre</th>
            <th>Monthly Listeners</th>
            <th>Year Joined</th>
          </tr>
        </thead>
        <tbody>
             {/* Mapping Data to table and printing to front end screen */}
          {data?.map((artist) => (
            <tr key={artist._links.self.href}>
              <td>{artist.artistUserName}</td>
              <td>{artist.realName}</td>
              <td>{artist.genre}</td>
              <td>{artist.monthlyListeners}</td>
              <td>{artist.year}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
