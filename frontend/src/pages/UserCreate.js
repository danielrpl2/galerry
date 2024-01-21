import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Loading from "../components/Loading";

function UserCreate() {

    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [inputErrorList, setInputErrorList] = useState({});
    const [user, setUser] = useState({
        username: '',
        password: '',
        email: '',
        nama_lengkap: '',
        alamat: ''
    });

    const handleInput = (e) => {
        e.persist();
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const saveUser = async (e) => {
        e.preventDefault();

        setLoading(true);
        const data = {
            // userid: user.userid,
            username: user.username,
            password: user.password,
            email: user.email,
            nama_lengkap: user.nama_lengkap,
            alamat: user.alamat,
        }
        axios.post('http://localhost:8000/api/users', data)
        .then(res => {
            alert(res.data.message);
            navigate('/users')
            setLoading(false);
        })
        .catch(function (error) {

            if(error.response.status === 422){
                setInputErrorList(error.response.data.errors)
            } 
            if(error.response.status === 500){
                alert(error.response.data)
            } 
        });
    }
    if (loading) {
        return (
            <div>
                <Loading />
            </div>
        );
    }


    return (
        <div>
            <div className="container mt-5">
                <div className="row">
                    <div className="col-md-12">
                        <div className="card">
                            <div className="card-header">
                                <h4>Tambah User</h4>
                                <Link className="btn btn-primary float-end" to="/users">
                                    Kembali
                                </Link>
                            </div>
                            <div className="card-body">
                                <form onSubmit={saveUser}>
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

export default UserCreate;
