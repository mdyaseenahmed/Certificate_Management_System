import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { isAuthenticated, signout } from '../auth/helper';
import Base from '../Core/Base';

const Dashboard = () => {
    const navigate = useNavigate();
    
    const { user } = isAuthenticated();

    const sideNavigation = () => {
        return (
            <div className="card text-center">
                <h3 className="card-header text-center borderBottom">
                    <b><span className="fa fa-tachometer"></span> Dashboard</b>
                </h3>
                <ul className="list-group text-center">
                    <li className="list-group-item">
                        <NavLink
                            to="/csr"
                            className="nav-link"
                        >
                            <span className="fa fa-file"></span> Create CSR
                        </NavLink>
                    </li>
                    <li className="list-group-item">
                        <NavLink
                            to="/listCertificate"
                            className="nav-link"
                        >
                            <span className="fa fa-align-center"></span> List Certificates
                        </NavLink>
                    </li>
                    <li className="list-group-item btn" onClick={()=>{
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
        <Base title={"Hello, "+user.firstName} description="Welcome to Certificate Management System.!">
            {/* <h2>Hello, {user.firstName}</h2> */}
            <div className="row">
                <div className="col-lg-3 col-sm-12">{sideNavigation()}</div>

            </div>
        </Base>
    )
}

export default Dashboard;