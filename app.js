
const express = require('express');
const cors = require('cors');

const departmentRoutes = require('./routes/departmentRoutes');
const facultyRoutes = require('./routes/facultyRoutes');
const slotRoutes = require('./routes/slotRoutes');
const lectureRoutes = require('./routes/lectureRoutes');

const app = express();

app.use(cors({
    origin: 'http://localhost:5173'
}));

app.use(express.json());

app.use('/departments', departmentRoutes);
app.use('/faculty', facultyRoutes);
app.use('/slots', slotRoutes);
app.use('/lectures', lectureRoutes);

app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});
