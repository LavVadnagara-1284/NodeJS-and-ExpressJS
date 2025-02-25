const express = require('express');
const path = require('path');

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

app.use('/url', urlRoute);
app.use('/', staticRoute);
app.use('/user', userRoute);

app.listen(port, () => console.log(`Server started at ${port}`));