import React from "react";
import axios from 'axios';
import { useQuery } from 'react-query';
import {AppUserJSON}from './types';

const fetchAppUsers= async ():Promise<AppUserJSON[]>=>{
    const response= await axios.get("http://localhost:8080/api/appUsers");
    return response.data._embedded.appUsers;
};

export const AppUserOverview: React.FC= () =>{
    const {isLoading, error, data}= useQuery<AppUserJSON[], Error>("AppUser",fetchAppUsers);

    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>Error Loading Albums: {error.message}</p>

    return(
        <div className="AppUser-Overview">
            <table>
                <thead>
                <tr className="Table-Header">
                    <th>Name</th>
                    <th>User Name</th>
                    <th>Email</th>
                    <th>Date of Birth</th>
                </tr>
                </thead>
                <tbody>
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