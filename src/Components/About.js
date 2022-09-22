import React from 'react';

const About = () => {
    return (
        <div className="card mb-4">
            <h4 className="card-header">
                <b><span className="fa fa-info-circle"></span> Overview </b>
            </h4>
            <div>
                <h5 className="mt-3 text-left ml-4 px-2"><u> Certificate Management System: </u></h5>
                <p className="text-justify px-4 pt-2 pb-2 m-2">Certificate management is the act of monitoring, facilitating, and
                    executing digital x.509 certificates (SSL certificates). It plays a critical role in keeping communications between a client and server
                    operating, encrypted, and secure.
                </p>
                <p className="text-left ml-4 px-2">
                    Our System Generates the following types of Certificates:
                    <ul>
                        <li>Signed Certificate.</li>
                        <li>Signed Certificate.</li>
                        <li>Certificate Authority (CA) Certificate.</li>
                    </ul>
                </p>
            </div>
        </div>
    )
}

export default About;