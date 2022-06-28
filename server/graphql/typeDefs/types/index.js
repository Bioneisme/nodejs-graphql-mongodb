const { gql } = require("apollo-server");

const userType = gql`
  type User {
    email: String!
    password: String!
    token: String
  }
`

module.exports = {
  userType
};
