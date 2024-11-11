import {AppUserJSON,AppUser,appUserEntry} from '../types';
import axios from 'axios';

export const getAppUsers = async (): Promise<AppUserJSON[]> => {
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/appUsers`);
    return response.data._embedded.appUsers;
  }

  export const deleteAppUsers = async (link: string): Promise<AppUserJSON> => {
    const response = await axios.delete(link);
    return response.data
  }
  
  export const addAppUser = async (appUser: AppUser): Promise<AppUserJSON> => {
    const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/appUsers`, appUser, {
      headers: { 'Content-Type': 'application/json', },
    });
  
    return response.data;
  }
  
  export const updateAppUser = async (appUser: appUserEntry): Promise<AppUserJSON> => {
    const response = await axios.put(appUser.url, appUser.appUser, {
      headers: {
      'Content-Type': 'application/json'
      },
    });
  
    return response.data;
  }