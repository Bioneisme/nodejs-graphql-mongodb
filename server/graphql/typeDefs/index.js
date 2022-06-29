const { query } = require("./query");
const { userType,codeType,testType, questionType,fileType} = require("./types");

const typeDefs = [query, userType,codeType,testType,questionType,fileType];

module.exports = {
  typeDefs
};
