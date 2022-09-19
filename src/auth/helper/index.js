import { API } from "../../backendAPI";

export const signup = (user) => {
    return fetch(`${API}/signup`, {
        method: 'POST',
        headers: { 
            Accept: 'application/json',
            "Content-Type": 'application/json'
        },
        body: JSON.stringify(user)
    })
    .then((response)=> {
        return response.json();
    })
    .catch((err) => {
        console.error(err);
    })
};

export const signin = (user) => {
    return fetch(`${API}/signin`, {
        method: 'POST',
        headers: { 
            Accept: 'application/json',
            "Content-Type": 'application/json'
        },
        body: JSON.stringify(user)
    })
    .then((response)=> {
        // console.log(response)
        return response.json();
    })
    .catch((err) => {
        console.error(err);
    })
}

export const authenticate = (data, next) => {
    if(typeof window !== 'undefined') {
        localStorage.setItem("jwt_cms", JSON.stringify(data));
        next();
    }
};

export const signout = (next) => {
    if(typeof window !== 'undefined') {
        localStorage.removeItem("jwt_cms");
        next();

        return fetch(`${API}/signout`, {
            method: 'GET',
        })
        .then((response) => {
            console.log("Signed out Successfully.!");
        })
        .catch((error) => {
            console.log(error);
        })
    }
}

export const isAuthenticated = () => {
    if(typeof window === 'undefined') {
        return false;
    }
    if(localStorage.getItem("jwt_cms")) {
        return JSON.parse(localStorage.getItem("jwt_cms"));
    }
    else {
        return false;
    }
};