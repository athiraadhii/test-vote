import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Card,
  CardContent,
  Typography,
  Button,
  Avatar,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
} from '@mui/material';

const Auser = () => {
  const [users, setUsers] = useState([]); // Initialize as an empty array
  const [selectedUser, setSelectedUser] = useState(null);
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Fetch all users
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        console.log('Fetching users...');
        const response = await axios.get('/api/users/fetch-all-users', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        console.log('API Response:', response.data);
        setUsers(response.data.allUsers || []); // Ensure users is an array
      } catch (error) {
        setErrorMessage('Failed to fetch users.');
        console.error('Fetch users error:', error.response || error.message);
      }
    };

    fetchUsers();
  }, []);

  // Handle delete user
  const handleRemoveUser = async () => {
    try {
      const response = await axios.delete(`/api/users/remove-user/${selectedUser._id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      // Update the user list
      setUsers((prevUsers) => prevUsers.filter((user) => user._id !== selectedUser._id));
      setSuccessMessage(response.data.message);
      setErrorMessage('');
      setConfirmDialogOpen(false);
    } catch (error) {
      setErrorMessage('Failed to remove user.');
      console.error('Remove user error:', error.response || error.message);
    }
  };

  return (
    <div style={{ marginTop: '20px' }}>
      {/* Responsive Heading */}
      <Typography
        variant="h4"
        align="center"
        style={{
          marginBottom: '20px',
          fontWeight: 'bold',
          color: 'white',
        }}
        sx={{
          fontSize: { xs: '1.5rem', sm: '2rem', md: '2.5rem' }, // Responsive font size
        }}
      >
        Users List
      </Typography>

      {/* Display Users in a Grid with 3 users per row */}
      <Grid container spacing={3} justifyContent="center">
        {users.length > 0 ? (
          users
            .filter((user) => user.role !== 'admin') // Exclude admin users
            .map((user) => (
              <Grid item xs={12} sm={6} md={4} key={user._id}>
                <Card
                  style={{
                    backgroundColor: '#f9f9f9',
                    border: '1px solid #ddd',
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                    textAlign: 'center',
                  }}
                >
                  <CardContent>
                    <Avatar
                      alt="User Profile Picture"
                      src="https://cdn.pixabay.com/photo/2019/08/11/18/59/icon-4399701_1280.png"
                      style={{
                        margin: '0 auto',
                        width: '60px',
                        height: '60px',
                        border: '2px solid #4caf50',
                      }}
                    />
                    <Typography variant="h6" style={{ marginTop: '10px', fontWeight: 'bold', color: '#333' }}>
                      {user.username}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      {user.email}
                    </Typography>
                    <Button
                      variant="contained"
                      color="secondary"
                      style={{
                        marginTop: '10px',
                        backgroundColor: '#f44336',
                      }}
                      onClick={() => {
                        setSelectedUser(user);
                        setConfirmDialogOpen(true);
                      }}
                    >
                      Remove User
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))
        ) : (
          <Typography>No users found or failed to fetch users.</Typography>
        )}
      </Grid>

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

      {/* Confirmation Dialog */}
      <Dialog
        open={confirmDialogOpen}
        onClose={() => setConfirmDialogOpen(false)}
      >
        <DialogTitle>Confirm Remove User</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to remove {selectedUser?.username}?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmDialogOpen(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleRemoveUser} color="secondary">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Auser;
