import React, { useCallback, useState } from 'react'
import { useEffect } from 'react';
import { isAuthenticated } from '../auth/helper';
import { getCertificates } from '../helper/userAPIcalls';
import Table from 'react-bootstrap/Table';
import { Link } from 'react-router-dom';

const MyCertificates = () => {

  const [certificates, setCertificates] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const { token } = isAuthenticated();

  const loadcertificates = useCallback(() => {
    setLoading(true);
    getCertificates(token).then((data) => {
      if(data.error) {
        setLoading(false)
        setError(data.error)
      } else {
        setLoading(false)
        setCertificates(data)
      }
    })
  }, [token])

  useEffect(() => {
    loadcertificates();
  }, [loadcertificates])

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
            <b><span className="fa fa-align-center"></span> My Certificates <span className='btn btn-info' style={{ float: 'right'}}> Count {certificates.length ? (certificates.length) : "0"}</span></b>
        </h4>
        {errorMessage()}
        {loading ? (loadingMessage()) : 
        <Table striped bordered hover size="md" responsive>
          { 
            certificates.length > 0 ? (
              <thead style={{ fontSize: '17px'}}>
                <th className="listCertTable">#</th>
                <th className="listCertTable">Certificate Subject Info</th>
                <th className="listCertTable">Expiry</th>
                <th className="listCertTable">Action</th>
                <th className="listCertTable">Type</th>
              </thead>
            ) : ""
          }
          <tbody>
          {
            certificates.length > 0 ? certificates.map((cert, index) => {
                                  return (
                                    <tr key={index}>
                                      <td className="listCertTable">{index+1}</td>
                                      <td className="listCertTable">
                                        {cert.country ? ("C="+cert.country) : ""} <br />
                                        {cert.state ? ("ST="+cert.state) : ""} <br />
                                        {cert.locality ? ("L="+cert.locality) : ""} <br />
                                        {cert.organization ? ("O="+cert.organization) : ""} <br />
                                        {cert.commonName ? ("CN="+cert.commonName) : ""} <br />
                                      </td>
                                      <td className="listCertTable">
                                        {cert.end ? (cert.end) : ""}
                                      </td>
                                      <td className="listCertTable">
                                        <Link className="btn btn-outline-primary" to={`/dashboard/getcertinfo/${cert.id}`}> Details</Link>
                                        <Link className="btn btn-outline-primary" to={`/dashboard/renewCert/${cert.id}`} style={{ width: "82px", marginTop: "10px" }}> Renew </Link>
                                      </td>
                                      <td className="listCertTable">
                                        { cert.type === "CA" ? "Local CA Certificate" : "" }
                                        { cert.type === "SS" ? "Self Signed Certificate" : "" }
                                        { cert.type === "CAS" ? "Signed Certificate" : "" }
                                      </td>
                                    </tr>
                                  )
          }) : <span className="mt-4">No Certificates Found.!</span> }
            
          </tbody>
        </Table>
      }
      </div>
    </>
  )
}

export default MyCertificates