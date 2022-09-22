import React from 'react'
import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { isAuthenticated } from '../auth/helper'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { renewCertificate } from '../helper/userAPIcalls';

const RenewCertificate = () => {

    const notify = (name) => toast.info(`${name} Copied`,{ theme: "colored", pauseOnHover: false, newestOnTop: true });

    const { id } = useParams()

    const { token } = isAuthenticated();

    const [values, setValues] = useState({
        days: 365,
        id: id,
        loading: false,
        error: "", 
        success: "",
        cert: "",
        pk: "",
        csr: "",
        publicKey: "",
        msg: ""
    })

    const { 
        days,
        loading, 
        error, 
        success,
        cert,
        pk,
        csr,
        publicKey,
        msg,
    } = values;

    const handleChange = (name) => (event) => {
        setValues({ ...values, [name]: event.target.value })
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        setValues({ ...values, loading: true, error: ""})
        if(days < 0) {
            setValues({ ...values, error: "Enter Valid Number of Days.!", loading: false })
        }
        else {
            renewCertificate(token, { id, days })
            .then((data)=>{
                if(data.error) {
                    setValues({
                        ...values, 
                        error: data.error,
                        loading: false,
                        cert: "",
                        pk: "",
                        csr: "",
                        publicKey: "",
                        msg: ""
                    })
                } 
                else {
                    setValues({ 
                        ...values,
                        loading: false,
                        error: "",
                        cert: data.cert,
                        pk: data.pk,
                        csr: data.csr,
                        msg: data.success,
                        publicKey: data.pub,
                        success: true
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
                <div>
                    <Link to="/dashboard/myCertificates">
                        <span className="btn btn-outline-info mt-4 mb-2">
                            Go to My Certificates Page
                        </span>
                    </Link>
                </div>
            </div>
        );
    }

    const formUI = () => {
        return (
            <form style={{display: loading || msg ? "none": "block", marginBottom: "2rem"}}>
                <br />
                <table className="csrTable">
                    <tbody>
                        <tr>
                            <td className="csrLabel">
                                <label>Set Validity in Days:</label>
                            </td>
                            <td>
                                <div className="form-group">
                                    <input 
                                    className="form-control"
                                    type="number" 
                                    id="days"
                                    value={days}
                                    onChange={handleChange("days")}
                                    />
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <button type="submit" onClick={handleSubmit} className="btn btn-outline-success"> Renew Certificate</button> 
                <Link to="/dashboard/myCertificates">
                    <span className="btn btn-outline-info ml-4">
                        Go to My Certificates Page
                    </span>
                </Link>
            </form>
        )
    }
    
    const successMessage = () => {
        return (
            <div style={{ display: success ? "" : "none", marginLeft: "4rem", marginRight: "4rem" }}>
                <div className="alert alert-success mt-4 mb-0">
                    <h5>Certificate Renewed Successfully.!</h5>
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
            <div style={{ display: loading ? "" : "none" }} id="loader" className="text-center m-4">
                <h2>Loading...<i className="fa fa-cog fa-spin fa-fw"></i></h2>
            </div>
        );
    }

    return (
        <>
            <div className="card mb-4">
                <h4 className="card-header">
                    <b><span className="fa fa-certificate"></span> Renew Certificate </b>
                </h4>
                {loadingMessage()}
                {successMessage()}
                {errorMessage()}
                {msg ? certificateContents() : ""}
                {formUI()}                
                <ToastContainer theme="colored" />

                {/* <p>{JSON.stringify(values)}</p> */}
            </div>
        </>
    )
}

export default RenewCertificate