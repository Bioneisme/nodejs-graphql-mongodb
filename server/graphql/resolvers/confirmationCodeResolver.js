const userService = require('../../service/userService')
const {ValidationError} = require('apollo-server-express');

const codeResolvers = {
    Query: {},
    Mutation: {
        confirmAccount: async (parent, args, context, info) => {
            const {code} = args;
            const result = await userService.checkCode(context.user.email, code);
            if (result) {
                return context.user
            } else {
                return new ValidationError('The code is not match')
            }
        }
    }
}


module.exports = {
    codeResolvers
}