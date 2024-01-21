import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Loading from "../components/Loading";

function UserEdit() {

    let { userid } = useParams();
    const [loading, setLoading] = useState(true);
    const [inputErrorList, setInputErrorList] = useState({});
    const [user, setUser] = useState({});

    useEffect(() => {
    
        axios.get(`http://localhost:8000/api/users/${userid}/edit`).then(res => {
            console.log(res)
            setUser(res.data.user);
            setLoading(false);
        })
        .catch(function (error) {

            if(error.response){

                if (error.response.status === 404) {
                    alert(error.response.data.message);
                    setLoading(false);
                }
                if (error.response.status === 500) {
                    alert(error.response.data);
                    setLoading(false);
                }
            }
           
        });
     
   }, [userid]);

    const handleInput = (e) => {
        e.persist();
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const updateUser = async (e) => {
        e.preventDefault();

        setLoading(true);
        const data = {
            username: user.username,
            password: user.password,
            email: user.email,
            nama_lengkap: user.nama_lengkap,
            alamat: user.alamat
        };

        try {
            const res = await axios.put(`http://localhost:8000/api/users/${userid}/edit`, data);
            alert(res.data.message);
            setLoading(false);
        } catch (error) {
            if (error.response.status === 422) {
                setInputErrorList(error.response.data.errors);
                setLoading(false);
            }
            if (error.response.status === 404) {
                alert(error.response.data.message);
                setLoading(false);
            }
            
            else if (error.response.status === 500) {
                alert(error.response.data);
                setLoading(false);
            }
        }
    };

    if (loading) {
        return (
            <div>
                <Loading />
            </div>
        );
    }

    if(Object.keys(user).length === 0){
        return (
            <div className="container">
                <h4>Data Tidak Ditemukan!</h4>
            </div>
        )
    }
    return (
        <div>
            <div className="container mt-5">
                <div className="row">
                    <div className="col-md-12">
                        <div className="card">
                            <div className="card-header">
                                <h4>Edit User</h4>
                                <Link className="btn btn-primary float-end" to="/users">
                                    Kembali
                                </Link>
                            </div>
                            <div className="card-body">
                                <form onSubmit={updateUser}>
                                    <div className="mb-3">
                                        <label>Username</label>
                                        <input
                                            type="text"
                                            name="username"
                                            value={user.username}
                                            onChange={handleInput}
                                            className="form-control"
                                        />
                                        <span className="text-danger">{inputErrorList.username}</span>
                                    </div>
                                    <div className="mb-3">
                                        <label>Password</label>
                                        <input
                                            type="password"
                                            name="password"
                                            value={user.password}
                                            onChange={handleInput}
                                            className="form-control"
                                        />
                                        <span className="text-danger">{inputErrorList.password}</span>
                                    </div>
                                    <div className="mb-3">
                                        <label>Email</label>
                                        <input
                                            type="text"
                                            name="email"
                                            value={user.email}
                                            onChange={handleInput}
                                            className="form-control"
                                        />
                                        <span className="text-danger">{inputErrorList.email}</span>
                                    </div>
                                    <div className="mb-3">
                                        <label>Nama</label>
                                        <input
                                            type="text"
                                            name="nama_lengkap"
                                            value={user.nama_lengkap}
                                            onChange={handleInput}
                                            className="form-control"
                                        />
                                        <span className="text-danger">{inputErrorList.nama_lengkap}</span>
                                    </div>
                                    <div className="mb-3">
                                        <label>Alamat</label>
                                        <input
                                            type="text"
                                            name="alamat"
                                            value={user.alamat}
                                            onChange={handleInput}
                                            className="form-control"
                                        />
                                        <span className="text-danger">{inputErrorList.alamat}</span>
                                    </div>
                                    <div className="mb-3">
                                        <button type="submit" className="btn btn-primary">
                                            Simpan
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UserEdit;
