import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './login.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faApple, faGoogle } from '@fortawesome/free-brands-svg-icons';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8080/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
  
      if (response.ok) {
        const data = await response.json();
        // Assuming the response includes a user ID or token
        localStorage.setItem('userId', data.userId); // Adjust according to your response
        navigate('/entry');
      } else if (response.status === 401) {
        alert('Invalid credentials');
      } else {
        alert('An error occurred. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('A network error occurred. Please try again.');
    }
  };
  

  return (
    <div className="login-main">
      <div className="login-container">
        <div className="login-form-container">
          <div className="login-title">Login</div>
          <form className="login-form" onSubmit={handleLogin}>
            <input
              type="text"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="login-input"
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="login-input"
              required
            />
            <button type="submit" className="login-form-btn">Login</button>
            <div className="login-buttons-container">
              <div className="login-apple-button">
                <FontAwesomeIcon icon={faApple} className="login-apple-icon" />
                Continue with Apple
              </div>
              <div className="login-google-button">
                <FontAwesomeIcon icon={faGoogle} className="login-google-icon" />
                Continue with Google
              </div>
            </div>
            <label className="login-signup-label">Don't have an account?</label>
            <span className="login-signup-link" onClick={() => navigate('/signup')}>Sign Up</span>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
