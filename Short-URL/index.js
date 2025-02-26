const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const { checkForAuthentication, restrictTo } = require('./middlewares/auth')

const { connectToMongoDB } = require('./connection')
const urlRoute = require('./routes/url-rt')
const staticRoute = require('./routes/staticRouter')
const userRoute = require('./routes/user-rt')

const app = express();
const port = 3001;

connectToMongoDB('mongodb://127.0.0.1:27017/short-url').then(() => console.log('MongoDB connection established'))

app.set('view engine', 'ejs');
app.set('views', path.resolve('./views'));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(checkForAuthentication);

app.use('/url', restrictTo(['NORMAL', 'ADMIN']), urlRoute);
app.use('/user', userRoute);
app.use('/', staticRoute);

app.listen(port, () => console.log(`Server started at ${port}`));