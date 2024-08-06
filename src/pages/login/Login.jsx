import React, { useEffect } from "react";
import "./login.css";
import "../register/Register";
import { Link } from "react-router-dom";
const CLIENT_ID = '867508402734-jjij68fdlh9a80506va7q6edtj7thcas.apps.googleusercontent.com';
const loadGapiScript = () => {
    return new Promise((resolve, reject) => {
        if (window.gapi) {
            console.log("gapi already loaded");
            resolve(window.gapi);
        } else {
            const script = document.createElement('script');
            script.src = 'https://apis.google.com/js/platform.js';
            script.async = true;
            script.defer = true;
            script.onload = () => {
                console.log("gapi script loaded");
                resolve(window.gapi);
            };
            script.onerror = () => {
                console.error("Failed to load gapi script");
                reject(new Error('Failed to load gapi script'));
            };
            document.body.appendChild(script);
        }
    });
};
export default function Login() {
    useEffect(() => {
        loadGapiScript().then(gapi => {
            console.log("gapi loaded, initializing auth2");
            gapi.load('auth2', () => {
                gapi.auth2.init({
                    client_id: CLIENT_ID,
                }).then(() => {
                    console.log("auth2 initialized, rendering button");
                    gapi.signin2.render('google-signin-button', {
                        scope: 'profile email',
                        width: 240,
                        height: 50,
                        longtitle: true,
                        theme: 'dark',
                        onsuccess: onSuccess,
                        onfailure: onFailure,
                    });
                }).catch(err => {
                    console.error('Error initializing gapi auth2: ', err);
                });
            });
        }).catch(error => {
            console.error('Failed to load gapi: ', error);
        });
    }, []);
    const onSuccess = (googleUser) => {
        const profile = googleUser.getBasicProfile();
        console.log('ID: ' + profile.getId());
        console.log('Name: ' + profile.getName());
        console.log('Image URL: ' + profile.getImageUrl());
        console.log('Email: ' + profile.getEmail());
        window.location.href = "/home";
    };
    const onFailure = (error) => {
        console.log('Login Failed: ', error);
    };
    return (
        <div className="login">
            <span className="loginTitle">Login</span>
            <form className="loginForm">
                <label>Email</label>
                <input type="email" className="loginInput" placeholder="Enter your email" />
                <label>Password</label>
                <input type="password" className="loginInput" placeholder="Enter your password" />
                <button className="loginButton">
                    <Link to="/home" className="l1">Login</Link>
                </button>
            </form>
            <button className="loginRegisterButton">
                <Link to="/register" className="l1">Register</Link>
            </button>
            <div className="googleLogin">
                <div id="google-signin-button"></div>
            </div>
        </div>
    );
}
