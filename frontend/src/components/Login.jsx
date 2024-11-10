import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../login.css';

const Login = () => {
  const [user, setUser] = useState({
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
    // Perform login logic here

    try {
      const url = `http://localhost:8000/signin`;

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email: user.email, password: user.password })
      });

      const json = await response.json();
      console.log(json);
      if (json.success === "true") {
        localStorage.setItem('token', json.token);
        navigate('/upload');
      } else if (json.success === "false") {
        alert('Invalid credentials');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {/* Login Form */}
      <div className="login-container">
        <div className="login-form">
          <h2>Login</h2>
          <form style={{ padding: '0 20px', width: '100%' }} onSubmit={handleSubmit}>
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
            <button type="submit" className='btnsignup'>Login</button>
          </form>
          <p>
            <Link to='/register'>New User? Sign up here</Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default Login;
