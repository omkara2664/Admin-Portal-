import React from 'react'
import { useNavigate } from 'react-router-dom';

export const MoviesNavbar = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    const navigation = useNavigate();

    const handleSignOut = () => {
        localStorage.removeItem("user");
        sessionStorage.removeItem("user");
        localStorage.removeItem("userAccessToken");
        navigation("/login");
    }

    const handleNavBack = () => {
        navigation("/login")
    }
    return (
        <div className='MoviesNavbar' >
            <nav className="navbar navbar-light bg-dark justify-content-between">
                <p className="navbar-brand" style={{ marginLeft: "10px", color: "green" }} ><span style={{ fontSize: "0.8rem" }}>Hello</span> {user.name}</p>
                <div>
                    <button onClick={() => handleSignOut()} className="btn btn-outline-success my-2 my-sm-0 " style={{ marginRight: "10px" }} type="submit">Sign Out</button>
                    <button className="btn btn-outline-success my-2 my-sm-0 " style={{ marginRight: "10px" }} onClick={() => handleNavBack()}>Back</button>
                </div>
            </nav>


        </div>
    )
}
