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
    return fetch(`${API}/generatelocalcacert`, {
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