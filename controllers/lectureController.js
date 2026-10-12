const models = require('../models');

// CREATE Lecture
exports.createLecture = async (req, res) => {
    try {
        const lecture = await models.Lecture.create({
            subject: req.body.subject,
            lectureDate: req.body.lectureDate,
            room: req.body.room,
            facultyId: req.body.facultyId,
            slotId: req.body.slotId
        });

        res.status(201).json(lecture);

    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
};

// GET all Lectures
exports.getLectures = async (req, res) => {
    try {
        const lectures = await models.Lecture.findAll();

        res.json(lectures);

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

// GET Lecture by ID
exports.getLectureById = async (req, res) => {
    try {
        const lecture = await models.Lecture.findByPk(req.params.id);

        if (!lecture) {
            return res.status(404).json({
                message: 'Lecture not found'
            });
        }

        res.json(lecture);

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

// UPDATE Lecture
exports.updateLecture = async (req, res) => {
    try {
        const lecture = await models.Lecture.findByPk(req.params.id);

        if (!lecture) {
            return res.status(404).json({
                message: 'Lecture not found'
            });
        }

        await lecture.update({
            subject: req.body.subject,
            lectureDate: req.body.lectureDate,
            room: req.body.room,
            facultyId: req.body.facultyId,
            slotId: req.body.slotId
        });

        res.json(lecture);

    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
};

// DELETE Lecture
exports.deleteLecture = async (req, res) => {
    try {
        const lecture = await models.Lecture.findByPk(req.params.id);

        if (!lecture) {
            return res.status(404).json({
                message: 'Lecture not found'
            });
        }

        await lecture.destroy();

        res.json({
            message: 'Lecture deleted successfully'
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

// GET complete lecture schedule
exports.getSchedule = async (req, res) => {
    try {
        const lectures = await models.Lecture.findAll({
            include: [
                {
                    model: models.Faculty,
                    attributes: ['name', 'email']
                },
                {
                    model: models.Slot,
                    attributes: ['slotName', 'startTime', 'endTime']
                }
            ]
        });

        res.json(lectures);

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};