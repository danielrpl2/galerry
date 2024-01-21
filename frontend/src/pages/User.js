import { Link } from "react-router-dom";
import React, {useEffect, useState} from "react";
import axios from "axios";
import Loading from "../components/Loading";

function User() {

    const [loading, setLoading ] = useState([true]);
    const [users, setUsers ] = useState([]);

   useEffect(() => {
    
        axios.get('http://localhost:8000/api/users').then(res => {
            console.log(res)
            setUsers(res.data.users);
            setLoading(false);
        });
     
   }, [])
   
   const deleteUser = (e, userid) => {
        e.preventDefault();

        const thisClicked = e.currentTarget;
        thisClicked.innerText = "Menghapus...";

        axios.delete(`http://localhost:8000/api/users/${userid}/delete`)
        .then(res => {
            alert(res.data.message);
            thisClicked.closest("tr").remove();

        })
        .catch(function (error) {

            if (error.response.status === 404) {
                alert(error.response.data.message);
                thisClicked.innerText = "Delete";

            }

            if(error.response.status === 500){
                alert(error.response.data)
            } 
        });
   }

   if(loading){
    return (
        <div>
            <Loading />
        </div>
    )
   }
   var usersDetails = "";
   usersDetails = users.map( (item, index) => {
    return(
        <tr key={index}>
            <td>{item.userid}</td>
            <td>{item.username}</td>
            <td>{item.password}</td>
            <td>{item.email}</td>
            <td>{item.nama_lengkap}</td>
            <td>{item.alamat}</td>
            <td>
                <Link to={`/users/${item.userid}/edit`} className="btn btn-success">Edit</Link>
            </td>
            <td>
                {/* <Link to="/" className="btn btn-danger">Delete</Link> */}
                <button type="button" onClick={(e) => deleteUser(e, item.userid)} className="btn btn-danger">Delete</button>
            </td>
        </tr>
    )
   });
    
    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-md-12">
                    <div className="card">
                        <div className="card-header">
                            <h4>Daftar User</h4>
                            <Link className="btn btn-primary float-end" to="/users/create">Tambah User</Link>
                        </div>
                        <div className="card-body">
                            <table className="table table-striped">
                                <thead>
                                    <tr>
                                        <th>UserId</th>
                                        <th>Username</th>
                                        <th>Password</th>
                                        <th>Email</th>
                                        <th>Nama Lengkap</th>
                                        <th>Alamat</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {usersDetails}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default User;