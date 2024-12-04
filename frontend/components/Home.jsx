import React from 'react';
import { Box, Typography, Button, Paper } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

const Home = () => {
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
      {/* Section 1: Welcome */}
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
              Welcome to the College Election System
            </Typography>
          </Box>
          <Box
            sx={{
              flex: 1,
              background: 'url(https://electionbuddy.com/wp-content/uploads/2022/01/Voting-image-6-scaled.jpg) center center/cover no-repeat',
              borderRadius: 2,
              minHeight: { xs: 150, sm: 200, md: 300 },
            }}
          />
        </Box>
      </Paper>

      {/* Section 2: Upcoming Election */}
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
              background: 'url(https://static.vecteezy.com/system/resources/previews/003/474/484/original/upcoming-election-illustration-free-vector.jpg) center center/cover no-repeat',
              borderRadius: 2,
              minHeight: { xs: 150, sm: 200, md: 300 },
            }}
          />
          <Box sx={{ flex: 1, textAlign: { xs: 'center', md: 'left' }, padding: { xs: 2, sm: 4 } }}>
            <Typography variant="h5" sx={{ marginBottom: 2 }}>
              Upcoming Election
            </Typography>
            <Typography variant="body1" paragraph>
              Our college election is coming up! Get ready to vote for your favorite candidates.
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: { xs: 'center', md: 'flex-start' } }}>
              <Button component={RouterLink} to="/candidates" variant="contained" color="primary">
                View Candidates
              </Button>
            </Box>
            <Typography variant="body2" color="textSecondary" sx={{ marginTop: 2 }}>
              Please ensure that you are registered before voting.
            </Typography>
          </Box>
        </Box>
      </Paper>

      {/* Section 3: Voting */}
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
              background: 'url(https://th.bing.com/th/id/OIP.DyfFoz_kyVKwkHYDHMaAlQHaFj?w=223&h=180&c=7&r=0&o=5&pid=1.7) center center/cover no-repeat',
              borderRadius: 2,
              minHeight: { xs: 150, sm: 200, md: 300 },
            }}
          />
          <Box sx={{ flex: 1, textAlign: { xs: 'center', md: 'left' }, padding: { xs: 2, sm: 4 } }}>
            <Typography variant="h6" sx={{ marginBottom: 2 }}>
              Voting
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: { xs: 'center', md: 'flex-start' } }}>
              <Button component={RouterLink} to="/vote" variant="contained" color="success">
                Vote Now
              </Button>
            </Box>
          </Box>
        </Box>
      </Paper>

      {/* Section 4: Results */}
      <Paper
        elevation={6}
        sx={{
          padding: { xs: 2, sm: 4 },
          borderRadius: 2,
          width: '100%',
          maxWidth: 1200,
        }}
      >
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, alignItems: 'center' }}>
          <Box
            sx={{
              flex: 1,
              background: 'url(https://static.vecteezy.com/system/resources/previews/023/089/021/original/results-rubber-stamp-seal-vector.jpg) center center/cover no-repeat',
              borderRadius: 2,
              minHeight: { xs: 150, sm: 200, md: 300 },
            }}
          />
          <Box sx={{ flex: 1, textAlign: { xs: 'center', md: 'left' }, padding: { xs: 2, sm: 4 } }}>
            <Typography variant="h6" sx={{ marginBottom: 2 }}>
              Election Results
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: { xs: 'center', md: 'flex-start' } }}>
              <Button component={RouterLink} to="/results" variant="outlined" color="info">
                View Results
              </Button>
            </Box>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};

export default Home;
