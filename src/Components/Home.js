import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { isAuthenticated, signout } from '../auth/helper';
import Base from '../Core/Base';
import About from './About';
import Login from './Login';
import SignUp from './SignUp';

const Home = () => {

    const [showSignUp, setShowSignUp] = useState(true);
    const [showLogin, setShowLogin] = useState(false);
    const [showAbout, setShowAbout] = useState(false);

    document.title = "CMS | Home Page";

    const sideNavigation = () => {
        return (
            <div className="card text-center">
                <h3 className="card-header text-center borderBottom">
                    <b><span className="fa fa-home"></span> Home</b>
                </h3>
                <ul className="list-group text-center">
                    { !isAuthenticated() && (
                        <>
                            <li className="list-group-item btn" onClick={()=>{
                                    setShowSignUp(true);
                                    setShowLogin(false);
                                    setShowAbout(false);
                                }}>
                                <span className="fa fa-user-plus"></span> Sign Up
                            </li>
                            <li className="list-group-item btn" onClick={()=>{
                                    setShowSignUp(false);
                                    setShowLogin(true);
                                    setShowAbout(false);
                                }}>
                                <span className="fa fa-user-circle"></span> Login
                            </li>
                        </>
                    )
                    }
                    <li className="list-group-item btn" onClick={()=>{
                            setShowSignUp(false);
                            setShowLogin(false);
                            setShowAbout(true);
                        }}>
                        <i class="fa fa-info-circle"></i> About The Project
                    </li>
                    {
                        isAuthenticated() && (
                            <>
                                <li className="list-group-item btn" onClick={()=>{
                                    signout(()=>{
                                        console.log("Signed Out Successfully");
                                    })
                                    setShowSignUp(false);
                                    setShowLogin(true);
                                    setShowAbout(false);
                                }}>
                                <span className="fa fa-sign-out"></span> Log Out
                                </li>  
                            </>
                        )
                    }
                    <li className="list-group-item btn">
                        <Link to="/csr" className="nav-link text-dark">
                        <span className="fa fa-file"></span> Create Self Signed Certificate
                        </Link>
                    </li>
                </ul>
            </div>
        );
    };

    return(
        <Base title="Certificate Management System" description="Welcome to Certificate Management System.!">
            <div className="row">
                <div className="col-lg-3 col-sm-12">{sideNavigation()}</div>
                <div className="col-lg-9 col-sm-12" style={{display: showSignUp ? 'block' : 'none'}}><SignUp /></div>
                <div className="col-lg-9 col-sm-12" style={{display: showLogin ? 'block' : 'none'}}><Login /></div>
                <div className="col-lg-9 col-sm-12" style={{display: showAbout ? 'block' : 'none'}}><About /></div>
            </div>
        </Base>
    )
}

export default Home;