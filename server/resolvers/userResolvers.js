const bcrypt = require('bcrypt')
const {getToken} = require('../utils/jwt')
const UserModel = require('../models/user-model')

const {AuthenticationError} = require('apollo-server');

const userResolvers = {
    Query: {
        user: (parent, args, context, info) => {
            console.log(context)
            if (context.loggedIn) {
                return context.user
            } else {
                throw new AuthenticationError("Please Login Again!")
            }
        }
    },
    Mutation: {
        register: async (parent, args, context, info) => {
            const {username, password} = args
            const hashPassword = bcrypt.hash(password, 10)

            const user = await UserModel.findOne({username: username})
            if (user) {
                throw new AuthenticationError("User Already Exists!")
            }
            try {
                const newUser = await UserModel.create({
                    username,
                    password: hashPassword
                })
                newUser.token = getToken(user)
                await newUser.save()

                return newUser
            }
             catch (e) {
                throw e
            }
        },
        login: async (parent, args, context, info) => {
            const {username, password} = args
            const user = await UserModel.findOne({username: username})
            if (!user) throw new AuthenticationError("User with this email doesnt exists")

            const isPassEquals = await bcrypt.compare(password, user.password)

            if (isPassEquals) {
                user.token = getToken(user)
                await user.save()

                return user
            } else {
                throw new AuthenticationError("Wrong Password or Username!")
            }
        },
    }
};

module.exports = {
    userResolvers,
}
