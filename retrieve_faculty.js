const models = require('./models');

async function getData() {

    const faculty = await models.Faculty.findOne({
        where: { id: 1 },
        include: models.Lecture
    });

    console.log(faculty.toJSON());
}

getData();