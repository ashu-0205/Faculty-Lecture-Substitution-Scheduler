const express = require('express');
const router = express.Router();

const slotController = require('../controllers/slotController');

// CREATE Slot
router.post('/', slotController.createSlot);

// GET all Slots
router.get('/', slotController.getSlots);

// GET Slot by ID
router.get('/:id', slotController.getSlotById);

// UPDATE Slot
router.put('/:id', slotController.updateSlot);

// DELETE Slot
router.delete('/:id', slotController.deleteSlot);

module.exports = router;