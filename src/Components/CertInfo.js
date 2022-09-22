import React, { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
import { isAuthenticated } from '../auth/helper';
import { getCertificateById } from '../helper/userAPIcalls';

const CertInfo = () => {
    // console.log(useParams());

    const { id } = useParams()
    const certificateId = {
        id: id
    }
    const { token } = isAuthenticated();

    const [response, setResponse] = useState({})

    const [error, setError] = useState(false)

    const [loading, setLoading] = useState(false)

    const preload = (certId) => {
        setLoading(true);
        getCertificateById(token, certId).then((data) => {
            if(data.error) {
                // console.log(data)
                setError(data.error)
                console.log(data.error)
                setLoading(false);
            } else {
                // console.log(data)
                setResponse(data);
                setLoading(false);
            }
        })
    }

    useEffect(()=>{
        preload(certificateId)
    },[])

    const loadingMessage = () => {
        return (
            <div id="loader" className="text-center m-4">
                <h2>Loading...<i className="fa fa-cog fa-spin fa-fw"></i></h2>
            </div>
        );
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

    return (
        <>
            <div className="card mb-4">
                <h4 className="card-header" style={{ lineHeight: 'inherit' }}>
                    <b><span className="fa fa-globe"></span> { response.cert_info ? response.cert_info.commonName : "Certificate Information" } </b>
                </h4>
                {errorMessage()}
                {loading ? loadingMessage() : ""}
                <Table bordered hover size="sm" responsive style={{ display: loading ? "none" : "block" }}> 
                    {
                        response ? (
                        <tbody>
                            <tr>
                                <td>
                                    <b>Version</b>
                                </td>
                                <td>
                                    V3
                                </td>
                            </tr>    
                            <tr>
                                <td className="listCertTable">
                                    <b>Issuer</b>
                                </td>
                                <td className="listCertTable">
                                    { response.cert_info ? (`Country: ${response.cert_info.issuer.country}`) : ""} <br />
                                    { response.cert_info ? (`State: ${response.cert_info.issuer.state}`) : ""} <br />
                                    { response.cert_info ? (`Locality: ${response.cert_info.issuer.locality}`) : ""} <br />
                                    { response.cert_info ? (`Organization: ${response.cert_info.issuer.organization}`) : ""} <br />
                                    { response.cert_info ? (`Organization Unit: ${response.cert_info.issuer.organizationUnit}`) : ""} <br />
                                    { response.cert_info ? (`Common Name: ${response.cert_info.issuer.commonName}`) : ""} <br />
                                </td>
                            </tr>
                            <tr>
                                <td className="listCertTable">
                                    <b>Subject</b>
                                </td>
                                <td className="listCertTable"> 
                                    { response.cert_info ? (`Country: ${response.cert_info.country}`) : "" } <br />
                                    { response.cert_info ? (`State: ${response.cert_info.state}`) : "" } <br />
                                    { response.cert_info ? (`Locality: ${response.cert_info.locality}`) : "" } <br />
                                    { response.cert_info ? (`Organization: ${response.cert_info.organization}`) : "" } <br />
                                    { response.cert_info ? (`Organization Unit: ${response.cert_info.organizationUnit}`) : "" }  <br />
                                    { response.cert_info ? (`Common Name: ${response.cert_info.commonName}`) : "" } <br />
                                    { response.cert_info ? (`Email Address: ${response.cert_info.emailAddress}`) : "" } <br />
                                </td>
                            </tr>
                            <tr>
                                <td className="listCertTable">
                                    <b>Validity</b>
                                </td>
                                <td className="listCertTable">
                                    { response.cert_info && response.cert_info.validity.start && response.cert_info.validity.end ? ("Start: "+response.cert_info.validity.start) : "" } <br />
                                    { response.cert_info && response.cert_info.validity.start && response.cert_info.validity.end ? ("End: "+response.cert_info.validity.end) : "" } <br />
                                </td>
                            </tr>
                            <tr>
                                <td className="listCertTable">
                                    <b>Signature Algorithm</b>
                                </td>
                                <td className="listCertTable">
                                    { response.cert_info ? (`${response.cert_info.signatureAlgorithm}`) : "" } <br />
                                </td>
                            </tr>
                            <tr>
                                <td className="listCertTable">
                                    <b>Public Key Size</b> 
                                </td>
                                <td className="listCertTable">
                                    { response.cert_info ? (`${response.cert_info.publicKeySize}`) : "" } <br />
                                </td>
                            </tr>
                            <tr>
                                <td className="listCertTable">
                                    <b>Public Key Algorithm</b>
                                </td>
                                <td className="listCertTable">
                                    { response.cert_info ? (`${response.cert_info.publicKeyAlgorithm}`) : "" } <br />
                                </td>
                            </tr>
                            <tr>
                                <td className="listCertTable">
                                    <b>Type</b>
                                </td>
                                <td className="listCertTable">                                    
                                    { response.cert_info && response.type === "SS" ? ("Self Signed Certificate") : "" }
                                    { response.cert_info && response.type === "CA" ? ("Local CA Certificate") : "" } 
                                    { response.cert_info && response.type === "CAS" ? ("Signed Certificate") : "" }
                                </td>
                            </tr>
                            <tr>
                                <td className="listCertTable">
                                    <b>Public Key</b>
                                </td>
                                <td className="listCertTable">
                                    { response.pub ? (`${response.pub}`) : "" }
                                </td>
                            </tr>
                            <tr>
                                <td className="listCertTable">
                                    <b>Certificate</b> 
                                </td>
                                <td className="listCertTable">
                                    {response.cert ? (`${response.cert}`) : ""}
                                </td>
                            </tr>
                        </tbody>                    
                        ) : ""
                    }
                    <div>
                        <Link to="/dashboard/myCertificates">
                            <span className="btn btn-outline-info mt-4 mb-2">
                                Go to My Certificates Page
                            </span>
                        </Link>
                    </div>
                </Table>

            </div>
            {/* {JSON.stringify(response)} */}
        </>
    )
}

export default CertInfo;