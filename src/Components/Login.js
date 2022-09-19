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
        redirect: false,
        loading: false
    })

    const { user } = isAuthenticated();

    const { email, password, redirect, error, loading } = values;

    const handleChange = (fieldName) => (e) => {
        setValues({...values, error: false, [fieldName]: e.target.value})
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setValues({...values, error: false, loading: true });
        signin({ email, password })
        .then((data)=>{
            console.log(data)
            if(data.error) {
                setValues({
                    ...values, 
                    error: data.error,
                    loading: false
                });
            } else {
                authenticate(data, ()=>{
                    setValues({
                        ...values,
                        redirect: true,
                        email: "",
                        password: "",
                        loading: false
                    })
                })
            }
        })
        .catch(console.log("Welcome.!"))
    };

    const redirectUser = () => {
        if(redirect) {
            if(user && user.userType === 'regular') {
                navigate('/dashboard/csr');
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


    const loadingMessage = () => {
        return (
            <div id="loader" className="text-center m-4">
                <h2>Loading...<i className="fa fa-cog fa-spin fa-fw"></i></h2>
            </div>
        );
    }

   const loginForm = () => {
    return (
        <div className="card mb-4 text-center">
            <h4 className="card-header">
                <b><span className="fa fa-user-circle-o"></span> Login </b>
            </h4>
            <br />
            {errorMessage()}
            {redirectUser()}
            { loading ? (loadingMessage()) : (<form >
                <table style={{ width: "-webkit-fill-available", marginLeft: "4rem", marginRight: "4rem" }}>
                    <tbody>
                        <tr>
                            <td className="signupLabel">
                                <label>Email Id: </label>
                            </td>
                            <td>
                                <div className="form-group">
                                    <input 
                                    className="form-control"
                                    type="email" 
                                    id="lemail"
                                    placeholder="user@team.telstra.com"
                                    value={email}
                                    onChange={handleChange("email")}
                                    required
                                    autoComplete='off'
                                    />
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td className="signupLabel">
                                <label>Password: </label>
                            </td>
                            <td>
                                <div className="form-group">
                                    <input 
                                    className="form-control"
                                    type="password" 
                                    id="lpassword"
                                    placeholder="Enter Your password"
                                    value={password}
                                    onChange={handleChange("password")}
                                    required
                                    />
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>

                {/* <p>New User.? <NavLink to="/signup">Register Here</NavLink></p> */}
                <div className="form-group">
                    <button type="submit" onClick={(e)=>{handleSubmit(e)}} className="btn btn-outline-success mb-2">Login</button>
                </div>
            </form>)}
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