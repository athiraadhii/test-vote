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
} from '@mui/material';

const CandidateList = () => {
  const [candidates, setCandidates] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedCandidate, setSelectedCandidate] = useState(null);

  const categories = [
    'The Chairman',
    'The Vice-Chairman',
    'The Secretary',
    'The Joint Secretary',
    'The Councillor to the Calicut University Union',
    'The Secretary, Fine Arts',
    'The Chief Student Editor',
    'The General Captain of Sports & Games',
  ];

  useEffect(() => {
    const fetchCandidates = async () => {
      try {
        const response = await axios.get('/api/candidates/all-candidates', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setCandidates(response.data.candidates);
      } catch (error) {
        console.error('Error fetching candidates:', error);
      }
    };
    fetchCandidates();
  }, []);

  const handleViewCandidate = (candidate) => {
    setSelectedCandidate(candidate);
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setSelectedCandidate(null);
  };

  // Group candidates by category based on the specified order
  const groupedCandidates = categories.reduce((acc, category) => {
    acc[category] = candidates.filter((candidate) => candidate.category === category);
    return acc;
  }, {});

  return (
    <div style={{ padding: '20px' }}>
      <Typography align="center" variant="h4" style={{ marginBottom: '20px' }}>
        Candidates List
      </Typography>

      {categories.map((category) => (
        groupedCandidates[category]?.length > 0 && (
          <div key={category} style={{ marginBottom: '30px',marginTop:'80px' }}>
            <Typography variant="h5" style={{ textAlign: 'center', marginBottom: '10px' }}>
              {category}
            </Typography>
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
              {groupedCandidates[category].map((candidate) => (
                <Card
                  key={candidate._id}
                  style={{
                    textAlign: 'center',
                    margin: '10px',
                    padding: '15px',
                    width: '250px',
                    border: '1px solid #ddd',
                    borderRadius: '8px',
                  }}
                >
                  <Avatar
                    src={
                      candidate.photo ||
                      'https://cdn.pixabay.com/photo/2017/08/30/04/09/blank-profile-picture-1623024_960_720.png'
                    }
                    alt="Candidate Photo"
                    style={{
                      width: '100px',
                      height: '100px',
                      margin: '10px auto',
                    }}
                  />
                  <CardContent>
                    <Typography variant="h6">{candidate.cname}</Typography>
                    <Typography variant="body2">{candidate.cdept}</Typography>
                  </CardContent>
                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={() => handleViewCandidate(candidate)}
                  >
                    View Details
                  </Button>
                </Card>
              ))}
            </div>
          </div>
        )
      ))}

      {/* Dialog for viewing candidate details */}
      {selectedCandidate && (
        <Dialog open={dialogOpen} onClose={handleCloseDialog}>
          <DialogTitle>Candidate Details</DialogTitle>
          <DialogContent>
            <Typography variant="h6">Name: {selectedCandidate.cname}</Typography>
            <Typography variant="body1">Department: {selectedCandidate.cdept}</Typography>
            <Typography variant="body1">Category: {selectedCandidate.category}</Typography>
            <img
              src={
                selectedCandidate.photo ||
                'https://cdn.pixabay.com/photo/2017/08/30/04/09/blank-profile-picture-1623024_960_720.png'
              }
              alt="Candidate"
              style={{ width: '100%', height: 'auto', marginTop: '15px' }}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog} color="primary">
              Close
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </div>
  );
};

export default CandidateList;
