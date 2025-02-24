const express = require('express');
const app = express();

app.get('/', (req, res) => {
    return res.send('Hello this Home Page')
})
app.get('/about', (req, res) => {
    return res.send(`Hello this About Page<br>Hey! ${req.query.name} you are ${req.query.age}`)
})

app.get('/profile', (req, res) => {
    return res.send(`Hello this Profile Page`);
})

app.listen(3000, () => console.log('Server is running on port 3000'));