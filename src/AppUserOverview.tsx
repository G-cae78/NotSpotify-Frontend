import React from "react";
import axios from 'axios';
import { useQuery } from 'react-query';//importing useQuery so we can query database for data
import {AppUserJSON}from './types';//importing UserJSON type

// creating async function to call API to get user JSON data
const fetchAppUsers= async ():Promise<AppUserJSON[]>=>{
    const response= await axios.get("http://localhost:8080/api/appUsers");
    return response.data._embedded.appUsers;//returning embedded user data
};

export const AppUserOverview: React.FC= () =>{
    const {isLoading, error, data}= useQuery<AppUserJSON[], Error>("AppUser",fetchAppUsers);//calling aync function to fetch user data

    // Error handling to check if data is being imported correctly
    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>Error Loading Albums: {error.message}</p>

    return(
        <div className="AppUser-Overview">
            <table>
                <thead>
                    {/* Creating Table header */}
                <tr className="Table-Header">
                    <th>Name</th>
                    <th>User Name</th>
                    <th>Email</th>
                    <th>Date of Birth</th>
                </tr>
                </thead>
                <tbody>
                     {/* Mapping Data to table and printing to front end screen */}
                    {data?.map((user)=>(
                        <tr key={user._links.self.href}>
                            <td>{user.name}</td>
                            <td>{user.userName}</td>
                            <td>{user.email}</td>
                            <td>{user.dob}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};