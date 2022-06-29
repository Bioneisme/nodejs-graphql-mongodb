const {ApolloServer} = require('apollo-server')
const {typeDefs} = require("./graphql/typeDefs")
const {resolvers} = require("./graphql/resolvers")
const {getPayload} = require('./utils/jwt')
const mongoose = require('mongoose')
require('dotenv').config()

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: async ({req}) => {
        const token = req.headers.authorization || '';
        const {user, loggedIn} = await getPayload(token);
        return {user, loggedIn};
    },
});

server.listen().then(({url}) => {
    mongoose.connect(process.env.DB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    console.log(url);
});
