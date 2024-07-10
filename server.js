import * as dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import morgan from 'morgan';
import jobRouter from './routes/jobRouter.js';
import mongoose from 'mongoose';


const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

// Register the job router
app.use('/api/v1/jobs', jobRouter);

// 404 Middleware
app.use('*', (req, res) => {
    res.status(404).json({ msg: 'not found' });
});

// Error-handling Middleware
app.use((err, req, res, next) => {
    console.error(err.stack); // Consider using console.error for errors
    res.status(500).json({ msg: 'something went wrong' });
});

const port = process.env.PORT || 5100;
try {
    await mongoose.connect(process.env.MONGO_URL);
    app.listen(port, () => {
      console.log(`server running on PORT ${port}....`);
    });
  } catch (error) {
    console.log(error);
    process.exit(1);
  }

