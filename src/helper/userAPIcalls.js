import { API } from '../backendAPI';

export const createSelfSignedCertificate = (token, certData) => {
    return fetch(`${API}/createselfsigned`, { 
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": 'application/json',
            Auth: `Owner ${token}`,
        },
        body: JSON.stringify(certData)
    })
    .then((response) => {
        return response.json();
    })
    .catch((err) => {
        console.log("Error in generating self signed certificate: "+err);
    })
}

export const createSignedCertificate = (token, certData) => {
    console.log(certData);
    return fetch(`${API}/createrootsigned`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": 'application/json',
            Auth: `Owner ${token}`,
        },
        body: JSON.stringify(certData)
    })
    .then((response) => {
        return response.json();
    })
    .catch((err) => {
        console.log("Error in generating signed certificate: "+err);
    })
}

export const generatelocalcacert = (token, certData) => {
    return fetch(`${API}/createlca`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": 'application/json',
            Auth: `Owner ${token}`,
        },
        body: JSON.stringify(certData)
    })
    .then((response) => {
        return response.json();
    })
    .catch((err) => {
        console.log("Error in generating Local Root CA certificate: "+err);
    })
}

export const getCertificates = (token) => {
    return fetch(`${API}/user_certs`, {
        method: 'GET',
        headers: {
            Accept: "application/json",
            "Content-Type": 'application/json',
            Auth: `Owner ${token}`,
        }
    }).then((response) => {
        return response.json();
    }).catch((err) => {
        console.log("Error in getting certificates: "+err);
    })
}

export const getCertificateById = (token, id) => {
    // console.log(id)
    return fetch(`${API}/getcertinfo`, {
        method: 'POST',
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Auth: `Owner ${token}`,
        },
        body: JSON.stringify(id)
    }).then((response) => {
        return response.json();
    }).catch((err) => {
        console.log("Unable to get the certificate details, Please try again later. "+err);
    })
}

export const renewCertificate = (token, certData) => {
    return fetch(`${API}/renewcert`, {
        method: "PATCH",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Auth: `Owner ${token}`,
        },
        body: JSON.stringify(certData)
    }).then((response) => {
        return response.json();
    }).catch((err) => {
        console.log("Can't Renew Certificate at the moment, Please try again later. "+err)
    })
}