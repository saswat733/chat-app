import express from 'express';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.routes.js';
import messageRoutes from './routes/message.routes.js';
import userRoutes from './routes/user.routes.js';
import connectDB from './db/index.js';
import cookieParser from 'cookie-parser';

const app = express();

dotenv.config();
app.get('/', (req, res) => {
  res.send('Hello, world!');
});

app.use(express.json())
app.use(cookieParser())
// console.log(process.env.M)
app.use("/api/auth", authRoutes);
app.use("/api/messages",messageRoutes)
app.use("/api/users",userRoutes)

async function startServer() {
  try {
    await connectDB();
    const port = process.env.PORT || 5000;
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1); // Exit the application if MongoDB connection fails
  }
}

startServer();
