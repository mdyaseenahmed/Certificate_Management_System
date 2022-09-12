import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { isAuthenticated, signup } from '../auth/helper';

const SignUp = () => {

    const [values, setValues] = useState({
        firstName: "",
        lastName: "",
        email: "",
        department: "",
        password: "",
        cnfPassword: "",
        error: "",
        success: false,
        userType: "regular"
    })

    const { firstName, lastName, email, department, password, cnfPassword, userType, success, error } = values;

    const handleChange = (fieldName) => (e) => { 
        setValues({...values, error: false, [fieldName]: e.target.value});
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setValues({...values, error: false});
        signup({ firstName, lastName, department, email, password, userType })
        .then((data)=>{
            console.log(data)
            if(data.error) {
                setValues({
                    ...values,
                    error: data.error,
                    success: false
                });
            } else {
                setValues({
                    ...values,
                    firstName: "",
                    lastName: "",
                    email: "",
                    password: "",
                    cnfPassword: "",
                    error: "",
                    success: true
                })
            }
        })
        .catch(console.log("Error at Signup.!"))
    }

    const signUpForm = () => {
        return (
            <form>
                <div className="form-group">
                    <label>First Name: </label>
                    <input 
                    className="form-control1"
                    id="firstName"
                    type="text"
                    placeholder="John" 
                    value={firstName}
                    onChange={handleChange("firstName")}
                    required
                    />
                    <br />  
                    {/* <small>Hlelo this is a error</small> */}
                </div>

                <div className="form-group">
                    <label>Last Name: </label>
                    <input 
                    className="form-control1"
                    id="lastName"
                    type="text"
                    placeholder="Doe"
                    value={lastName} 
                    onChange={handleChange("lastName")}
                    required
                    />
                    <br /> 
                </div>
        
                <div className="form-group">
                    <label>Email Id: </label>
                    <input
                    className="form-control1"
                    id="email"
                    type="email" 
                    placeholder="user@team.telstra.com"
                    value={email}
                    onChange={handleChange("email")}
                    required
                    />
                    <br/>   
                </div>

                <div className="form-group">
                    <label>Department: </label>
                    <input 
                    className="form-control1"
                    id="dept"
                    type="text"
                    placeholder="Enter Your Department" 
                    value={department}
                    onChange={handleChange("department")}
                    required
                    />
                    <br /> 
                </div>

                <div className="form-group">
                    <label>Password: </label>
                    <input 
                    className="form-control1"
                    id="password"
                    type="password"
                    placeholder="Enter Your Password" 
                    value={password}
                    onChange={handleChange("password")}
                    required
                    />
                    <br />
                </div>

                <div className="form-group">
                    <label>Confirm Password: </label>
                    <input 
                    className="form-control1"
                    id="cnfPassword"
                    type="password"
                    placeholder="Confirm Password" 
                    value={cnfPassword}
                    onChange={handleChange("cnfPassword")}
                    required
                    />
                    <br />
                </div>
                {/* <p>Already have an account.? <NavLink to="/login">Login Here</NavLink></p> */}
                <div className="form-group">
                    <button type="submit" onClick = {handleSubmit} className="btn btn-outline-success m-2">SignUp</button>
                    <button type="reset" className="btn btn-outline-secondary m-2">Reset</button>
                </div>
                
                {/* <h5 className="text-center">{JSON.stringify(values)}</h5> */}
            </form>
        )
    }

    const successMessage = () => {
        return (
             <div className="row">
                  <div className="col-md-6 offset-sm-3 text-left">
                       <div
                            className="alert alert-success text-center"
                            style={{ display: success ? "" : "none" }}
                       >
                        New Account was created successfully.!
                            {/* New Account was Created Successfully. Please
                            <button className="btn btn-primary"onClick={()=>{

                            }}>Click Here</button> to login */}
                       </div>
                  </div>
             </div>
        );
   };

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

    return (
        <>
            {
                isAuthenticated() ? <Navigate to="/dashboard"></Navigate> :
                (<div className="card mb-4">
                    <h4 className="card-header">
                        <b><span className="fa fa-user-plus"></span> Sign Up </b>
                    </h4>
                    <br />
                        {successMessage()}
                        {errorMessage()}
                        {signUpForm()}
                </div>)
            }   
        </>
    );
};

export default SignUp;