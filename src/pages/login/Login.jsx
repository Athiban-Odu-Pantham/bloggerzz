import "./login.css";
import "../register/Register"
import { Link } from "react-router-dom";
export default function Login() {
    return (
        <div className="login">
            <span className="loginTitle">Login</span>
            <form className="loginForm">
                <label>Email</label>
                <input type="text" className="loginInput" placeholder="Enter your email" />
                <label>Password</label>
                <input type="password" className="loginInput" placeholder="Enter your password" />
                <button className="loginButton"><Link to="/home" className="l1">Login</Link></button>
            </form>
            <button className="loginRegisterButton"><Link to="/register" className="l1">Register</Link></button>
        </div>
    );
}


