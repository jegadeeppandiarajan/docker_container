const express = require('express');
const router = express.Router();
const Student = require('../models/Student');

// Create student
router.post('/', async (req, res) => {
try {
    const student = new Student(req.body);
    await student.save();
    res.status(201).json(student);
} catch (err) {
    res.status(400).json({ error: err.message });
}
});

// Get all students
router.get('/', async (req, res) => {
try {
    const students = await Student.find();
    res.json(students);
} catch (err) {
    res.status(500).json({ error: err.message });
}
});

// READ by ID
router.get('/:id', async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) return res.status(404).json({ message: 'Not found' });
    res.json(student);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// UPDATE
router.put('/:id', async (req, res) => {
  try {
    const updated = await Student.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE
router.delete('/:id', async (req, res) => {
  try {
    await Student.findByIdAndDelete(req.params.id);
    res.json({ message: 'Deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
