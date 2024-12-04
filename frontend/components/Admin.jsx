import React from 'react';
import { Box, Typography, Button, Paper } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

const Admin = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        padding: { xs: 2, sm: 4 },
        width: '100%',
      }}
    >
      {/* Section 1: Admin Dashboard */}
      <Paper
        elevation={6}
        sx={{
          padding: { xs: 2, sm: 4 },
          marginBottom: 4,
          borderRadius: 2,
          width: '100%',
          maxWidth: 1200,
        }}
      >
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, alignItems: 'center' }}>
          <Box sx={{ flex: 1, textAlign: { xs: 'center', md: 'left' } }}>
            <Typography
              variant="h3"
              fontWeight="bold"
              sx={{
                marginBottom: 2,
                fontSize: { xs: '1.8rem', sm: '2.5rem', md: '3rem' },
                color: '#2196f3',
              }}
            >
              Welcome to the Admin Panel
            </Typography>
            <Typography variant="h5" sx={{ marginBottom: 2 }}>
              Manage the election system and monitor ongoing processes.
            </Typography>
          </Box>
          <Box
            sx={{
              flex: 1,
              background: 'url(https://th.bing.com/th/id/OIP.ap1meCSSW90fhCTljl_lLAHaGc?w=174&h=180&c=7&r=0&o=5&pid=1.7) center center/cover no-repeat',
              borderRadius: 2,
              minHeight: { xs: 150, sm: 200, md: 300 },
            }}
          />
        </Box>
      </Paper>

      {/* Section 2: Manage Candidates */}
      <Paper
        elevation={6}
        sx={{
          padding: { xs: 2, sm: 4 },
          marginBottom: 4,
          borderRadius: 2,
          width: '100%',
          maxWidth: 1200,
        }}
      >
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, alignItems: 'center' }}>
          <Box
            sx={{
              flex: 1,
              background: 'url(https://th.bing.com/th/id/OIP.B5hfs8msZZgwiRBU2SBMnQHaDk?w=290&h=168&c=7&r=0&o=5&pid=1.7) center center/cover no-repeat',
              borderRadius: 2,
              minHeight: { xs: 150, sm: 200, md: 300 },
            }}
          />
          <Box sx={{ flex: 1, textAlign: { xs: 'center', md: 'left' }, padding: { xs: 2, sm: 4 } }}>
            <Typography variant="h5" sx={{ marginBottom: 2 }}>
              Manage Candidates
            </Typography>
            <Typography variant="body1" paragraph>
              Add, edit, or remove candidates for the upcoming election.
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: { xs: 'center', md: 'flex-start' } }}>
              <Button component={RouterLink} to="/admin/candidates" variant="contained" color="primary">
                View & Manage Candidates
              </Button>
            </Box>
          </Box>
        </Box>
      </Paper>

      {/* Section 3: View Election Results */}
      <Paper
        elevation={6}
        sx={{
          padding: { xs: 2, sm: 4 },
          marginBottom: 4,
          borderRadius: 2,
          width: '100%',
          maxWidth: 1200,
        }}
      >
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, alignItems: 'center' }}>
          <Box
            sx={{
              flex: 1,
              background: 'url(https://th.bing.com/th/id/OIP.tTQ-qgA6WzTdc8wfnSwJYgHaHa?w=177&h=180&c=7&r=0&o=5&pid=1.7) center center/cover no-repeat',
              borderRadius: 2,
              minHeight: { xs: 150, sm: 200, md: 300 },
            }}
          />
          <Box sx={{ flex: 1, textAlign: { xs: 'center', md: 'left' }, padding: { xs: 2, sm: 4 } }}>
            <Typography variant="h6" sx={{ marginBottom: 2 }}>
              Election Results
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: { xs: 'center', md: 'flex-start' } }}>
              <Button component={RouterLink} to="/admin/results" variant="outlined" color="info">
                View Results
              </Button>
            </Box>
          </Box>
        </Box>
      </Paper>

      {/* Section 4: Manage Users */}
      <Paper
        elevation={6}
        sx={{
          padding: { xs: 2, sm: 4 },
          marginBottom: 4,
          borderRadius: 2,
          width: '100%',
          maxWidth: 1200,
        }}
      >
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, alignItems: 'center' }}>
          <Box
            sx={{
              flex: 1,
              background: 'url(https://th.bing.com/th/id/OIP.GxczUW9ShhTQl5NV5V4OnQHaHQ?w=218&h=214&c=7&r=0&o=5&pid=1.7) center center/cover no-repeat',
              borderRadius: 2,
              minHeight: { xs: 150, sm: 200, md: 300 },
            }}
          />
          <Box sx={{ flex: 1, textAlign: { xs: 'center', md: 'left' }, padding: { xs: 2, sm: 4 } }}>
            <Typography variant="h6" sx={{ marginBottom: 2 }}>
              Manage Users
            </Typography>
            <Typography variant="body1" paragraph>
              Monitor user registrations, manage permissions, and update user details.
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: { xs: 'center', md: 'flex-start' } }}>
              <Button component={RouterLink} to="/admin/users" variant="contained" color="secondary">
                View & Manage Users
              </Button>
            </Box>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};

export default Admin;
