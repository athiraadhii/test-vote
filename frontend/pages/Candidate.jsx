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
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';

const Candidate = () => {
  const [candidates, setCandidates] = useState([]);
  const [formValues, setFormValues] = useState({
    cname: '',
    cdept: '',
    category: '',
    photo: '',
  });
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [published, setPublished] = useState(false);

  const departments = [
    'COMMERCE',
    'MANAGEMENT',
    'COMPUTER APPLICATION',
    'COSTUME & FASHION DESIGNING',
    'MULTIMEDIA',
    'ENGLISH',
    'TOURISM MANAGEMENT',
    'HOTEL MANAGEMENT',
    'FOOD TECHNOLOGY',
  ];

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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { cname, cdept, category, photo } = formValues;

    if (!cname || !cdept || !category || !photo) {
      alert('All fields are required');
      return;
    }

    try {
      let response;
      if (isEditMode) {
        response = await axios.put(`/api/candidates/edit-candidate/${selectedCandidate._id}`, {
          cname,
          cdept,
          category,
          photo,
        }, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
      } else {
        response = await axios.post('/api/candidates/add-candidate', {
          cname,
          cdept,
          category,
          photo,
        }, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
      }

      if (isEditMode) {
        setCandidates(candidates.map(candidate => candidate._id === selectedCandidate._id ? response.data.candidate : candidate));
      } else {
        setCandidates([...candidates, response.data.candidate]);
      }

      setFormValues({ cname: '', cdept: '', category: '', photo: '' });
      setIsEditMode(false);
      setSelectedCandidate(null);
      setDialogOpen(false);
    } catch (error) {
      console.error('Error saving candidate:', error);
    }
  };

  const openAddForm = () => {
    setIsEditMode(false);
    setFormValues({ cname: '', cdept: '', category: '', photo: '' });
    setDialogOpen(true);
  };

  const openEditForm = (candidate) => {
    setIsEditMode(true);
    setFormValues({
      cname: candidate.cname,
      cdept: candidate.cdept,
      category: candidate.category,
      photo: candidate.photo,
    });
    setSelectedCandidate(candidate);
    setDialogOpen(true);
  };

  const handleDelete = async (candidateId) => {
    try {
      await axios.delete(`/api/candidates/delete-candidate/${candidateId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setCandidates(candidates.filter(candidate => candidate._id !== candidateId));
    } catch (error) {
      console.error('Error deleting candidate:', error);
    }
  };

  const handlePublishToggle = async (candidateId) => {
    try {
      // Sending the current `published` state to toggle the display field for the specific candidate
      const response = await axios.put(
        `/api/candidates/toggle-display/${candidateId}`,
        { display: !published },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
  
      // Log response for debugging
      console.log(response.data);
  
      // Update local state to reflect the change
      setCandidates(
        candidates.map((candidate) =>
          candidate._id === candidateId ? { ...candidate, display: !candidate.display } : candidate
        )
      );
  
      // Toggle the published state
      setPublished(!published);
    } catch (error) {
      console.error('Error toggling display status:', error);
    }
  };
  
  
  

  const groupedCandidates = candidates.reduce((acc, candidate) => {
    if (!acc[candidate.category]) {
      acc[candidate.category] = [];
    }
    acc[candidate.category].push(candidate);
    return acc;
  }, {});

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '20px' }}>
      <Card style={{ textAlign: 'center', padding: '10px', marginBottom: '20px', width: '100%', background: 'white' }}>
        <CardContent>
          <Typography variant="h6">Add New Candidate</Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={openAddForm}
            style={{ marginTop: '10px' }}
          >
            Add Candidate
          </Button>
          <Button
  variant="outlined"
  color={published ? 'success' : 'default'}
  onClick={handlePublishToggle}
  style={{ marginTop: '10px', marginLeft: '10px' }}
>
  {published ? 'Published' : 'Display'}
</Button>

        </CardContent>
      </Card>

      {/* Dialog Box for Adding or Editing */}
      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
        <DialogTitle>{isEditMode ? 'Edit Candidate' : 'Add New Candidate'}</DialogTitle>
        <DialogContent>
          <TextField
            label="Name"
            name="cname"
            fullWidth
            value={formValues.cname}
            onChange={handleInputChange}
            style={{ marginBottom: '10px' }}
          />
          <FormControl fullWidth style={{ marginBottom: '10px' }}>
            <InputLabel>Department</InputLabel>
            <Select
              name="cdept"
              value={formValues.cdept}
              onChange={handleInputChange}
            >
              {departments.map((dept) => (
                <MenuItem key={dept} value={dept}>{dept}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth style={{ marginBottom: '10px' }}>
            <InputLabel>Category</InputLabel>
            <Select
              name="category"
              value={formValues.category}
              onChange={handleInputChange}
            >
              {categories.map((cat) => (
                <MenuItem key={cat} value={cat}>{cat}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            label="Photo URL"
            name="photo"
            fullWidth
            value={formValues.photo}
            onChange={handleInputChange}
            style={{ marginBottom: '10px' }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)} color="secondary">Cancel</Button>
          <Button onClick={handleSubmit} color="primary">{isEditMode ? 'Update Candidate' : 'Add Candidate'}</Button>
        </DialogActions>
      </Dialog>

      {/* Candidates List */}
      <div style={{ width: '100%' }}>
        <Typography align="center" variant="h4" style={{ marginBottom: '20px', marginTop: '40px' }}>
          Candidates List
        </Typography>
        {categories
          .filter((category) => groupedCandidates[category])
          .map((category) => (
            <div key={category} style={{ marginBottom: '20px', marginTop: '90px' }}>
              <Typography variant="h5" style={{ textAlign: 'center', marginBottom: '10px' }}>
                {category}
              </Typography>
              <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
                {groupedCandidates[category].map((candidate) => (
                  <div
                    key={candidate._id}
                    style={{
                      textAlign: 'center',
                      padding: '10px',
                      margin: '10px',
                      width: '250px',
                      border: '1px solid #ccc',
                      borderRadius: '8px',
                    }}
                  >
                    <Avatar
                      alt="Candidate Photo"
                      src={candidate.photo || 'https://cdn.pixabay.com/photo/2017/01/03/11/24/avatar-2007538_960_720.png'}
                      style={{
                        width: '80px',
                        height: '80px',
                        margin: 'auto',
                        marginBottom: '10px',
                      }}
                    />
                    <Typography variant="h6">{candidate.cname}</Typography>
                    <Typography variant="body2" color="wheat">
                      {candidate.cdept}
                    </Typography>
                    <Button
                      variant="outlined"
                      color="primary"
                      onClick={() => openEditForm(candidate)}
                      style={{ marginTop: '10px' }}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="outlined"
                      color="error"
                      onClick={() => handleDelete(candidate._id)}
                      style={{ marginTop: '10px', marginLeft: '10px' }}
                    >
                      Delete
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Candidate;
