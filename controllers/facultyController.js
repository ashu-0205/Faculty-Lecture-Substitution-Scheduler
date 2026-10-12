const models = require('../models');


// CREATE Faculty
exports.createFaculty = async (req, res) => {

    try {

        const faculty = await models.Faculty.create({
            name: req.body.name,
            email: req.body.email,
            salary: req.body.salary,
            departmentId: req.body.departmentId
        });

        res.status(201).json(faculty);

    } catch (error) {

        res.status(400).json({
            message: error.message
        });

    }

};


// GET all Faculty
exports.getFaculty = async (req, res) => {

    try {

        const faculty = await models.Faculty.findAll();

        res.json(faculty);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};


// GET Faculty by ID
exports.getFacultyById = async (req, res) => {

    try {

        const faculty = await models.Faculty.findByPk(req.params.id);

        if (!faculty) {
            return res.status(404).json({
                message: 'Faculty not found'
            });
        }

        res.json(faculty);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};


// UPDATE Faculty
exports.updateFaculty = async (req, res) => {

    try {

        const faculty = await models.Faculty.findByPk(req.params.id);

        if (!faculty) {
            return res.status(404).json({
                message: 'Faculty not found'
            });
        }

        await faculty.update({
            name: req.body.name,
            email: req.body.email,
            salary: req.body.salary,
            departmentId: req.body.departmentId
        });

        res.json(faculty);

    } catch (error) {

        res.status(400).json({
            message: error.message
        });

    }

};


// DELETE Faculty
exports.deleteFaculty = async (req, res) => {

    try {

        const faculty = await models.Faculty.findByPk(req.params.id);

        if (!faculty) {
            return res.status(404).json({
                message: 'Faculty not found'
            });
        }

        await faculty.destroy();

        res.json({
            message: 'Faculty deleted successfully'
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};