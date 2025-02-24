const fs = require('fs');
const express = require('express');
const users = require('./MOCK_DATA.json');

const app = express();
const port = 3000;

// Middleware
app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
    fs.appendFile('log.txt', `${new Date().toLocaleString()}: ${req.method} - ${req.path}\n`, (err, data) => {
        next();
    });
})

app.use((req, res, next) => {
    console.log(`Hello from Middleware 1`);
    req.myUserName = 'Lav Vadnagara'
    next();
})

app.use((req, res, next) => {
    console.log(`Hello from Middleware 2`, req.myUserName);
    next();
})

// Routes
app.get('/users', (req, res) => {
    const html = `
    <ul>
    ${users.map(user => `<li>${user.first_name} ${user.last_name}</li>`).join('')}
    </ul>
    `;
    res.send(html);
})

app.get('/api/users', (req, res) => {
    res.setHeader('myName', 'Lav Vadnagara');
    return res.json(users);
});

app
    .route('/api/users/:id')
    .get((req, res) => {
        const id = req.params.id;
        const user = users.find(user => user.id === parseInt(id));
        if (!user) return res.status(404).json({ error: 'user not found' });
        return res.json(user);
    })
    .patch((req, res) => {
        // Edit user with id
        const id = req.params.id;
        const userIndex = users.findIndex(user => user.id === parseInt(id));
        if (userIndex === -1) return res.status(404).json({ message: 'User not found' });
        const updatedUser = { ...users[userIndex], ...req.body };
        users[userIndex] = updatedUser;
        fs.writeFile('./MOCK_DATA.json', JSON.stringify(users), (err, data) => {
            return res.json({ status: 'success', id: updatedUser.id });
        });
    })
    .delete((req, res) => {
        // Delete user with id
        const id = req.params.id;
        const userIndex = users.findIndex(user => user.id === parseInt(id));
        if (userIndex === -1) return res.status(404).json({ message: 'User not found' });
        users.splice(userIndex, 1);
        fs.writeFile('./MOCK_DATA.json', JSON.stringify(users), (err, data) => {
            return res.json({ status: 'success', id });
        });
    });

app.post('/api/users', (req, res) => {
    const body = req.body;
    if (
        !body ||
        !body.first_name ||
        !body.last_name ||
        !body.email ||
        !body.gender ||
        !body.job_title
    ) {
        return res.status(400).json({ message: 'Missing required fields' });
    }
})

app.listen(port, () => console.log(`Server is running on port ${port}`));