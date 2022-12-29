import React, { useState, useEffect } from 'react'
import './Admin.css'
import axios from "axios";
import { useNavigate } from 'react-router-dom';


export const Admin = () => {
    const [users, setUsers] = useState([]);
    const [active, setActive] = useState(["true"]);

    const data = localStorage.getItem("admin")
    const admin = JSON.parse(data);             // we store data in localstorage in strig formate so it get convert into boj.
    const navigate = useNavigate();

    const handleOnBack = () => {
        navigate('/login');
    }

    const handleOnSignOut = () => {
        localStorage.removeItem("admin");
        localStorage.removeItem("adminAccessToken");
        navigate("/login");
    }

    const handleOnActive = (id) => {
        axios.put(`http://localhost:3002/api/user/active/${id}`, {
        })
            .then((response) => {
                const success = response.data.success;
                if (success === true) {
                    setActive(["true"]);
                }
                else {
                    console.log("error in in request of active user")
                }
            }).catch((error) => console.error(error));


    }
    const handleOnDeActive = (id) => {

        axios.delete(`http://localhost:3002/api/user/${id}`, {
        })
            .then((response) => {
                const success = response.data.success;
                if (success === true) {
                    setActive(["false"]);
                }
                else {
                    console.log("error in in request of deactive user")
                }
            }).catch((error) => console.error(error));

    }
    useEffect(() => {
        axios.get("http://localhost:3002/api/user", {
        }).then((response) => {
            const users = response.data.data.users;
            setUsers(users);
        }).catch((error) => console.error(error));
    }, [active])
    return (

        <div className='admin'>
            <div className='item adminSideBar '>
                <button onClick={() => handleOnBack()} className="btn btn-outline-info" style={{ marginTop: "1rem", marginLeft: "0.5rem" }}>Back</button>
                <div className='adminProfile'>
                    <img src={require("../../assets-2/dummy-profile-pic.png")} alt="user" style={{ width: "100%", height: "30%", borderRadius: "4mm" }} />
                    <div style={{ margin: "1rem" }}>
                        <h3 style={{ fontWeight: "bold", fontSize: "20px" }}>{admin.title}  {admin.name}</h3>
                        <p>{admin.email}</p>
                    </div>
                    <button onClick={() => handleOnSignOut()} style={{ position: "relative", bottom: "-300px", right: "-140px" }} className="btn btn-outline-dark" >Sign Out</button>
                </div>
            </div>

            <div className='item adminHead'>
                <div className='adminHeadBody'>
                    <h1 style={{ fontFamily: "cursive", fontStyle: "italic", marginLeft: "2rem" }}>Welcome inside Admin</h1>
                </div>
            </div>

            <div className='item adminBody'>
                <div className='adminBodyContain'>
                    <div className='mapContainer' >
                        {users.map((user) => (
                            <div key={user._id} className="userMapInAdmin">

                                <div className='userMapInAdminList'>
                                    <li>{user.title + " "}{user.name}</li>
                                    <li>{user.email}</li>
                                    <li> {user.isActivated ? <p style={{ color: "green" }}>Activated </p> : <p style={{ color: "red" }}>Deactivated </p>}</li>
                                </div>
                                <div className='buttonInAdminMap'>
                                    <button onClick={() => handleOnActive(user._id)} className="btn btn-success">Active</button>
                                    <button onClick={() => handleOnDeActive(user._id)} className="btn btn-danger" style={{ marginLeft: "4px" }}>Deactive</button></div>

                            </div>
                        ))}
                    </div>
                </div>
            </div>

        </div >

    )
}
