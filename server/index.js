const express = require('express')
const {ApolloServer} = require('apollo-server-express')
const {typeDefs} = require("./graphql/typeDefs")
const {resolvers} = require("./graphql/resolvers")
const {getPayload} = require('./utils/jwt')
const mongoose = require('mongoose')
require('dotenv').config()

const app = express();
const PORT = process.env.PORT || 4000

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: async ({req}) => {
        const token = req.headers.authorization || '';
        const {user, loggedIn} = await getPayload(token);
        return {user, loggedIn};
    },
});

server.applyMiddleware({ app, cors: true });

async function start() {
    await mongoose.connect(process.env.DB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })

    app.listen(PORT, () => {
        console.log(process.env.SERVER_URL + '/graphql')
    })
}

start().then()