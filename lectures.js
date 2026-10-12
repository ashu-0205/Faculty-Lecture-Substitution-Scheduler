const models = require('./models');

async function addData() {

    await models.Lecture.create({
        subject: 'Full Stack Development',
        lectureDate: '2026-09-28',
        room: 'Lab 1',
        facultyId: 1,
        slotId: 1
    });

    await models.Lecture.create({
        subject: 'Cloud Computing',
        lectureDate: '2026-09-28',
        room: 'Room 5',
        facultyId: 1,
        slotId: 2
    });

    console.log('Lectures inserted successfully');
}
  
addData();