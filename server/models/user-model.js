const {Schema, model} = require('mongoose')

const userSchema = new Schema({
    email: {type: String, required: true},
    password: {type: String, required: true},
    confirmed: {type: Boolean, default: false, required: true},
    token: {type: String},
    image: {type: String}
})

module.exports = model('User', userSchema)