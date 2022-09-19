import React from 'react';
import { Link, Navigate, NavLink, Outlet } from 'react-router-dom';
import Base from '../Core/Base';
import { isAuthenticated } from '../auth/helper';

const Home = () => {

    document.title = "CMS | Home Page";

    const sideNavigation = () => {
        return (
            <div className="card text-center">
                <h3 className="card-header text-center borderBottom">
                    <b><span className="fa fa-home"></span><Link to="/"> Home</Link></b>
                </h3>
                <ul className="list-group text-center">
                    <li className="list-group-item">
                        <NavLink
                            to="/signup"
                            className="nav-link"
                        >
                            <span className="fa fa-user-plus"></span> Sign Up
                        </NavLink>
                    </li>
                    <li className="list-group-item">
                        <NavLink
                            to="/login"
                            className="nav-link"
                        >
                            <span className="fa fa-user-circle"></span> Login
                        </NavLink>
                    </li>
                </ul>
            </div>
        );
    };

    return(
        <>
        { isAuthenticated()
            ? <Navigate to="/dashboard" />
            : (<Base title="Certificate Management System" description="Welcome to Certificate Management System.!">
                <div className="row">
                    <div className="col-lg-3 col-sm-12">{sideNavigation()}</div>
                    <br />
                    <div className="col-lg-9 col-sm-12">
                        {/* <h1>Welcome to CMS System.!</h1> */}
                        <Outlet/>
                    </div>
                </div>

            </Base>)
        }
        </>
    )

}

export default Home;