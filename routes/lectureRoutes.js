const express = require('express');
const router = express.Router();

const lectureController = require('../controllers/lectureController');

// CREATE Lecture
router.post('/', lectureController.createLecture);

// GET complete lecture schedule
// Keep this BEFORE /:id
router.get('/schedule', lectureController.getSchedule);

// GET all Lectures
router.get('/', lectureController.getLectures);

// GET Lecture by ID
router.get('/:id', lectureController.getLectureById);

// UPDATE Lecture
router.put('/:id', lectureController.updateLecture);

// DELETE Lecture
router.delete('/:id', lectureController.deleteLecture);

module.exports = router;