import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const { login } = useAuth();
  const [deviceWidth, setDeviceWidth] = useState(window.innerWidth); // To detect screen size

  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    fetch("/credentials.json")
      .then(response => {
        if (!response.ok) {
          throw new Error('Could not load user data');
        }
        return response.json();
      })
      .then(users => {
        const user = users.find(user => user.username === username && user.password === password);
        if (user) {
          setMessage('Login successful!');
          login(); // Set authentication to true
          navigate('/home', { state: { username: username } });
        } else {
          setMessage('Invalid username or password!');
        }
      })
      .catch(error => {
        setMessage('Error loading user data!');
        console.error('Fetch error:', error);
      });
  };

  // Update device width on resize
  useEffect(() => {
    const handleResize = () => setDeviceWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Define styles for the desktop and mobile layout
  const containerStyle = {
    display: 'flex',
    flexDirection: deviceWidth < 768 ? 'column' : 'row', // Change layout based on screen size
    minHeight: '100vh',
    width: '100%',
    backgroundColor: "white",
  };

  const descriptionStyle = {
    flex: deviceWidth >= 768 ? '0 0 30%' : 'none', // 30% width for desktop, full width for mobile
    padding: '20px',
    backgroundColor: '#48d7f0',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  };

  const formContainerStyle = {
    flex: deviceWidth >= 768 ? '0 0 70%' : 'none', // 70% width for desktop, full width for mobile
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '8px',
    maxWidth: '400px',
    margin: 'auto',
  };

  const buttonStyle = {
    padding: '10px',
    width: '100%',
    backgroundColor: '#61dafb',
    border: 'none',
    borderRadius: '4px',
    color: '#282c34',
    cursor: 'pointer',
  };

  const messageStyle = {
    color: '#282c34',
    marginTop: '10px',
  };

  return (
    <div style={containerStyle}>
      <div style={descriptionStyle}>
        <h2 style={{ color: 'white' }}>Welcome to Our Platform</h2>
        <p style={{ color: 'white' }}>
          Experience the best of our services by logging in and exploring our platform.
          If you don’t have an account, please sign up to get started.
        </p>
      </div>
      <div style={formContainerStyle}>
        <h4 style={{ color: '#282c34' }}>Login</h4>
        <form onSubmit={handleLogin} style={{ width: '100%' }}>
          <div className="input-group mb-3" style={{ marginBottom: '10px' }}>
            <label htmlFor="username" style={{ display: 'none' }}>Username</label>
            <input
              type="text"
              className="form-control"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
              aria-label="Username"
            />
          </div>

          <div className="input-group mb-3" style={{ marginBottom: '10px' }}>
            <label htmlFor="password" style={{ display: 'none' }}>Password</label>
            <input
              type="password"
              className="form-control"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              aria-label="Password"
            />
          </div>

          <button type="submit" style={buttonStyle}>
            Login
          </button>
        </form>
        <p id="message" style={messageStyle}>{message}</p>
      </div>
    </div>
  );
}

export default Login;
