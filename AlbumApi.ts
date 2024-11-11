import {AlbumJSON,Album,AlbumEntry} from '../types';
import axios from 'axios';

export const getAlbums = async (): Promise<AlbumJSON[]> => {
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/albums`);
    console.log(response.data._embedded.album);
    return response.data._embedded.albums;
  }

  export const deleteAlbum = async (link: string): Promise<AlbumJSON> => {
    const response = await axios.delete(link);
    return response.data
  }
  
  export const addAlbum = async (album: Album): Promise<AlbumJSON> => {
    const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/albums`, album, {
      headers: { 'Content-Type': 'application/json', },
    });
  
    return response.data;
  }
  
  export const updateAlbum = async (albumEntry: AlbumEntry): Promise<AlbumJSON> => {
    const response = await axios.put(albumEntry.url, albumEntry.album, {
      headers: {
      'Content-Type': 'application/json'
      },
    });
  
    return response.data;
  }