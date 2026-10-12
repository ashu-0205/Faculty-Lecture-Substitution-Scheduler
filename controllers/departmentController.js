const models = require('../models');


// CREATE Department
exports.createDepartment = async (req, res) => {

    try {

        const department = await models.Department.create({
            name: req.body.name,
            location: req.body.location
        });

        res.status(201).json(department);

    } catch (error) {

        res.status(400).json({
            message: error.message
        });

    }

};


// GET all Departments
exports.getDepartments = async (req, res) => {

    try {

        const departments = await models.Department.findAll();

        res.json(departments);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};


// GET Department by ID
exports.getDepartmentById = async (req, res) => {

    try {

        const department = await models.Department.findByPk(req.params.id);

        if (!department) {
            return res.status(404).json({
                message: 'Department not found'
            });
        }

        res.json(department);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};


// UPDATE Department
exports.updateDepartment = async (req, res) => {

    try {

        const department = await models.Department.findByPk(req.params.id);

        if (!department) {
            return res.status(404).json({
                message: 'Department not found'
            });
        }

        await department.update({
            name: req.body.name,
            location: req.body.location
        });

        res.json(department);

    } catch (error) {

        res.status(400).json({
            message: error.message
        });

    }

};


// DELETE Department
exports.deleteDepartment = async (req, res) => {

    try {

        const department = await models.Department.findByPk(req.params.id);

        if (!department) {
            return res.status(404).json({
                message: 'Department not found'
            });
        }

        await department.destroy();

        res.json({
            message: 'Department deleted successfully'
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};