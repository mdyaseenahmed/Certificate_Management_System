import React, { useState } from 'react';
import DropdownMultiselect from "react-multiselect-dropdown-bootstrap";
import { isAuthenticated } from '../auth/helper';
import { createSelfSignedCertificate } from '../helper/userAPIcalls';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SelfSignedCertificate = () => {
    
    const notify = (name) => toast.info(`${name} Copied`,{ theme: "colored", pauseOnHover: false, newestOnTop: true });

    const { user, token } = isAuthenticated();

    const [values, setValues] = useState({
        countryName: "",
        stateOrProvinceName: "",
        localityName: "",
        organizationName: "",
        organizationalUnitName: "",
        commonName: "",
        emailAddress: "",
        keyBitSize: 512,
        csrSignAlgo: "sha256", 
        days: 365,
        san1: "",
        san2: "",
        san3: "",
        san4: "",
        san5: "",
        san6: "",
        keyUsage: "",
        altNames: [],
        error: "",
        email: "",
        success: "",
        loading: false,
    })

    const [keyUsage1, setKeyUsage1] = useState([])

    const [response, setResponse] = useState({
        cert: "",
        pk: "",
        csr: "",
        msg: "",
        publicKey: ""
    })

    const { 
        cert,
        pk,
        csr,
        msg,
        publicKey,
    } = response;

    const { 
        altNames, 
        error, 
        success, 
        countryName, 
        stateOrProvinceName, 
        localityName, 
        organizationName, 
        organizationalUnitName, 
        commonName, 
        emailAddress, 
        keyBitSize, 
        csrSignAlgo, 
        days,
        loading ,
        keyUsage,
        san1,
        san2,
        san3,
        san4,
        san5,
        san6
    } = values;

    const handleChange = (name) => (event) => {
        setValues({...values, [name]: event.target.value });
    }

    const handleMultiSelectChange = (newItem) => {
        setKeyUsage1(newItem)
        setValues({...values, keyUsage: newItem.join(',')})
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        if(!commonName.trim()) {
            setValues({ ...values, error: "Common Name is Required." })
        }
        else if(days < 0) {
            setValues({ ...values, error: "Enter Valid Number of Days.!"})
        }
        else 
        {
            if(san1.length > 1) {
                altNames.push(san1)
            }
            if(san2.length > 1) {
                altNames.push(san2)
            }
            if(san3.length > 1) {
                altNames.push(san3)
            }
            if(san4.length > 1) {
                altNames.push(san4)
            }
            if(san5.length > 1) {
                altNames.push(san5)
            }
            if(san6.length > 1) {
                altNames.push(san6)
            }
            
            setValues({...values, keyUsage: keyUsage1.join(','), email: user.email ,error: "", loading: true});
    
            createSelfSignedCertificate(token, { 
                countryName,
                stateOrProvinceName, 
                localityName, 
                organizationName,
                organizationalUnitName,
                commonName,
                emailAddress,
                keyBitSize,
                csrSignAlgo,
                days,
                basicConstraints: "CA:false",
                basicConstraintsCA: "CA:false",
                email: user.email,
                altNames,
                keyUsage,
            })
            .then((data)=> {
                if(data.error) {
                    setValues({
                        ...values, 
                        error: data.error,
                        success:"",
                        loading: false
                    })
                }
                else {
                    console.log(data);
                    setResponse({
                        cert: data.cert,
                        csr: data.csr,
                        pk: data.pk,
                        msg: data.success,
                        publicKey: data.pub
                    });
                    setValues({
                        ...values,
                        loading: false,
                        success: "true",
                        countryName: "",
                        stateOrProvinceName: "",
                        localityName: "",
                        organizationName: "",
                        organizationalUnitName: "",
                        commonName: "",
                        emailAddress: "",
                        keyBitSize: "512",
                        csrSignAlgo: "SHA224", 
                        days: 365,
                        san1: "",
                        san2: "",
                        san3: "",
                        san4: "",
                        san5: "",
                        san6: "",
                        keyUsage: "",
                        error: false,
                        email: "",
                    })
                }
            })
        }
    }

    const copyToClipboard = (name) => (event) => {
        const sample = document.getElementById(name)
        sample.select()
        document.execCommand("copy");
        event.target.focus();
        notify(name)
    }

    const subjectAltNameBox = (name, placeholder) => {
        return (
            <tr>
                <td className="csrLabel">
                    <label>{placeholder}: </label>
                </td>
                <td>
                    <div className="form-group">
                        <input 
                        type="text"
                        className="form-control"
                        value={values.name}
                        placeholder={placeholder}
                        onChange={handleChange(name)}
                        />
                    </div>
                </td>
            </tr>
        )
    }

    const optionsArray = [
        { key: "digitalSignature", label: "digitalSignature" },
        { key: "nonRepudiation", label: "nonRepudiation" },
        { key: "keyEncipherment", label: "keyEncipherment" },
        { key: "dataEncipherment", label: "dataEncipherment" },
        { key: "keyAgreement", label: "keyAgreement" },
        { key: "keyCertSign", label: "keyCertSign" },
        { key: "cRLSign", label: "cRLSign" },
        { key: "encipherOnly", label: "encipherOnly" },
        { key: "decipherOnly", label: "decipherOnly" },
    ];

    const formUI = () => {
        return (
        <form style={{display: loading || msg ? "none": "block", marginBottom: "2rem"}}>
            <br />
            <table className="csrTable">
                <tbody>
                    <tr>
                        <td className="csrLabel">
                            <label>Country: </label>
                        </td>
                        <td>
                            <div className="form-group">
                                <input 
                                className="form-control"
                                type="text" 
                                id="country"
                                placeholder="Country code (IN, AU, US)"
                                value={countryName}
                                onChange={handleChange("countryName")}
                                />
                            </div>
                        </td>
                    </tr>
                    
                    <tr>
                        <td className="csrLabel"> 
                            <label>State / Province: </label>
                        </td>
                        <td>
                            <div className="form-group">
                                <input 
                                className="form-control"
                                type="text" 
                                id="state"
                                placeholder="Enter the State / Province Name"
                                value={stateOrProvinceName}
                                onChange={handleChange("stateOrProvinceName")}
                                />
                            </div>
                        </td>
                    </tr>
                    
                    <tr>
                        <td className="csrLabel">
                            <label>Locality / City: </label>
                        </td>
                        <td>
                            <div className="form-group">
                                <input 
                                className="form-control"
                                type="text" 
                                id="city"
                                placeholder="Enter the Locality / City Name"
                                value={localityName}
                                onChange={handleChange("localityName")}
                                />
                            </div>
                        </td>
                    </tr>

                    <tr>
                        <td className="csrLabel">
                            <label>Organization Name: </label>
                        </td>
                        <td>
                            <div className="form-group">
                                <input 
                                className="form-control"
                                type="text" 
                                id="organizationName"
                                placeholder="Enter the Organization Name"
                                value={organizationName}
                                onChange={handleChange("organizationName")}
                                />
                            </div>
                        </td>
                    </tr>

                    <tr>
                        <td className="csrLabel">
                            <label>Organization Unit Name: </label>
                        </td>
                        <td>
                            <div className="form-group">
                                <input 
                                className="form-control"
                                type="text" 
                                id="organizationUnit"
                                placeholder="Enter the Organization Unit (IT)"
                                value={organizationalUnitName}
                                onChange={handleChange("organizationalUnitName")}
                                />
                            </div>
                        </td>
                    </tr>

                    <tr>
                        <td className="csrLabel">
                            <label>Email Id: </label>
                        </td>
                        <td>
                            <div className="form-group">
                                <input 
                                className="form-control"
                                type="email" 
                                id="email"
                                placeholder="Enter your Email Id"
                                value={emailAddress}
                                onChange={handleChange("emailAddress")}
                                />
                            </div>
                        </td>
                    </tr>

                    <tr>
                        <td className="csrLabel">
                            <label>Common Name: </label>
                        </td>
                        <td>
                            <div className="form-group">
                                <input 
                                className="form-control"
                                type="text" 
                                id="commonName"
                                placeholder="www.telstra.com"
                                value={commonName}
                                required
                                onChange={handleChange("commonName")}
                                />
                            </div>
                        </td>
                    </tr>

                    <tr>
                        <td className="csrLabel">
                            <label>Private Key Bit Size: </label>
                        </td>
                        <td>
                            <select className="form-control" value={ keyBitSize } onChange={ handleChange("keyBitSize") }>
                                <option value="512"> 512 </option>
                                <option value="1024"> 1024 </option>
                                <option value="2048"> 2048 </option>
                                <option value="4096"> 4096 </option>
                            </select>
                        </td>
                    </tr>

                    <tr>
                        <td className="csrLabel">
                            <label> Select CSR Signature Algorithm: </label>
                        </td>
                        <td>
                            <select className="form-control" value={csrSignAlgo} onChange={ handleChange("csrSignAlgo") }> 
                                <option value="sha224"> SHA224 </option>
                                <option value="sha256"> SHA256 </option>
                                <option value="sha384"> SHA384 </option>
                                <option value="sha512"> SHA512 </option>
                            </select>
                        </td>
                    </tr>

                    <tr>
                        <td className="csrLabel">
                            <label>
                                Set Validity in Days: 
                            </label>
                            </td>
                        <td>
                            <div className="form-group">
                                <input 
                                type="number"
                                className="form-control"
                                id="days"
                                name="days"
                                value={days}
                                onChange={handleChange("days")}
                                />
                            </div>
                        </td>
                    </tr>

                    { subjectAltNameBox("san1", "Subject Alt Name 1") }
                    { subjectAltNameBox("san2", "Subject Alt Name 2") }
                    { subjectAltNameBox("san3", "Subject Alt Name 3") }
                    { subjectAltNameBox("san4", "Subject Alt Name 4") }
                    { subjectAltNameBox("san5", "Subject Alt Name 5") }
                    { subjectAltNameBox("san6", "Subject Alt Name 6") }

                    <tr>
                        <td className="csrLabel">
                            <label> Key Usage: </label>
                        </td>
                        <td className="multiSelectDropDown">
                            <DropdownMultiselect options={optionsArray} selected={keyUsage1} handleOnChange={handleMultiSelectChange} placeholder = "--Nothing Selected--" placeholderMultipleChecked = { keyUsage1.length > 1 ? keyUsage1[0]+" +"+(keyUsage1.length-1) : keyUsage1[0]+keyUsage1[1] } name="keyUsage" />   
                        </td>
                    </tr>

                </tbody>
            </table> 
            <button type="submit" onClick={handleSubmit} className="btn btn-outline-success m-4">Generate Self Signed Certificate</button> 
            <button type="reset" onClick = { ()=>{
                setValues({
                    countryName: "",
                    stateOrProvinceName: "",
                    localityName: "",
                    organizationName: "",
                    organizationalUnitName: "",
                    commonName: "",
                    emailAddress: "",
                    keyBitSize: 512,
                    csrSignAlgo: "sha256", 
                    days: 365,
                    san1: "",
                    san2: "",
                    san3: "",
                    san4: "",
                    san5: "",
                    san6: "",
                    keyUsage: "",
                    altNames: [],
                    error: "",
                    email: "",
                    success: "",
                    loading: false,
                });
                setResponse({
                    cert: "",
                    pk: "",
                    csr: "",
                    msg: ""
                })
            }
            } className="col-md-4 btn btn-outline-secondary m-4">Reset</button>      
        </form>)
    }    

    const certificateContents = () => {
        return (
            <div className="certData" style={{ display: msg ? "" : "none" }}>
                <div className="form-group">
                    <br />
                    <label className="text-left" style={{ marginRight: "12rem" }}> X.509 V3 certificate (certificate.crt) </label> {" "}
                    <span className="btn btn-outline-success mb-0 text-right" onClick={copyToClipboard("Certificate")}>
                        Copy <i className="fa fa-clipboard"></i>
                    </span>
                    <textarea type="text" className="form-control" rows="10" id="Certificate" value={cert} readOnly></textarea>
                </div>
                <br />
                <div className="form-group">
                    <label style={{ marginRight: "21.4rem" }}> Private Key (pk.key) </label> 
                    <span className="btn btn-outline-success" onClick={copyToClipboard("PrivateKey")}>
                        Copy <i className="fa fa-clipboard"></i>
                    </span>
                    <textarea className="form-control" rows="10" id="PrivateKey" value={pk} readOnly></textarea>
                </div>
                <br />
                <div className="form-group">
                    <label style={{ marginRight: "21.4rem" }}> Public Key (pub.key) </label> 
                    <span className="btn btn-outline-success" onClick={copyToClipboard("PublicKey")}>
                        Copy <i className="fa fa-clipboard"></i>
                    </span>
                    <textarea className="form-control" rows="10" id="PublicKey" value={publicKey} readOnly></textarea>
                </div>
                <br />
                <div className="form-group">
                    <label style={{ marginRight: "25rem" }}> CSR (CSR.csr)</label>
                    <span className="btn btn-outline-success" onClick={copyToClipboard("CSR")}>
                        Copy <i className="fa fa-clipboard"></i>
                    </span>
                    <textarea className="form-control" rows="10" id="CSR" value={csr} readOnly></textarea>
                </div>
                <br />
                <span onClick = { ()=>{
                    setValues({
                        countryName: "",
                        stateOrProvinceName: "",
                        localityName: "",
                        organizationName: "",
                        organizationalUnitName: "",
                        commonName: "",
                        emailAddress: "",
                        keyBitSize: 512,
                        csrSignAlgo: "sha256", 
                        days: 365,
                        san1: "",
                        san2: "",
                        san3: "",
                        san4: "",
                        san5: "",
                        san6: "",
                        keyUsage: "",
                        altNames: [],
                        error: "",
                        email: "",
                        success: "",
                        loading: false,
                    });
                    setResponse({
                        cert: "",
                        pk: "",
                        csr: "",
                        msg: ""
                    })
                }
                } className="btn btn-outline-primary mb-4">Create another certificate</span> 
            </div>
        );
    }

    const successMessage = () => {
        return (
            <div style={{ display: success ? "" : "none", marginLeft: "4rem", marginRight: "4rem" }}>
                <div className="alert alert-success mt-4 mb-0">
                    <h5>Certificate created Successfully.!</h5>
                </div>
            </div>
       );
    }

    const errorMessage = () => {
        return (
            <div
                 className="alert alert-danger mt-4 ml-4 mr-4 mb-0"
                 style={{ display: error ? "" : "none" }}
            >
                 <h5>{error}</h5>
            </div>
       );
    }

    const loadingMessage = () => {
        return (
            <div id="loader" className="text-center m-4">
                <h2>Loading...<i className="fa fa-cog fa-spin fa-fw"></i></h2>
            </div>
        );
    }

    return (
        <>
            <div className="card mb-4">
                <h4 className="card-header">
                    <b><span className="fa fa-certificate"></span> Self Signed Certificate </b>
                </h4>
                {
                    loading ? loadingMessage() : ""
                }
                {successMessage()}
                {msg ? certificateContents() : ""}
                {errorMessage()}
                {formUI()}
                <ToastContainer theme="colored" />
            </div>
        </>
    )
};

export default SelfSignedCertificate;