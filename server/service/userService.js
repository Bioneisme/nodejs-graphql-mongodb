require('dotenv').config();

const nodemailer = require('nodemailer');

const UserModel = require('../models/userModel');
const CodeModel = require('../models/confirmationCode');

const password = process.env.NODEMAILER_EMAIL_PASSWORD;
const email = process.env.NODEMAILER_EMAIL_USERNAME;

let transport = nodemailer.createTransport({
    service: 'Mail.ru',
    auth: {
        user: email,
        pass: password
    },
});

class userService {
    async createCode(email, code) {
        try {
            const newCode = new CodeModel({
                code: code,
                user: email,
            });
            await newCode.save();
        } catch (e) {
            throw new Error(e);
        }
    }

    async sendCode(email, code) {
        try {
            const confirmationMessage = `<h2 style="color:#ff6600;">hello welcome to quiz.evolve here is your account  confirmation code :${code} </h2>`
            const mailOptions = {
                from: process.env.NODEMAILER_EMAIL_USERNAME,
                to: email,
                subject: 'Quiz evolve',
                html: confirmationMessage,
            };

            await transport.sendMail(mailOptions);
        } catch (e) {
            console.log(e)
        }
    }

    async checkCode(email, code) {
        const confirmation = await CodeModel.findOne({user: email});
        if (!confirmation) return false

        if (confirmation.code === code) {
            await CodeModel.findOne({user: email, code: code}, {user: 1}).lean().deleteOne()
            await UserModel.findOneAndUpdate({email: email}, {confirmed: true})
            return true
        } else return false
    }
}


module.exports = new userService()