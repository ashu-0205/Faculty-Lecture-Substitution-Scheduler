const models = require('../models');

// CREATE Slot
exports.createSlot = async (req, res) => {
    try {
        const slot = await models.Slot.create({
            slotName: req.body.slotName,
            startTime: req.body.startTime,
            endTime: req.body.endTime
        });

        res.status(201).json(slot);

    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
};

// GET all Slots
exports.getSlots = async (req, res) => {
    try {
        const slots = await models.Slot.findAll();

        res.json(slots);

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

// GET Slot by ID
exports.getSlotById = async (req, res) => {
    try {
        const slot = await models.Slot.findByPk(req.params.id);

        if (!slot) {
            return res.status(404).json({
                message: 'Slot not found'
            });
        }

        res.json(slot);

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

// UPDATE Slot
exports.updateSlot = async (req, res) => {
    try {
        const slot = await models.Slot.findByPk(req.params.id);

        if (!slot) {
            return res.status(404).json({
                message: 'Slot not found'
            });
        }

        await slot.update({
            slotName: req.body.slotName,
            startTime: req.body.startTime,
            endTime: req.body.endTime
        });

        res.json(slot);

    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
};

// DELETE Slot
exports.deleteSlot = async (req, res) => {
    try {
        const slot = await models.Slot.findByPk(req.params.id);

        if (!slot) {
            return res.status(404).json({
                message: 'Slot not found'
            });
        }

        await slot.destroy();

        res.json({
            message: 'Slot deleted successfully'
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};