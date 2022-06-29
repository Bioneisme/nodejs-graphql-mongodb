const { gql } = require("apollo-server");

const userType = gql`
  type User {
    email: String!
    password: String!
    token: String
  }
`
const codeType=gql`
  type Code{
    email:String
    code:String!
  }`

const testType= gql`
  type Test{
    title:String!
    createdAt:String!
    image:String
  }`
const questionType=gql`
    type Question{
      description:String!
      test_id:String!
      type:String!
      order:Int!
    }
`


//this is the type for all files
const fileType = gql`
  type fileMetadata {
    originalname : String
    mimetype : String
    encoding : String
    destination : String
    filename : String
    path : String
    size : Int
  }
`

module.exports = {

  userType,
  codeType,
  testType,
  questionType,
  fileType
};
