import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode'; // Corrected import

import {
  Card,
  CardContent,
  Typography,
  Button,
  Avatar,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material';

const Aprofile = () => {
  const [profile, setProfile] = useState(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [newUsername, setNewUsername] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Decode the JWT token to get the user information
  const getUserFromToken = () => {
    const token = localStorage.getItem('token'); // Assuming the token is stored in localStorage
    if (!token) {
      return null;
    }
    try {
      const decoded = jwtDecode(token);  // Correct method to decode token
      return decoded;  // Return the entire decoded token, which includes user data
    } catch (error) {
      console.error('Error decoding token:', error.message);
      return null;
    }
  };

  // Fetch user profile data using the decoded token information
  useEffect(() => {
    const user = getUserFromToken(); // Get user data from token

    if (user) {
      // Set profile with user data from token
      setProfile({
        username: user.username,  // Assuming the decoded token contains a 'username' field
        admissionNumber: user.admissionNumber, // Assuming 'admissionNumber' is in the token as well
      });
    } else {
      setErrorMessage('Error: User is not authenticated');
    }
  }, []);

  // Handle Edit Profile
  const handleEditProfile = async () => {
    try {
      if (!newUsername) {
        setErrorMessage('Username cannot be empty');
        return;
      }
  
      // Send request to update the profile
      const response = await axios.put(
        '/api/users/profile',
        { username: newUsername },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`, // Add the token to the request headers
          },
        }
      );
  
      setProfile(response.data.user);
      setSuccessMessage('Username updated successfully');
      setErrorMessage('');
      setEditDialogOpen(false);
    } catch (error) {
      if (error.response?.data?.error) {
        setErrorMessage(error.response.data.error);
      } else {
        // setErrorMessage('An error occurred while updating the profile');
      }
    }
  };

  if (!profile) {
    return <Typography>Loading profile...</Typography>;
  }

  return (
    
    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
      
      <Card style={{ width: '400px', textAlign: 'center' }}>
        <CardContent>
          <Avatar
            alt="Profile Picture"
            src="https://cdn.pixabay.com/photo/2019/08/11/18/59/icon-4399701_1280.png" // Default profile picture
            style={{
              margin: '0 auto',
              width: '100px',
              height: '100px',
            }}
          />
          <Typography variant="h6" style={{ marginTop: '10px' }}>
            {profile.username}
          </Typography>
          {/* <Typography variant="body2" color="textSecondary">
            Admission Number: {profile.admissionNumber}
          </Typography> */}

          {/* <Button
            variant="contained"
            color="primary"
            style={{ marginTop: '20px' }}
            onClick={() => setEditDialogOpen(true)}
          >
            Edit Profile
          </Button> */}

          {successMessage && (
            <Typography variant="body2" style={{ color: 'green', marginTop: '10px' }}>
              {successMessage}
            </Typography>
          )}
          {errorMessage && (
            <Typography variant="body2" style={{ color: 'red', marginTop: '10px' }}>
              {errorMessage}
            </Typography>
          )}
        </CardContent>
      </Card>

      {/* Dialog for editing username */}
      <Dialog open={editDialogOpen} onClose={() => setEditDialogOpen(false)}>
        <DialogTitle>Edit Username</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="New Username"
            fullWidth
            value={newUsername}
            onChange={(e) => setNewUsername(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditDialogOpen(false)} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleEditProfile} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Aprofile;
