import React, { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  FormControlLabel,
  Checkbox,
  Snackbar,
  Link,
} from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Signup = () => {
  const [username, setUsername] = useState('');
  const [admissionNumber, setAdmissionNumber] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Password validation
    if (password.length < 8) {
      setErrorMessage('Password must be at least 8 characters');
      setOpenSnackbar(true);
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage('Password and Confirm Password do not match');
      setOpenSnackbar(true);
      return;
    }

    try {
      // Send data to backend
      const response = await axios.post('http://localhost:5000/api/users/register', {
        username,
        admissionNumber,
        password,
        cpassword: confirmPassword, // Send confirm password to compare on server side
      });

      // If successful, display success message
      setSuccessMessage(response.data.message || 'Signup successful!');
      setOpenSnackbar(true);

      setTimeout(() => {
        navigate('/'); // Redirect to login page after successful signup
      }, 2000);
    } catch (error) {
      // Enhanced error handling
      if (error.response) {
        // Server responded with a non-2xx status code
        if (error.response.data) {
          setErrorMessage(error.response.data.error || 'An error occurred on the server.');
        } else {
          setErrorMessage('Unexpected error occurred. Please try again.');
        }
      } else if (error.request) {
        // No response received from the server
        setErrorMessage('No response from the server. Please check your connection.');
      } else {
        // Error occurred during setting up the request
        setErrorMessage('Error in setting up request: ' + error.message);
      }
      setOpenSnackbar(true);
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
      }}
    >
      <Paper elevation={10} sx={{ width: { xs: '90%', sm: '90%', md: '350px' }, padding: 2, borderRadius: 2 }}>
        <Typography
          variant="h5"
          fontWeight="bold"
          gutterBottom
          sx={{ textAlign: 'center', color: '#1976D2', fontSize: { xs: '1.5rem', sm: '1.75rem', md: '2rem' } }}
        >
          Signup
        </Typography>

        <form onSubmit={handleSubmit}>
          <TextField
            label="Username"
            type="text"
            fullWidth
            margin="normal"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <TextField
            label="Admission Number"
            type="text"
            fullWidth
            margin="normal"
            value={admissionNumber}
            onChange={(e) => setAdmissionNumber(e.target.value)}
            required
          />
          <TextField
            label="Password"
            type="password"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <TextField
            label="Confirm Password"
            type="password"
            fullWidth
            margin="normal"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                color="primary"
              />
            }
            label="Remember me"
          />
          <Button type="submit" variant="contained" fullWidth sx={{ marginTop: 2, padding: '10px 0' }}>
            Signup
          </Button>
        </form>

        <Box sx={{ textAlign: 'center', marginTop: 2 }}>
          <Typography variant="body2">
            Already have an account?{' '}
            <Link component={RouterLink} to="/" sx={{ color: '#1976D2' }}>
              Login
            </Link>
          </Typography>
        </Box>
      </Paper>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={() => setOpenSnackbar(false)}
        message={errorMessage || successMessage}
      />
    </Box>
  );
};

export default Signup;
