const express = require('express');
const router = express.Router();

const facultyController = require('../controllers/facultyController');


// CREATE Faculty
router.post('/', facultyController.createFaculty);


// GET all Faculty
router.get('/', facultyController.getFaculty);


// GET Faculty by ID
router.get('/:id', facultyController.getFacultyById);


// UPDATE Faculty
router.put('/:id', facultyController.updateFaculty);


// DELETE Faculty
router.delete('/:id', facultyController.deleteFaculty);


module.exports = router;