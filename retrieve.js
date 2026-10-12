const models = require('./models');

async function getData() {

    const department = await models.Department.findOne({
        where: { id: 1 },
        include: models.Faculty
    });

    console.log(department.toJSON());
}

getData();