const models = require('./models');

async function addData() {

    // Insert Department
    const department = await models.Department.create({
        name: 'Computer Science',
        location: 'Goa'
    });

    // Insert Faculty
    await models.Faculty.create({
        name: 'Rahul Sharma',
        email: 'rahul@gmail.com',
        salary: 45000,
        departmentId: department.id
    });

    await models.Faculty.create({
        name: 'Priya Singh',
        email: 'priya@gmail.com',
        salary: 50000,
        departmentId: department.id
    });

    console.log('Data inserted successfully');
}

addData();