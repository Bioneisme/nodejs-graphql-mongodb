const { gql } = require("apollo-server");

const query = gql`
  type Query {
    user: User
    getTests:Test
  }

  type Mutation {
    register(email: String!, password: String!): User
    login(email: String!, password: String!): User
    confirmAccount(code:String!):User
    uploadFile(fileSaveName : String) : fileMetadata
  }
`;

module.exports = {
  query,
};
