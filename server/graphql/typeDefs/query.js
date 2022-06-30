const {gql} = require("apollo-server-express");

const query = gql`
  type Query {
    user: User
    getTests:Test
  }

  type Mutation {
    register(email: String!, password: String!): User
    login(email: String!, password: String!): User
    confirmAccount(code:String!):User
  }
`;

module.exports = {
    query,
};
