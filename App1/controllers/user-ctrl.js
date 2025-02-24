const User = require('../models/user-mdl')

async function handleGetAllUsers(req, res, next) {
    const allDbUsers = await User.find({});
    return res.json(allDbUsers);
}

async function handleGetUserById(req, res, next) {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ error: 'user not found' });
    return res.json(user);
}

async function handleUpdateUserById(req, res, next) {
    try {
        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            { $set: req.body }, // Update only the provided fields
            { new: true, runValidators: true } // Return updated user, validate data
        );

        if (!updatedUser) return res.status(404).json({ message: 'User not found' });

        return res.json(updatedUser);
    } catch (error) {
        return res.status(500).json({ message: 'Server error', error });
    }
}

async function handleDeleteUserById(req, res, next) {
    try {
        const deletedUser = await User.findByIdAndDelete(req.params.id);

        if (!deletedUser) return res.status(404).json({ message: 'User not found' });

        return res.json({ status: 'success', id: deletedUser._id });
    } catch (error) {
        return res.status(500).json({ message: 'Server error', error });
    }
}

async function handleCreateUser(req, res, next) {
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

    const result = await User.create({
        firstName: body.first_name,
        lastName: body.last_name,
        email: body.email,
        gender: body.gender,
        jobTitle: body.job_title,
    });

    return res.status(201).json({ msg: 'success', id: result._id });
}

module.exports = {
    handleGetAllUsers,
    handleGetUserById,
    handleUpdateUserById,
    handleDeleteUserById,
    handleCreateUser
}