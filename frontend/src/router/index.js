import { Routes, Route } from "react-router-dom";

import Home from "../pages/Home";
import Album from "../pages/Album";
import Foto from "../pages/Foto";
import UserList from "../pages/User";
import UserCreate from "../pages/UserCreate";
import UserEdit from "../pages/UserEdit";


function MyRouter() {
    return(
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/album" element={<Album />} />
            <Route path="/foto" element={<Foto />} />
            <Route path="/users" element={<UserList />} />
            <Route path="/users/create" element={<UserCreate />} />
            <Route path="users/:userid/edit" element={<UserEdit />} />
        </Routes>
    )
}

export default MyRouter;