import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../login.css'; /* Import the updated CSS */

const Register = () => {
    const [user, setUser] = useState({
        firstname: '',
        lastname: '',
        email: '',
        password: ''
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser((prevUser) => ({
            ...prevUser,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // API call to register the user
        try {
            const url = "http://localhost:8000/register";
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(user)
            });

            const json = await response.json();
            console.log(json);

            if(json.success === "true"){
                window.alert("User registered successfully. Click OK to login.");
                navigate("/login"); // Navigate to login after registration
            } else {
                window.alert(json.error);
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="login-container">
            <div className="login-form" style={{ padding: "20px 50px" }}>
                <h2>Sign Up</h2>
                <form onSubmit={handleSubmit}>
                    <div style={{ textAlign: 'left' }}>
                        <label htmlFor="firstname">First Name</label>
                        <input
                            type="text"
                            id="firstname"
                            name="firstname"
                            value={user.firstname}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div style={{ textAlign: 'left' }}>
                        <label htmlFor="lastname">Last Name</label>
                        <input
                            type="text"
                            id="lastname"
                            name="lastname"
                            value={user.lastname}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div style={{ textAlign: 'left' }}>
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={user.email}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div style={{ textAlign: 'left' }}>
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={user.password}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <button type="submit" className="btnsignup">Sign Up</button>
                </form>
            </div>
        </div>
    );
}

export default Register;
