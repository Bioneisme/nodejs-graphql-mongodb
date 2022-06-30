const { gql } = require("apollo-server-express");

const userType = gql`
  type User {
    email: String!
    password: String!
    token: String
    confirmed: String
    image: String
  }
  
  type Code{
    email:String
    code:String!
  }
`

const mcqType= gql`
  type Test{
    title:String!
    createdAt:String!
    image:String
  }
  
  type Question{
      description:String!
      test_id:String!
      type:String!
      order:Int!
    }
`

module.exports = {
  userType,
  mcqType
};
