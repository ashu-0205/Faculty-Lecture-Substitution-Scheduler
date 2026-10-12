const models = require('./models');

async function getData() {

    const slot = await models.Slot.findOne({
        where: { id: 1 },
        include: models.Lecture
    });

    console.log(slot.toJSON());
}

getData();