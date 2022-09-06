import React, { useState } from 'react';
import Base from '../Core/Base';

const CSRForm = () => {

    const [values, setValues] = useState({
        countryName: "",
        stateOrProvinceName: "",
        localityName: "",
        organizationName: "",
        organizationalUnitName: "",
        commonName: "",
        emailAddress: ""
    })

    const { countryName, stateOrProvinceName, localityName, organizationName, organizationUnitName, commonName, emailAddress } = values;

    return (
        <Base title="Certificate Management System" description="Welcome to Certificate Management System.!">
            <div className="row">
                <div className="col-md-6 offset-sm-3 text-center">
                    <div className="card mb-4">
                        <h4 className="card-header">
                            <b><span className="fa fa-file"></span> Create CSR </b>
                        </h4>
                        <form>
                            <br />
                            <div className="form-group">
                                <label>Country: </label>
                                <input 
                                className="form-control1"
                                type="text" 
                                id="country"
                                placeholder="Country code (IN, AU, US)"
                                value={countryName}
                                />
                            </div>
                            <div className="form-group">
                                <label>State / Province: </label>
                                <input 
                                className="form-control1"
                                type="text" 
                                id="state"
                                placeholder="Enter the State / Province Name"
                                value={stateOrProvinceName}
                                />
                            </div>
                            <div className="form-group">
                                <label>Locality / City: </label>
                                <input 
                                className="form-control1"
                                type="text" 
                                id="city"
                                placeholder="Enter the Locality / City Name"
                                value={localityName}
                                />
                            </div>
                            <div className="form-group">
                                <label>Organization Name: </label>
                                <input 
                                className="form-control1"
                                type="text" 
                                id="organizationName"
                                placeholder="Enter the Organization Name"
                                value={organizationName}
                                />
                            </div>
                            <div className="form-group">
                                <label>Organization Unit Name: </label>
                                <input 
                                className="form-control1"
                                type="text" 
                                id="organizationUnit"
                                placeholder="Enter the Organization Unit (IT)"
                                value={organizationUnitName}
                                />
                            </div>
                            <div className="form-group">
                                <label>Email Id: </label>
                                <input 
                                className="form-control1"
                                type="email" 
                                id="email"
                                placeholder="Enter your Email Id"
                                value={emailAddress}
                                />
                            </div>
                            <div className="form-group">
                                <label>Common Name: </label>
                                <input 
                                className="form-control1"
                                type="text" 
                                id="commonName"
                                placeholder="www.telstra.com"
                                value={commonName}
                                required
                                />
                            </div>  

                            <hr />
                            
                            <div className="form-group">
                                <input 
                                type="radio"
                                name="keyAlgo"
                                id="rsa"
                                /> <label> Generate RSA key Pair</label>
                                &nbsp;&nbsp;&nbsp;
                                <select>
                                    <option> 512 bit</option>
                                    <option> 1024 bit</option>
                                    <option> 2048 bit</option>
                                    <option> 4096 bit</option>
                                </select>
                            </div>

                            <div className="form-group">
                                <input 
                                type="radio"
                                name="keyAlgo"
                                id="dsa"
                                /> <label> Generate DSA key Pair</label>
                                &nbsp;&nbsp;&nbsp;
                                <select>
                                    <option> 512 bit</option>
                                    <option> 1024 bit</option>
                                    <option> 2048 bit</option>
                                    <option> 4096 bit</option>
                                </select>
                            </div>

                            <div className="form-group">
                                <input 
                                type="radio"
                                name="keyAlgo"
                                id="ecc"
                                /> <label> Generate ECC key Pair</label>
                                &nbsp;&nbsp;&nbsp;
                                <select>
                                    <option> 512 bit</option>
                                    <option> 1024 bit</option>
                                    <option> 2048 bit</option>
                                    <option> 4096 bit</option>
                                </select>
                            </div>
                            
                            <hr />
                            
                            <div className="form-group">
                                <label> Select CSR Signature Algorithm: </label>
                                &nbsp;&nbsp;&nbsp;
                                <select>
                                    <option> SHA-224 bit </option>
                                    <option> SHA-256 bit </option>
                                    <option selected> SHA-384 bit </option>
                                    <option> SHA-512 bit </option>
                                </select>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </Base>
    )
};

export default CSRForm;