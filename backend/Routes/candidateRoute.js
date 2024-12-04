const express = require('express');
const router = express.Router();
const candidateModel = require('../Model/candidate'); // Import the candidate model

// Add a new candidate
router.post('/add-candidate', async (req, res) => {
  try {
    const { cname, cdept, category, photo, display } = req.body;

    // Create a new candidate
    const newCandidate = new candidateModel({
      cname,
      cdept,
      category,
      photo,
      display,
    });

    // Save the candidate to the database
    await newCandidate.save();

    res.status(201).json({
      message: 'Candidate added successfully!',
      candidate: newCandidate,
    });
  } catch (error) {
    console.error('Error adding candidate:', error);
    res.status(500).json({ message: 'Failed to add candidate.' });
  }
});

// Get all candidates (with category support)
router.get('/all-candidates', async (req, res) => {
  try {
    const candidates = await candidateModel.find();
    res.status(200).json({
      message: 'Candidates fetched successfully!',
      candidates,
    });
  } catch (error) {
    console.error('Error fetching candidates:', error);
    res.status(500).json({ message: 'Failed to fetch candidates.' });
  }
});

// Get candidates by category
router.get('/candidates-by-category/:category', async (req, res) => {
  try {
    const { category } = req.params;
    const candidates = await candidateModel.find({ category });

    if (candidates.length === 0) {
      return res.status(404).json({ message: 'No candidates found for this category.' });
    }

    res.status(200).json({
      message: `Candidates in the ${category} category fetched successfully!`,
      candidates,
    });
  } catch (error) {
    console.error('Error fetching candidates by category:', error);
    res.status(500).json({ message: 'Failed to fetch candidates by category.' });
  }
});

// Edit candidate (update name, department, photo, etc.)
router.put('/edit-candidate/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { cname, cdept, category, photo, display } = req.body;

    const updatedCandidate = await candidateModel.findByIdAndUpdate(
      id,
      { cname, cdept, category, photo, display },
      { new: true } // Returns the updated candidate
    );

    if (!updatedCandidate) {
      return res.status(404).json({ message: 'Candidate not found.' });
    }

    res.status(200).json({
      message: 'Candidate updated successfully!',
      candidate: updatedCandidate,
    });
  } catch (error) {
    console.error('Error editing candidate:', error);
    res.status(500).json({ message: 'Failed to update candidate.' });
  }
});

// Delete candidate
router.delete('/delete-candidate/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const deletedCandidate = await candidateModel.findByIdAndDelete(id);

    if (!deletedCandidate) {
      return res.status(404).json({ message: 'Candidate not found.' });
    }

    res.status(200).json({
      message: 'Candidate deleted successfully!',
      candidate: deletedCandidate,
    });
  } catch (error) {
    console.error('Error deleting candidate:', error);
    res.status(500).json({ message: 'Failed to delete candidate.' });
  }
});

// PUT request to toggle the display status of a candidate
router.put('/toggle-display/:id', async (req, res) => {
  try {
    const candidate = await Candidate.findById(req.params.id);

    if (!candidate) {
      return res.status(404).json({ message: 'Candidate not found' });
    }

    // Toggle the display field
    candidate.display = req.body.display;

    await candidate.save();

    res.json({ message: 'Display status updated', candidate });
  } catch (error) {
    console.error('Error toggling display status:', error);
    res.status(500).json({ message: 'Server error' });
  }
});







module.exports = router;
