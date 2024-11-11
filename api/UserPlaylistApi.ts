import {UserPlaylistJSON,UserPlaylist,userPlaylistEntry} from '../types';
import axios from 'axios';

export const getUserPlaylist = async (): Promise<UserPlaylistJSON[]> => {
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/userPlaylists`);
    return response.data._embedded.userPlaylists;
  }

  export const deleteUserPlaylist = async (link: string): Promise<UserPlaylistJSON> => {
    const response = await axios.delete(link);
    return response.data
  }
  
  export const addUserPlaylist = async (userPlaylist: UserPlaylist): Promise<UserPlaylistJSON> => {
    const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/userPlaylists`, userPlaylist, {
      headers: { 'Content-Type': 'application/json', },
    });
  
    return response.data;
  }
  
  export const updateUserplaylist = async (userPlaylist: userPlaylistEntry): Promise<UserPlaylistJSON> => {
    const response = await axios.put(userPlaylist.url, userPlaylist.userPlaylist, {
      headers: {
      'Content-Type': 'application/json'
      },
    });
  
    return response.data;
  }
