import React from 'react';
import axios from 'axios';
import { useQuery } from 'react-query';
import {ArtistJSON, AlbumJSON}from './types';

const fetchArtists = async (): Promise<ArtistJSON[]> => {
  const response = await axios.get("http://localhost:8080/api/artists");
  console.log(response.data._embedded.artists)
  return response.data._embedded.artists;
};

export const ArtistOverview: React.FC = () => {
  const { isLoading, error, data } = useQuery<ArtistJSON[], Error>("Artists", fetchArtists);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading artists: {error.message}</p>;

  return (
    <div className="Artist-Overview">
      <table>
        <thead>
          <tr className='Table-Header'>
            <th>Artist Username</th>
            <th>Real Name</th>
            <th>Genre</th>
            <th>Monthly Listeners</th>
            <th>Year Joined</th>
          </tr>
        </thead>
        <tbody>
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
