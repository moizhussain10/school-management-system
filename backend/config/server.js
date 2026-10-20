import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

// Config dotenv
dotenv.config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Routes Example
// import studentRoutes from './routes/students.js';
// import teacherRoutes from './routes/teachers.js';
// app.use('/api/students', studentRoutes);
// app.use('/api/teachers', teacherRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

