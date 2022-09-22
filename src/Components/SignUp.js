import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { isAuthenticated, signup } from '../auth/helper';
import { Helmet } from "react-helmet";

const SignUp = () => {

    // document.title('CMS | SignUp')

    const [values, setValues] = useState({
        firstName: "",
        lastName: "",
        email: "",
        department: "",
        password: "",
        error: "",
        success: false,
        userType: "regular",
        loading: false
    })

    const [inpType, setInpType] = useState('password')

    const { firstName, lastName, email, department, password, userType, success, error, loading } = values;

    const handleChange = (fieldName) => (e) => { 
        setValues({...values, error: false, [fieldName]: e.target.value});
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setValues({...values, error: false, loading: true});
        if(!firstName.trim() || !lastName.trim() || !email.trim() || !password.trim() || !department.trim()) { 
            setValues({...values, error: "Please fill all the details"})
        } 
        else if(password.length < 7) {
            setValues({...values, error: "Password must be at least 7 Characters, must include 1 digit and 1 character"})
        }
        else if(password.search(/[a-z]/i) < 0) {
            setValues({...values, error: "Password must be at least 7 Characters, must include 1 digit and 1 character"})
        }
        else if(password.search(/[0-9]/i) < 0) {
            setValues({...values, error: "Password must be at least 7 Characters, must include 1 digit and 1 character"})
        }
        else {
            signup({ firstName, lastName, department, email, password, userType })
            .then((data)=>{
                console.log(data)
                if(data.error) {
                    setValues({
                        ...values,
                        error: data.error,
                        success: false,
                        loading: false,
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
                        success: true,
                        loading: false
                    })
                }
            })
            .catch(console.log("Error at Signup.!"))
        }
    }

    const loadingMessage = () => {
        return (
            <div id="loader" className="text-center m-4">
                <h2>Loading...<i className="fa fa-cog fa-spin fa-fw"></i></h2>
            </div>
        );
    }

    const handleShowHide = () => {
        if(inpType === 'password') {
            setInpType('text')
        } else {
            setInpType('password')
        }
    }

    const signUpForm = () => {
        return (
            loading ? loadingMessage () : 
            <form>
                <table style={{ width: "-webkit-fill-available", marginLeft: "4rem", marginRight: "4rem" }}>
                    <tbody>
                        <tr>
                            <td className="signupLabel">
                                <label>First Name: </label>
                            </td>
                            <td>
                                <div className="form-group">
                                    <input 
                                    className="form-control"
                                    id="firstName"
                                    type="text"
                                    placeholder="John" 
                                    value={firstName}
                                    onChange={handleChange("firstName")}
                                    required
                                    autoComplete='off'
                                    />
                                </div>
                            </td>
                        </tr>

                        <tr>
                            <td className="signupLabel">
                                <label>Last Name: </label>
                            </td>
                            <td>
                                <div className="form-group">
                                    <input 
                                    className="form-control"
                                    id="lastName"
                                    type="text"
                                    placeholder="Doe"
                                    value={lastName} 
                                    onChange={handleChange("lastName")}
                                    required
                                    autoComplete="off"
                                    />
                                </div>
                            </td>
                        </tr>

                        <tr>
                            <td className="signupLabel">
                                <label>Email Id: </label>
                            </td>
                            <td>
                                <div className="form-group">
                                    <input
                                    className="form-control"
                                    id="email"
                                    type="email" 
                                    placeholder="user@team.telstra.com"
                                    value={email}
                                    onChange={handleChange("email")}
                                    required
                                    autoComplete="off"
                                    />
                                </div>
                            </td>
                        </tr>

                        <tr>
                            <td className="signupLabel">
                                <label>Department: </label>
                            </td>
                            <td>
                                <div className="form-group">
                                    <input 
                                    className="form-control"
                                    id="dept"
                                    type="text"
                                    placeholder="Enter Your Department" 
                                    value={department}
                                    onChange={handleChange("department")}
                                    required
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
                                    className="form-control1"
                                    id="password"
                                    type={inpType}
                                    placeholder="Enter Your Password" 
                                    value={password}
                                    onChange={handleChange("password")}
                                    required
                                    autoComplete="off"
                                    />
                                    <span className={ inpType === "password" ? "fa fa-eye btn showHideBtn" : "fa fa-eye-slash btn showHideBtn"} onClick = {handleShowHide}></span>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <div className="form-group">
                    <button type="submit" onClick = {handleSubmit} className="btn btn-outline-success m-2">Sign Up</button>
                    <button type="reset" onClick={(e)=>{
                        setValues({
                            firstName: "",
                            lastName: "",
                            email: "",
                            department: "",
                            password: "",
                            error: "",
                            success: false,
                            userType: "regular"
                        })
                    }} className="btn btn-outline-secondary m-2">Reset</button>
                </div>       
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
                (
                <>
                    <Helmet>
                        <title>CMS | SignUp</title>    
                    </Helmet> 
                
                    <div className="card mb-4">
                        <h4 className="card-header">
                            <b><span className="fa fa-user-plus"></span> Sign Up </b>
                        </h4>
                        {/* <span className="text-left">{firstName}</span> */}
                        <br />
                            {successMessage()}
                            {errorMessage()}
                            {signUpForm()}
                    </div>
                </>
                )
            }   
        </>
    );
};

export default SignUp;