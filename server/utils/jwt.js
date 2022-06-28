const jwt = require("jsonwebtoken")
const UserModel = require('../models/user-model')

const getToken = data => {
    const payload = {
        email: data.email,
        password: data.password,
    }
    return jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: 604800, // 1 Week - 604800
    })
}

const getPayload = async token => {
    try {
        const bToken = token.split(' ')[1]
        const payload = jwt.verify(bToken, process.env.JWT_SECRET)
        const user = await UserModel.findOne({email: payload.email, token: bToken})

        if (user)
            return {user, loggedIn: true}
        else
            // TODO: Error Message (Invalid Token)
            return {loggedIn: false}
    } catch (err) {
        // TODO: Add Error Message
        return {loggedIn: false}
    }
}

module.exports = {
    getToken,
    getPayload
}