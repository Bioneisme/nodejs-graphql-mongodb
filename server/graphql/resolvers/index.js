const {userResolvers} = require('./userResolvers');
const {codeResolvers} = require('./confirmationCodeResolver')
const resolvers = [userResolvers, codeResolvers];

module.exports = {
    resolvers,
};
