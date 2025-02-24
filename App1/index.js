const express = require('express');
const { connectMongoDB } = require('./connection')

const { logReqRes } = require('./middlewares')
const userRouter = require('./routes/user-rts')

const app = express();
const port = 3000;

// Connection
connectMongoDB('mongodb://localhost:27017/youtube-app-1')
    .then(() => console.log('MongoDB connected!!'))

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(logReqRes('log.txt'))

// Routes
app.use('/api/users', userRouter)

app.listen(port, () => console.log(`Server is running on port ${port}`));