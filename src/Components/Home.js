import React, { useState, useEffect } from 'react';
import { useLocation, redirect } from 'react-router-dom';
import { useAuth } from './AuthContext';

function Home() {
  const { isAuthenticated } = useAuth();
  const params = useLocation();
  const [ipAddress, setIpAddress] = useState('');
  const [user, setUser] = useState(params.state.username);

  // Fetch IP address from an API
  const fetchIpAddress = () => {
    fetch('https://api.ipify.org?format=json') // Replace with the desired API
      .then(response => response.json())
      .then(data => {
        setIpAddress(data.ip);
      })
      .catch(error => {
        console.error('Error fetching IP address:', error);
        setIpAddress('Error fetching IP address');
      });
  };

  // Check authentication and fetch IP address on mount
  useEffect(() => {
    if (!isAuthenticated) {
      return redirect('/login');
    }
    fetchIpAddress();
  }, [isAuthenticated]);

  const run_script = () => {
    const data = {
      username: user,
      ip: ipAddress,
    };
    fetch('http://localhost:3001/run-script', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json', // sending JSON data
      },
      body: JSON.stringify(data), // Convert data to JSON string
    })
      .then(response => response.json()) // Parse response as JSON
      .then(data => {
        console.log('Success:', data);
        alert('Form submitted successfully!');
      })
      .catch((error) => {
        console.error('Error:', error);
        alert('Error submitting the form!');
      });
  };

  // Set responsive styles based on device width
  const [deviceWidth, setDeviceWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setDeviceWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Styles
  const containerStyle = {
    display: 'flex',
    flexDirection: deviceWidth < 768 ? 'column' : 'row',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    width: '100%',
    backgroundColor: 'white',
  };

  const contentStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    padding: '20px',
    backgroundColor: 'white',
    borderRadius: '8px',
    width: deviceWidth < 768 ? '100%' : '60%',
    maxWidth: '400px',
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

  const headingStyle = {
    color: '#282c34',
    marginBottom: '20px',
  };

  return (
    <div style={containerStyle}>
      <div style={contentStyle}>
        <h3 style={headingStyle}>Welcome : {user}</h3>

        <div>
          <h3 style={headingStyle}>IP Address Fetcher</h3>
          <p id="ip_fetch">{ipAddress}</p>

          <div style={{ display: 'grid', gap: '10px', width: '100%' }}>
            <button type="button" className="btn btn-outline-dark" style={buttonStyle} onClick={run_script}>
              Run Script
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
