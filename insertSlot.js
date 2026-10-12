const models = require('./models');

async function addData() {

    await models.Slot.create({
        slotName: 'Slot 1',
        startTime: '09:00:00',
        endTime: '10:00:00'
    });

    await models.Slot.create({
        slotName: 'Slot 2',
        startTime: '10:00:00',
        endTime: '11:00:00'
    });

    console.log('Slots inserted successfully');
}

addData();