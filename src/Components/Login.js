import React, { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { authenticate, isAuthenticated, signin } from '../auth/helper';

const Login = () => {

    const navigate  = useNavigate()

    const [values, setValues] = useState({
        email: "",
        password: "",
        success: "",
        error: false,
        redirect: false
    })

    const { user } = isAuthenticated();

    const { email, password, redirect, error } = values;

    const handleChange = (fieldName) => (e) => {
        setValues({...values, error: false, [fieldName]: e.target.value})
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setValues({...values, error: false });
        signin({ email, password })
        .then((data)=>{
            console.log(data)
            if(data.error) {
                setValues({
                    ...values, 
                    error: data.error,
                });
            } else {
                authenticate(data, ()=>{
                    setValues({
                        ...values,
                        redirect: true,
                        email: "",
                        password: ""
                    })
                })
            }
        })
        .catch(console.log("Error at Login.!"))
    };

    const redirectUser = () => {
        if(redirect) {
            if(user && user.userType === 'regular') {
                navigate('/dashboard');
            }
        }
    }

    const errorMessage = () => {
        return (
             <div className="row">
                  <div className="col-md-6 offset-sm-3 text-left">
                       <div
                            className="alert alert-danger text-center"
                            style={{ display: error ? "" : "none" }}
                       >
                            {error}
                       </div>
                  </div>
             </div>
        );
   };

   const loginForm = () => {
    return (
        <div className="card mb-4">
            <h4 className="card-header">
                <b><span className="fa fa-user-circle"></span> Login </b>
            </h4>
            <form>
                <br />
                {errorMessage()}
                {redirectUser()}
                <div className="form-group">
                    <label>Email Id: </label>
                    <input 
                    className="form-control1"
                    type="email" 
                    id="lemail"
                    placeholder="user@team.telstra.com"
                    value={email}
                    onChange={handleChange("email")}
                    required
                    />
                    <br />
                </div>
                <div className="form-group">
                    <label>Password: </label>
                    <input 
                    className="form-control1"
                    type="password" 
                    id="lpassword"
                    placeholder="Enter Your password"
                    value={password}
                    onChange={handleChange("password")}
                    required
                    />
                    <br/>
                </div>
                {/* <p>New User.? <NavLink to="/signup">Register Here</NavLink></p> */}
                <div className="form-group">
                    <button type="submit" onClick={(e)=>{handleSubmit(e)}} className="btn btn-outline-success mb-2">Login</button>
                </div>
            </form>
        </div>
    );
   }

    return (
        <>
            {
                isAuthenticated() ? <Navigate to="/dashboard" /> : loginForm()
            }
        </>
    )
}

export default Login;