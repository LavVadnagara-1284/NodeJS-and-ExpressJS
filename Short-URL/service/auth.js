const jwt = require('jsonwebtoken');
const secret = 'Lav@$1284$'

function setUser(user) {
    return jwt.sign({
        _id: user._id,
        email: user.email,
        role: user.role,
    }, secret)
}
 
function getUser(token) {
    if (!token) {
        console.log('Token is missing');
        return null;
    }

    // if (token.startsWith('Bearer ')) {
    //     token = token.split(' ')[1];
    // }

    try {
        const decoded = jwt.verify(token, secret);
        // console.log('✅ Token verified successfully:', decoded);
        return decoded;
    } catch (err) {
        if (err.name === 'JsonWebTokenError') {
            console.error('❌ Invalid token.');
        } else {
            console.error('❌ Token verification failed:', err.message);
        }
        return null;
    }
}

module.exports = { setUser, getUser };