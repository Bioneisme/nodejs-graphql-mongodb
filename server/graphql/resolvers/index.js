const { userResolvers } = require('./userResolvers');
const {codeResolvers} = require('./confirmationCodeResolver')
const TestResolvers = require('./testResolver')
const resolvers = [userResolvers,codeResolvers,TestResolvers];

module.exports = {
  resolvers,
};
