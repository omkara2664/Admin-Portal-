
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios'

export const Login = () => {
  const [data, setData] = useState({ type: "", email: "", password: "" });
  const [formError, setFormError] = useState(false);

  const handleOnChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  }

  const navigate = useNavigate();
  const clickOnOmkara = () => {
    navigate('/');
  }
  const handleSubmit = (e) => {
    e.preventDefault();

    if (data.type.trim().length === 0 || data.email.trim().length === 0 || data.password.trim().length === 0) {
      setFormError(true);
      window.alert("Empty data not allowed")
      return Error;
    }
    setFormError(false);
    const userType = data.type;  // means admin or user
    axios
      .post(`http://localhost:3002/api/auth/login/${data.type}`, data, {
        headers: { "content-type": "application/json" },
      })
      .then((response) => {
        if (response.data.success) {
          const token = response.data.data.token;
          localStorage.setItem(`${userType}AccessToken`, token);
          if (userType === "admin") {
            localStorage.setItem("admin", JSON.stringify(response.data.data.admin))
            navigate(`/admin`);
          } else {
            localStorage.setItem("user", JSON.stringify(response.data.data.user))
            navigate(`/movies`);
          }
          sessionStorage.setItem("accessToken", token);
          setData({ type: '', email: '', password: '' });
          // navigate(`/${userType}`);
        }
      })
      .catch((error) => {
        console.error(error.response.data.message);
        setFormError(true);
        console.log(formError);
      });


  }
  const signUp = () => {
    navigate('/register')
  }
  return (
    <div>
      {/* Section: Design Block */}
      <section className="background-radial-gradient overflow-hidden">
        <style dangerouslySetInnerHTML={{ __html: "\n    .background-radial-gradient {\n      background-color: hsl(218, 41%, 15%);\n      background-image: radial-gradient(650px circle at 0% 0%,\n          hsl(218, 41%, 35%) 15%,\n          hsl(218, 41%, 30%) 35%,\n          hsl(218, 41%, 20%) 75%,\n          hsl(218, 41%, 19%) 80%,\n          transparent 100%),\n        radial-gradient(1250px circle at 100% 100%,\n          hsl(218, 41%, 45%) 15%,\n          hsl(218, 41%, 30%) 35%,\n          hsl(218, 41%, 20%) 75%,\n          hsl(218, 41%, 19%) 80%,\n          transparent 100%);\n    }\n\n    #radius-shape-1 {\n      height: 220px;\n      width: 220px;\n      top: -60px;\n      left: -130px;\n      background: radial-gradient(#44006b, #ad1fff);\n      overflow: hidden;\n    }\n\n    #radius-shape-2 {\n      border-radius: 38% 62% 63% 37% / 70% 33% 67% 30%;\n      bottom: -60px;\n      right: -110px;\n      width: 300px;\n      height: 300px;\n      background: radial-gradient(#44006b, #ad1fff);\n      overflow: hidden;\n    }\n\n    .bg-glass {\n      background-color: hsla(0, 0%, 100%, 0.9) !important;\n      backdrop-filter: saturate(200%) blur(25px);\n    }\n  " }} />
        <div className="container px-4 py-5 px-md-5 text-center text-lg-start my-5">

          <div className="row gx-lg-5 align-items-center mb-5">
            <div className="col-lg-6 mb-5 mb-lg-0" style={{ zIndex: 10 }}>
              <h1 className="my-5 display-5 fw-bold ls-tight" style={{ color: 'hsl(218, 81%, 95%)' }}>
                The best offer <br />
                <span style={{ color: 'hsl(218, 81%, 75%)' }}>for your business</span>
              </h1>
              <p className="mb-4 opacity-70" style={{ color: 'hsl(218, 81%, 85%)' }}>
                Let's Build World.
              </p>
            </div>
            <div className="col-lg-6 mb-5 mb-lg-0 position-relative">
              <div id="radius-shape-1" className="position-absolute rounded-circle shadow-5-strong" />
              <div id="radius-shape-2" className="position-absolute shadow-5-strong" />
              <div className="card bg-glass">
                <div className="card-body px-4 py-5 px-md-5">
                  <form>

                    <div className="row">

                      <div style={{ marginBotton: '2px' }}>
                        <label style={{ marginRight: '10px', fontWeight: 'bold' }}>I'm</label>
                        <div className="form-check form-check-inline">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="type"
                            id="admin"
                            value="admin"
                            onChange={handleOnChange}
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
                            onChange={handleOnChange}
                          />
                          <label className="form-label" htmlFor="inlineRadio2">User</label>
                        </div>
                      </div>

                    </div>
                    {/* Email input */}
                    <div className="form-outline mb-2">
                      <input
                        type="email"
                        name='email'
                        id="email"
                        className="form-control"
                        value={data.email}
                        onChange={handleOnChange}
                      />
                      <label className="form-label" htmlFor="form3Example3">Email address</label>
                    </div>
                    {/* Password input */}
                    <div className="form-outline mb-2">
                      <input
                        type="password"
                        name="password"
                        id="password"
                        className="form-control"
                        value={data.password}
                        onChange={handleOnChange}
                      />
                      <label className="form-label" htmlFor="form3Example4">Password</label>
                    </div>

                    {/* Submit button */}
                    <button type="submit" className="btn btn-primary btn-block mb-4 w-100" onClick={handleSubmit}>
                      Sign in
                    </button>
                    {/* Register buttons */}
                    <div className="text-center">
                      <h3 onClick={clickOnOmkara} style={{ color: 'orange', cursor: 'pointer' }}>
                        OmkaraSoft
                      </h3>
                      <h6 onClick={signUp} style={{ cursor: 'pointer' }}>
                        I don't have account
                      </h6>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Section: Design Block */}
    </div>

  )
}
