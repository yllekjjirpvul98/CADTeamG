import React from 'react'
import UpdateUser from "../components/UpdateUser";
import User from "../components/User";
import { Link } from "react-router-dom";

export default function Home() {
    return (
        <div>
            <Link to="/register">Register</Link>
            <User />
            <UpdateUser />
        </div>
    )
}
