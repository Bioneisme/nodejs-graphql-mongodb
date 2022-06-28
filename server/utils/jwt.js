const jwt = require("jsonwebtoken")

const getToken = data => {
    const payload = {
        username: data.username,
        password: data.password,
        token: data.token
    }
    return jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: 604800, // 1 Week - 604800
    })
}

const getPayload = token => {
    try {
        const payload = jwt.verify(token.split(' ')[1], process.env.JWT_SECRET);

        return { loggedIn: true, payload };
    } catch (err) {
        // TODO: Add Error Message
        return { loggedIn: false }
    }
}

module.exports = {
    getToken,
    getPayload
}