import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

export const Register = () => {
    const navigate = useNavigate();
    const [data, setData] = useState({ type: "", title: "", name: "", email: "", password: "", key: "" });

    const handelOnChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value })
    }
    const handelOnBack = () => {
        navigate('/login');
    }
    const handelOnSubmit = () => {
        if (data.type.trim().length === 0 || data.title.trim().length === 0 || data.name.trim().length === 0 || data.email.trim().length === 0 || data.password.trim().length === 0) {
            window.alert("Empty data not allowed")
            return Error;
        }

        axios.post(`http://localhost:3002/api/${data.type}/register`, data, {
            headers: { "content-type": "application/json" },
        }).then((response) => {
            if (response.data.success) {
                setData({ type: "", title: "", name: "", email: "", password: "" });
                navigate("/login");
            }
        }).catch((error) => {
            console.error(error.response.data.message);
            return error;
        })
        // console.log(data);
    }

    return (
        <>
            <section className="vh-100" style={{ backgroundColor: '#eee' }}>
                <div className="container h-100">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col-lg-12 col-xl-11">
                            <div className="card text-black" style={{ borderRadius: 25 }}>
                                <div className="card-body p-md-5">
                                    <div className="row justify-content-center">
                                        <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                                            <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Sign up</p>
                                            <form className="mx-1 mx-md-4">
                                                <div style={{ marginLeft: '18px' }}>
                                                    <label style={{ marginRight: '10px', fontWeight: 'bold' }}>Registration For</label>
                                                    <div className="form-check form-check-inline">
                                                        <input
                                                            className="form-check-input"
                                                            type="radio"
                                                            name="type"
                                                            id="admin"
                                                            value="admin"
                                                            onChange={handelOnChange}
                                                        />
                                                        <label className="form-label" htmlFor="inlineRadio1">Admin</label>
                                                    </div>
                                                    <div className="form-check form-check-inline">
                                                        <input
                                                            className="form-check-input"
                                                            type="radio"
                                                            name="type"
                                                            id="user"
                                                            value="user"
                                                            onChange={handelOnChange}
                                                        />
                                                        <label className="form-label" htmlFor="inlineRadio2">User</label>
                                                    </div>
                                                </div>

                                                <div className="d-flex flex-row align-items-center mb-4">
                                                    <i className="fas fa-user fa-lg me-3 fa-fw" />
                                                    <div className="form-outline flex-fill mb-0">
                                                        <input
                                                            type="text"
                                                            name='title'
                                                            id="title"
                                                            value={data.title}
                                                            onChange={handelOnChange}
                                                            className="form-control"
                                                            placeholder='Mr,Ms,Miss'
                                                        />
                                                    </div>
                                                </div>
                                                <div className="d-flex flex-row align-items-center mb-4">
                                                    <i className="fas fa-envelope fa-lg me-3 fa-fw" />
                                                    <div className="form-outline flex-fill mb-0">
                                                        <input
                                                            type="text"
                                                            name="name"
                                                            id="name"
                                                            value={data.name}
                                                            onChange={handelOnChange}
                                                            className="form-control"
                                                            placeholder='Enter Your Name'
                                                        />

                                                    </div>
                                                </div>
                                                <div className="d-flex flex-row align-items-center mb-4">
                                                    <i className="fas fa-lock fa-lg me-3 fa-fw" />
                                                    <div className="form-outline flex-fill mb-0">
                                                        <input
                                                            type="email"
                                                            name="email"
                                                            id="email"
                                                            value={data.email}
                                                            onChange={handelOnChange}
                                                            className="form-control"
                                                            placeholder='Enter Your Email'
                                                        />
                                                    </div>
                                                </div>
                                                <div className="d-flex flex-row align-items-center mb-0">
                                                    <i className="fas fa-key fa-lg me-3 fa-fw" />
                                                    <div className="form-outline flex-fill mb-0">
                                                        <input
                                                            type="password"
                                                            name='password'
                                                            id="password"
                                                            value={data.password}
                                                            onChange={handelOnChange}
                                                            className="form-control"
                                                            placeholder='password' />
                                                        <label className="form-label" htmlFor="form3Example4cd"></label>
                                                    </div>
                                                </div>
                                                <div className="d-flex flex-row align-items-center mb-4">
                                                    <i className="fas fa-key fa-lg me-3 fa-fw" />
                                                    <div className="form-outline flex-fill mb-0">
                                                        <input
                                                            type="password"
                                                            name='key'
                                                            id="key"
                                                            value={data.key}
                                                            onChange={handelOnChange}
                                                            className="form-control"
                                                            placeholder='Enter Secrete key' />
                                                        <label className="form-label" htmlFor="form3Example4cd" style={{ fontSize: "0.7rem", color: "red" }}>* Now no need of key</label>
                                                    </div>
                                                </div>
                                                <div className="form-check d-flex justify-content-center mb-5">
                                                    <input
                                                        className="form-check-input me-2"
                                                        type="checkbox"
                                                        id="form2Example3c"
                                                    />
                                                    <label className="form-check-label" htmlFor="form2Example3">
                                                        I agree all statements in <Link>Terms of service</Link>
                                                    </label>
                                                </div>
                                                <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                                                    <button type="button" className="btn btn-primary btn-lg" onClick={handelOnSubmit}>Register</button>
                                                </div>
                                                <button type="button" className="btn btn-secondary btn-sm" onClick={handelOnBack} style={{ marginLeft: "8px" }}>Back</button>
                                            </form>
                                        </div>
                                        <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">
                                            <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp" alt='Sign up img' className="img-fluid" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </>
    )
}
