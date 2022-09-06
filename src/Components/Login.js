import React, { useState } from 'react';
import { authenticate, isAuthenticated, signin } from '../auth/helper';

const Login = () => {

    const [values, setValues] = useState({
        email: "",
        password: "",
        success: "",
        error: false,
        redirect: false
    })

    const { user } = isAuthenticated();

    const { email, password, redirect, error, success } = values;

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
                    setValues({...values, redirect: true })
                })
            }
        })
        .catch(console.log("Error at Login.!"))
    };

    const redirectUser = () => {
        if(redirect) {
            if(user && user.userType === 'regular') {
                console.log("At Regular Redirect")
                return <h1>Hello User;</h1>;
            }
        }
        if (isAuthenticated()) {
            console.log("At Redirect")
            return <h1>Bye User;</h1>;
            // return "Bye User.!"
            // return <ReactRedirect to="https://nodejs.org/" />;
       }
    }

    return (
        <div className="card mb-4">
            <h4 className="card-header">
                <b><span className="fa fa-user-circle"></span> Login </b>
            </h4>
            <form>
                <div className="form-group">
                    <br />
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
                <div className="form-group">
                    <button type="submit" onClick={(e)=>{handleSubmit(e)}} className="btn btn-outline-success m-2">Login</button>
                </div>
                <h5 className="text-center">{JSON.stringify(values)}</h5>
            </form>
            {redirectUser()}
        </div>
    )
}

export default Login;