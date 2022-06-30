const {query} = require("./query");
const {userType, mcqType} = require("./types");

const typeDefs = [query, userType, mcqType];

module.exports = {
    typeDefs
};
