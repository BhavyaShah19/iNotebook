import React, { useState } from 'react'
import { useHistory } from 'react-router-dom';

const Login = (props) => {
    const [credentials, setcredentials] = useState({ email: "", password: "" });
    let history = useHistory();

    const handlesubmit = async (e) => {
        e.preventDefault();
        const response = await fetch("http://localhost:5000/api/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email: credentials.email, password: credentials.password }),
        });
        const json = await response.json();
        console.log(json);
        if (json.success) {
            localStorage.setItem('token', json.authtoken);
            props.showalert("Logged in SuccesFully", "success");
            history.push('/');
        }
        else {
            props.showalert("Invalid Credentials", "danger");
        }
    }

    const onchange = (e) => {
        setcredentials({ ...credentials, [e.target.name]: e.target.value });
    };
    return (
        <div className="container" style={{ "marginTop": "4rem" }}>
            <h2>Login to continue with the iNotebook.</h2>
            <form onSubmit={handlesubmit}>
                <div className="form-group">
                    <label htmlFor="email">Email address</label>
                    <input type="email" className="form-control" id="email" value={credentials.email} onChange={onchange} name="email" aria-describedby="emailHelp" placeholder="Enter email" />
                    <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" className="form-control" value={credentials.password} onChange={onchange} id="password" name="password" placeholder="Password" />
                </div>
                <button type="submit" className="btn btn-primary"  >Submit</button>
            </form>
        </div>
    )
}

export default Login
