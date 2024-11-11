import {songEntry,SongJSON,Song} from '../types';
import axios from 'axios';

export const getSongs = async (): Promise<SongJSON[]> => {
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/songs`);
    return response.data._embedded.songs;
  }

  export const deleteSong = async (link: string): Promise<SongJSON> => {
    const response = await axios.delete(link);
    return response.data
  }
  
  export const addSong = async (song: Song): Promise<SongJSON> => {
    const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/songs`, song, {
      headers: { 'Content-Type': 'application/json', },
    });
  
    return response.data;
  }
  
  export const updateSong = async (songEntry: songEntry): Promise<SongJSON> => {
    const response = await axios.put(songEntry.url, songEntry.song, {
      headers: {
      'Content-Type': 'application/json'
      },
    });
  
    return response.data;
  }
