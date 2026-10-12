const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
    'faculty_scheduler',
    'root',
    '',
    {
        host: 'localhost',
        dialect: 'mysql'
    }
);

async function main() {
    try {
        console.log('Testing database connection...');

        await sequelize.authenticate();

        console.log('Database connection successful!');
    } catch (error) {
        console.error('Database connection failed!');
        console.error(error.message);
    } finally {
        await sequelize.close();

        console.log('Database connection closed.');
    }
}

main();