import {ArtistJSON,Artist,artistEntry} from '../types';
import axios from 'axios';

export const getArtist = async (): Promise<ArtistJSON[]> => {
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/artists`);
    return response.data._embedded.artists;
  }

  export const deleteArtist = async (link: string): Promise<ArtistJSON> => {
    const response = await axios.delete(link);
    return response.data
  }
  
  export const addArtist = async (artist: Artist): Promise<ArtistJSON> => {
    const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/artists`, artist, {
      headers: { 'Content-Type': 'application/json', },
    });
  
    return response.data;
  }
  
  export const updateArtist = async (artistEntry: artistEntry): Promise<ArtistJSON> => {
    const response = await axios.put(artistEntry.url, artistEntry.artist, {
      headers: {
      'Content-Type': 'application/json'
      },
    });
  
    return response.data;
  }