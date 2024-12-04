import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Paper, Checkbox, FormControlLabel, Link } from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Send login request to backend
    try {
      const response = await axios.post('http://localhost:5000/api/users/login', { username, password });

      if (response.data.token) {
        // Store the token and user info in localStorage (or cookies) if you want to persist the login state
        localStorage.setItem('token', response.data.token);

        // Store user information for later use (e.g., viewing profile)
        localStorage.setItem('user', JSON.stringify({
          username: response.data.username,
          role: response.data.role,
          admissionNumber: response.data.admissionNumber, // Store admission number
        }));

        // Check user role and navigate accordingly
        if (response.data.role === 'admin') {
          navigate('/admin'); // Navigate to Admin page
        } else if (response.data.role === 'user') {
          navigate('/home'); // Navigate to Home page
        }
      }
    } catch (error) {
      console.error('Login failed:', error.response?.data?.error || error.message);
      alert(error.response?.data?.error || 'An error occurred'); // Show error message
    }
  };

  return (
    <Box className="container" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <Paper
        elevation={10}
        sx={{
          width: { xs: '90%', sm: '90%', md: '350px' },
          padding: 2,
          borderRadius: 2,
        }}
      >
        <Typography
          variant="h5"
          fontWeight="bold"
          gutterBottom
          sx={{
            textAlign: 'center',
            color: '#1976D2',
            fontSize: { xs: '1.5rem', sm: '1.75rem', md: '2rem' },
          }}
        >
          Login
        </Typography>

        <form onSubmit={handleSubmit}>
          {/* Username Field */}
          <TextField
            label="Username"
            type="text"
            fullWidth
            margin="normal"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            sx={{
              '& .MuiOutlinedInput-root': { borderRadius: 2 },
            }}
          />

          {/* Password Field */}
          <TextField
            label="Password"
            type="password"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            sx={{
              '& .MuiOutlinedInput-root': { borderRadius: 2 },
            }}
          />

          {/* Remember Me Checkbox */}
          <FormControlLabel
            control={
              <Checkbox
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                color="primary"
              />
            }
            label="Remember me"
            sx={{ marginTop: 1 }}
          />

          {/* Login Button */}
          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{
              marginTop: 2,
              padding: '10px 0',
              fontWeight: 'bold',
              backgroundColor: '#1976D2',
              '&:hover': {
                backgroundColor: '#1565C0',
              },
            }}
          >
            Login
          </Button>
        </form>

        {/* Link to Signup page */}
        <Box sx={{ textAlign: 'center', marginTop: 2 }}>
          <Typography variant="body2">
            No Account?{' '}
            <Link component={RouterLink} to="/signup" sx={{ color: '#1976D2' }}>
              Signup
            </Link>
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
};

export default Login;
