const bcrypt = require('bcrypt')
const randomString = require('randomstring')
const {getToken} = require('../../utils/jwt')

const UserModel = require('../../models/user-model')

const userService = require('../../service/userService')

const {AuthenticationError} = require('apollo-server-express');

const userResolvers = {
    Query: {
        user: (_, args, context) => {
            if (context.loggedIn) {
                console.log(context.user)
                return context.user
            } else {
                throw new AuthenticationError("Please Login Again!")
            }
        }
    },
    Mutation: {
        register: async (_, args) => {
            const {email, password} = args

            const hashPassword = await bcrypt.hash(password, 10)

            const user = await UserModel.findOne({email: email})
            if (user) {
                throw new AuthenticationError("User Already Exists!")
            }
            try {
                const newUser = await UserModel.create({
                    email,
                    password: hashPassword
                })
                newUser.token = getToken(newUser)
                await newUser.save()
                const code = randomString.generate({length: 4, charset: 'alphabetic'});

                //sending confirmation code
                await userService.createCode(newUser.email, code)
                await userService.sendCode(newUser.email, code)

                return newUser
            } catch (e) {
                throw e
            }
        },
        login: async (_, args) => {
            const {email, password} = args
            const user = await UserModel.findOne({email: email})
            if (!user) throw new AuthenticationError("User with this email doesnt exists")

            const isPassEquals = await bcrypt.compare(password, user.password)

            if (isPassEquals) {
                user.token = getToken(user)
                await user.save()

                return user
            } else {
                throw new AuthenticationError("Wrong Password or email!")
            }
        },
    }
};

module.exports = {
    userResolvers,
}
