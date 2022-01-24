import React, { useState } from 'react'
import { useHistory } from 'react-router-dom';

const Signup = (props) => {

    const [credentials, setcredentials] = useState({ name: "", email: "", password: "", cpassword: "" });
    let history = useHistory();

    const handlesubmit = async (e) => {
        e.preventDefault();
        const { name, email, password, cpassword } = credentials;
        const response = await fetch("http://localhost:5000/api/auth/createuser", {

            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ name, email, password }),
        });
        const json = await response.json();
        console.log(json);
        if (json.success && cpassword == password) {
            localStorage.setItem('token', json.authtoken);
            history.push('/login')
            props.showalert("SuccesFully Created Account", "success");
        }
        else {
            props.showalert(`${cpassword !== password ? 'Password doesnot matches' : 'Invalid Credentials'}`, "danger");
        }
    }

    const onchange = (e) => {
        setcredentials({ ...credentials, [e.target.name]: e.target.value });
    };
    return (
        <div className="container" style={{ "marginTop": "4rem" }}>
            <h2>Sign Up to Use the iNotebook.</h2>
            <form onSubmit={handlesubmit}>
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input type="text" className="form-control" id="name" name="name" aria-describedby="emailHelp" onChange={onchange} placeholder="Enter name" />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email address</label>
                    <input type="text" className="form-control" id="email" name="email" aria-describedby="emailHelp" onChange={onchange} placeholder="Enter email" />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" className="form-control" id="password" name="password" required minLength={5} onChange={onchange} placeholder="Password" />
                </div>
                <div className="form-group">
                    <label htmlFor="cpassword">Confirm Password</label>
                    <input type="password" className="form-control" id="cpassword" name="cpassword" required minLength={5} onChange={onchange} placeholder="Confirm Password" />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default Signup
