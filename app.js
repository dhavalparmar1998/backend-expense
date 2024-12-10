import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import authRoutes from './routes/authRoutes.js';
import expenseRoutes from './routes/expenseRoutes.js';
import connection from './config/db.js';


dotenv.config();
const app = express();


app.use(cors());
app.use(express.json());

connection();


app.use('/api/auth', authRoutes);
app.use('/api/expenses', expenseRoutes);



app.use((err, req, res, next) => {
    res.status(err.status || 500).json({ message: err.message || 'Internal Server Error' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
