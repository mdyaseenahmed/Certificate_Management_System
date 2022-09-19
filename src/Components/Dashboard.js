import React from 'react';
import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom';
import { isAuthenticated, signout } from '../auth/helper';
import Base from '../Core/Base';

const Dashboard = () => {
    const navigate = useNavigate();
    
    const { user } = isAuthenticated();

    const sideNavigation = () => {
        return (
            <div className="card text-center">
                <h3 className="card-header text-center borderBottom">
                    <b><Link to="/dashboard"><span className="fa fa-tachometer"></span> Dashboard</Link></b>
                </h3>
                <ul className="list-group text-center">
                    <li className="list-group-item">
                        <NavLink
                            to="/dashboard/myCertificates"
                            className="nav-link"
                        >
                            <span className="fa fa-align-center"></span> My Certificates
                        </NavLink>
                    </li>
                    <h5 className="card-header text-center borderBottom">
                        <b>Create Certificate</b>
                    </h5>
                    <li className="list-group-item">
                        <NavLink
                            to="/dashboard/selfSigned"
                            className="nav-link"
                        >
                            <span className="fa fa-certificate"></span> Self Signed Certificate
                        </NavLink>
                    </li>
                    <li className="list-group-item">
                        <NavLink
                            to="/dashboard/rootCA"
                            className="nav-link"
                        >
                            <span className="fa fa-user-secret"></span> Local CA Certificate
                        </NavLink>
                    </li>
                    <li className="list-group-item">
                        <NavLink
                            to="/dashboard/signedCert"
                            className="nav-link"
                        >
                            <span className="fa fa-university"></span> Signed Certificate
                        </NavLink>
                    </li>
                    <li className="list-group-item btn logout" onClick={()=>{
                        signout(()=>{
                            console.log("Signed Out Successfully");
                            navigate("/login")
                        })
                    }}>
                        <span className="fa fa-sign-out"></span> Log Out 
                    </li>  
                </ul>
            </div>
        );
    };

    return (
        <Base title={`Hello, ${user.firstName}`} description="Welcome to Certificate Management System.!">
            <div className="row">
                <div className="col-lg-4 col-sm-12">{sideNavigation()}</div>
                <div className="col-lg-8 col-sm-12">
                    <Outlet />
                </div>
            </div>
        </Base>
    )
}

export default Dashboard;