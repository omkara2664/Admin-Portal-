import React from 'react'
// import './Home.css'
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faPhone } from '@fortawesome/free-solid-svg-icons';
import '../../assets/css/style.css';
import '../../assets/vendor/animate.css/animate.css';
import '../../assets/vendor/animate.css/animate.compat.css';
import '../../assets/vendor/animate.css/animate.min.css';
import '../../assets/vendor/animate.css/transformations.css';
import '../../assets/vendor/boxicons/css/boxicons.css';
import '../../assets/vendor/bootstrap-icons/bootstrap-icons.css';
import '../../assets/vendor/remixicon/remixicon.css';
export const Home = () => {
    const navigation = useNavigate();
    const handleLogin = (e) => {
        e.preventDefault();
        navigation('/login');
    }
    return (
        <>
            {/* ======= Header ======= */}
            <header id="header" className="fixed-top d-flex align-items-center  header-transparent">
                <div className="container d-flex align-items-center justify-content-between">
                    <div className="logo">
                        <h1 style={{ color: 'white' }}>Omkara Soft</h1>

                    </div>
                    <nav id="navbar" className="navbar">
                        <ul>
                            <li><Link className="nav-link scrollto active" >Home</Link></li>
                            <li><Link className="nav-link scrollto" >About</Link></li>
                            <li><Link className="nav-link scrollto" >Contact</Link></li>
                            <li><Link className="nav-link scrollto" >Services</Link></li>
                            <li><Link onClick={(e) => handleLogin(e)} className="nav-link scrollto">Login</Link></li>
                            <li></li>
                        </ul>
                        <i className="bi bi-list mobile-nav-toggle" />
                    </nav>{/* .navbar */}
                </div>
            </header>{/* End Header */}
            {/* ======= Hero Section ======= */}
            <section id="hero" className="d-flex flex-column justify-content-end align-items-center">
                <div id="heroCarousel" data-bs-interval={5000} className="container carousel carousel-fade" data-bs-ride="carousel">
                    {/* Slide 1 */}
                    <div className="carousel-item active">
                        <div className="carousel-container">
                            <h2 className="animate__animated animate__fadeInDown">Welcome to <span>Omkara Soft</span></h2>
                            <p className="animate__animated fanimate__adeInUp">Ut velit est quam dolor ad a aliquid qui aliquid. Sequi ea ut et est quaerat sequi nihil ut aliquam. Occaecati alias dolorem mollitia ut. Similique ea voluptatem. Esse doloremque accusamus repellendus deleniti vel. Minus et tempore modi architecto.</p>
                            <Link className="btn-get-started animate__animated animate__fadeInUp scrollto">Read More</Link>
                        </div>
                    </div>

                </div>
                <svg className="hero-waves" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 24 150 28 " preserveAspectRatio="none">
                    <defs>
                        <path id="wave-path" d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z">
                        </path></defs>
                    <g className="wave1">
                        <use xlinkHref="#wave-path" x={50} y={3} fill="rgba(255,255,255, .1)">
                        </use></g>
                    <g className="wave2">
                        <use xlinkHref="#wave-path" x={50} y={0} fill="rgba(255,255,255, .2)">
                        </use></g>
                    <g className="wave3">
                        <use xlinkHref="#wave-path" x={50} y={9} fill="#fff">
                        </use></g>
                </svg>
            </section>{/* End Hero */}
            <main id="main">
                {/* ======= About Section ======= */}
                <section id="about" className="about">
                    <div className="container">
                        <div className="section-title" data-aos="zoom-out">
                            <h2>About</h2>
                            <p>Who we are</p>
                        </div>
                        <div className="row content" data-aos="fade-up">
                            <div className="col-lg-6">
                                <p>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
                                    magna aliqua.
                                </p>
                                <ul>
                                    <li><i className="ri-check-double-line" /> Ullamco laboris nisi ut aliquip ex ea commodo consequat</li>
                                    <li><i className="ri-check-double-line" /> Duis aute irure dolor in reprehenderit in voluptate velit</li>
                                    <li><i className="ri-check-double-line" /> Ullamco laboris nisi ut aliquip ex ea commodo consequat</li>
                                </ul>
                            </div>
                            <div className="col-lg-6 pt-4 pt-lg-0">
                                <p>
                                    Ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
                                    velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                                    culpa qui officia deserunt mollit anim id est laborum.
                                </p>
                                <button className="btn-learn-more">Learn More</button>
                            </div>
                        </div>
                    </div>
                </section>{/* End About Section */}
                {/* ======= Features Section ======= */}
                {/* End Features Section */}
                {/* ======= Cta Section ======= */}
                {/* End Cta Section */}
                {/* ======= Services Section ======= */}
                <section id="services" className="services">
                    <div className="container">
                        <div className="section-title" data-aos="zoom-out">
                            <h2>Services</h2>
                            <p>What we do offer</p>
                        </div>
                        <div className="row">
                            <div className="col-lg-4 col-md-6" onClick={(e) => handleLogin(e)} style={{ cursor: 'pointer' }}>
                                <div className="icon-box" data-aos="zoom-in-left">
                                    <div className="icon"><i className="bi bi-briefcase" style={{ color: '#ff689b' }} /></div>
                                    <h4 className="title"><Link   >Admin</Link></h4>
                                    <p className="description">Manage your profile</p>
                                </div>
                            </div>
                            <div className="col-lg-4 col-md-6 mt-5 mt-md-0">
                                <div className="icon-box" data-aos="zoom-in-left" data-aos-delay={100} onClick={(e) => handleLogin(e)} style={{ cursor: 'pointer' }}>
                                    <div className="icon"><i className="bi bi-book" style={{ color: '#e9bf06' }} /></div>
                                    <h4 className="title"><Link >User</Link></h4>
                                    <p className="description">Manage Your profile</p>
                                </div>
                            </div>
                            <div className="col-lg-4 col-md-6 mt-5 mt-lg-0 ">
                                <div className="icon-box" data-aos="zoom-in-left" data-aos-delay={200}>
                                    <div className="icon"><i className="bi bi-card-checklist" style={{ color: '#3fcdc7' }} /></div>
                                    <h4 className="title"><Link>Dummy</Link></h4>
                                    <p className="description">This Is dummy</p>
                                </div>
                            </div>
                            <div className="col-lg-4 col-md-6 mt-5">
                                <div className="icon-box" data-aos="zoom-in-left" data-aos-delay={300}>
                                    <div className="icon"><i className="bi bi-binoculars" style={{ color: '#41cf2e' }} /></div>
                                    <h4 className="title"><Link>Dummy</Link></h4>
                                    <p className="description">This is Dummy</p>
                                </div>
                            </div>
                            <div className="col-lg-4 col-md-6 mt-5">
                                <div className="icon-box" data-aos="zoom-in-left" data-aos-delay={400}>
                                    <div className="icon"><i className="bi bi-globe" style={{ color: '#d6ff22' }} /></div>
                                    <h4 className="title"><Link>Dummy</Link></h4>
                                    <p className="description">This is Dummy</p>
                                </div>
                            </div>
                            <div className="col-lg-4 col-md-6 mt-5">
                                <div className="icon-box" data-aos="zoom-in-left" data-aos-delay={500}>
                                    <div className="icon"><i className="bi bi-clock" style={{ color: '#4680ff' }} /></div>
                                    <h4 className="title"><Link>Dummy</Link></h4>
                                    <p className="description">This is Dummy</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>{/* End Services Section */}
                {/* ======= Portfolio Section ======= */}
                {/* End Portfolio Section */}
                {/* ======= Testimonials Section ======= */}
                {/* End Testimonials Section */}
                {/* ======= Pricing Section ======= */}
                {/* End Pricing Section */}
                {/* ======= F.A.Q Section ======= */}
                {/* End F.A.Q Section */}
                {/* ======= Team Section ======= */}
                {/* End Team Section */}
                {/* ======= Contact Section ======= */}
                <section id="contact" className="contact">
                    <div className="container">
                        <div className="section-title" data-aos="zoom-out">
                            <h2>Contact</h2>
                            <p>Contact Us</p>
                        </div>
                        <div className="row mt-5">
                            <div className="col-lg-4" data-aos="fade-right">
                                <div className="info">
                                    <div className="address">
                                        <i className="bi bi-geo-alt" />
                                        <h4>Location:</h4>
                                        <p>A18888 Main Road, Kolhapur, Maharashtra</p>
                                    </div>
                                    <div className="email">
                                        <i className="bi bi-envelope" />
                                        <h4>Email:</h4>
                                        <p>omkara.soft@gmail.com</p>
                                    </div>
                                    <div className="phone">
                                        <i className="bi bi-phone" />
                                        <h4>Call:</h4>
                                        <p>+1 5589 55488 55s</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-8 mt-5 mt-lg-0" data-aos="fade-left">
                                <form action="forms/contact.php" className="php-email-form">
                                    <div className="row">
                                        <div className="col-md-6 form-group">
                                            <input type="text" name="name" className="form-control" id="name" placeholder="Your Name" required />
                                        </div>
                                        <div className="col-md-6 form-group mt-3 mt-md-0">
                                            <input type="email" className="form-control" name="email" id="email" placeholder="Your Email" required />
                                        </div>
                                    </div>
                                    <div className="form-group mt-3">
                                        <input type="text" className="form-control" name="subject" id="subject" placeholder="Subject" required />
                                    </div>
                                    <div className="form-group mt-3">
                                        <textarea className="form-control" name="message" rows={5} placeholder="Message" required defaultValue={""} />
                                    </div>
                                    <div className="my-3">
                                        <div className="loading">Loading</div>
                                        <div className="error-message" />
                                        <div className="sent-message">Your message has been sent. Thank you!</div>
                                    </div>
                                    <div className="text-center"><button type="submit">Send Message</button></div>
                                </form>
                            </div>
                        </div>
                    </div>
                </section>{/* End Contact Section */}
            </main>{/* End #main */}
            {/* ======= Footer ======= */}
            <footer id="footer">
                <div className="container">
                    <h3>Omkara Soft</h3>
                    <p>Nighter on commencement nor destiny focus only on journey.</p>
                    <div className="social-links">
                        <button className="twitter"><i className="bx bxl-twitter" /></button>
                        <button className="facebook"><i className="bx bxl-facebook" /></button>
                        <button className="instagram"><i className="bx bxl-instagram" /></button>
                        <button className="google-plus"><i className="bx bxl-skype" /></button>
                        <button href="https://www.linkedin.com/in/omkar-patil-732ba7222/" className="linkedin"><i className="bx bxl-linkedin" /></button>
                    </div>
                    <div className="copyright">
                        © Copyright <strong><span>Omkara Soft</span></strong>. All Rights Reserved
                    </div>
                    <div className="credits">
                        {/* All the links in the footer should remain intact. */}
                        {/* You can delete the links only if you purchased the pro version. */}
                        {/* Licensing information: https://bootstrapmade.com/license/ */}
                        {/* Purchase the pro version with working PHP/AJAX contact form: https://bootstrapmade.com/Omkara Soft-bootstrap-template/ */}
                        Designed by <Link >OmkaraSoft Team</Link>
                    </div>
                </div>
            </footer>{/* End Footer */}
            {/* <button  className="back-to-top d-flex align-items-center justify-content-center"><i className="bi bi-arrow-up-short" /></button> */}
            {/* Vendor JS Files */}
            {/* Template Main JS File */}
        </>


    )
}
