import axios from 'axios';
import React, {useContext, useState} from 'react';
import { useMutation, useQueryClient } from 'react-query';

import { Link } from 'react-router-dom'

import * as api from './Api/usersApi'
function Showtable(props:any) {
    

    const {mutate:del} = api.useDeleteUser()

    const deleteUser = (id:any)=>{
        // const {mutate:del} = useDeleteUser()
        del(id)
        // const currUsers = users.filter((currUser:any) => currUser.id!== id);
       
    }

    const onSuccess = (data:any)=>{
        console.log("On success, after data fetching", data);
    }

    const onError = (error:any)=>{
        console.log("On Error while fetching data", error);
    }
    const users = api.useFetchUsersInfo(onSuccess,onError)
    console.log("Query: ",users);
    
    if(users?.isLoading){
        return <h2>Loading...</h2>
    }
    if (users?.isError) {
        if (users?.error instanceof Error) {
            return <h2>{users?.error.message}</h2>
        }
       
      }
    return (
        <div className='container' >
            <h2 className='text-center text-muted mt-5'>Users List</h2>
            <div className="row">
                <div className="col-md-1"></div>
                <div className="col-md-9">
                <table className="table table-striped text-center">
                <thead>
                    <tr>
                        <th scope="col">id</th>
                        <th scope="col">Name</th>
                        <th scope="col">Username</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody >
                {users?.data?.data?.map((user:any) => (
                        <tr key={user.id}>
                        <td>{user.id}</td>
                        <td>{user.name}</td>
                        <td>{user.username}</td>
                        <td>
                        <Link to={"/show/"+user.id}>
                            <button  type="button" className="btn btn-success mx-2">Show</button>
                        </Link>
                        
                        <Link to={"/edit/"+user.id}>
                            <button type="button" className="btn btn-warning mx-2">Edit</button>
                        </Link>
                        <button onClick={() => deleteUser(user.id)} type="button" className="btn btn-danger">Delete</button>
                        </td>  
                        </tr>
                        
                    ))}
                </tbody>
            </table>
            <Link to='/create'>
                <button type="button" className="btn btn-primary w-100">Create New User</button>
            </Link>
                </div>
            </div>
            
        </div>
    );
}

export default Showtable;