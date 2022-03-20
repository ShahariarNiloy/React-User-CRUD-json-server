import React from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import * as api from './Api/usersApi'

const ShowUserInfo = () => {
  const { id } = useParams();
    const user = api.useSingleUserInfo(id)

    if(user?.isLoading){
        return <h2>Loading...</h2>
    }

    if(user?.isError){
        if(user?.error instanceof Error){
            return <h2>{user?.error.message}</h2>
        }
    }
const singleUser = user?.data?.data
  return (
    <div className="container">
      <h2 className='text-center text-muted mt-5'>Show User Info</h2>
      <div className="row mt-1">
        <div className="col-3"></div>
          <div className="col-6">
          <table className="table table-bordered w-30">
            <thead>
                <tr>
                <th scope="col">#</th>
                <th scope="col">Info</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                <th scope="row">ID</th>
                <td>{singleUser.id}</td>
                </tr>
                <tr>
                <th scope="row">Name</th>
                <td>{singleUser.name}</td>
                </tr>
                <tr>
                <th scope="row">User Name</th>
                <td>{singleUser.username}</td>
                </tr>
                <tr>
                <th scope="row">Email</th>
                <td>{singleUser.email}</td>
                </tr>
                
                <tr>
                <th scope="row">Address ( City )</th>
                <td>{singleUser.address.city}</td>
                </tr>
                
                <tr>
                
                <th scope="row">Phone</th>
                <td>{singleUser.phone}</td>
                </tr>
                <tr>
                <th scope="row">Website </th>
                <td>{singleUser.website}</td>
                </tr>
                <tr>
                <th scope="row">Company </th>
                <td>{singleUser.company.name}</td>
                </tr>
            </tbody>
        </table>
      <Link to="/">
        <button  type="button" className="btn btn-primary d-flex justify-content-center">Home Page</button>
      </Link>
          </div>
        </div>
      </div>

    
  );
};



export default ShowUserInfo;