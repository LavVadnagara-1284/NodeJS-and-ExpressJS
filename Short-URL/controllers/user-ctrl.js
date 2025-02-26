const {v4: uuidv4} = require('uuid')
const User = require('../models/user-mdl')
const { setUser } = require('../service/auth')
 
async function handleUserSignUp(req, res) {
    const { name, email, password } = req.body;
    await User.create({
        name,
        email,
        password,
    });
    console.log(`Name: ${name}, Email: ${email}, Password: ${password}`);
    return res.render('home');
    // return res.redirect('/');
}

async function handleUserLogin(req, res) {
    const { email, password } = req.body;
    const user = await User.findOne({ email, password });
    if (!user) return res.status(401).render('login', {
        error: 'Invalid credentials'
    });

    const token = setUser( user);
    res.cookie('token', token);
    return res.redirect('/');
}

module.exports = {
    handleUserSignUp, handleUserLogin
}