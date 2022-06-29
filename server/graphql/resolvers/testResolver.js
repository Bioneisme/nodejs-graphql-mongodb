const TestModel = require('../../models/test-model');
const path = require('path');
const fs = require('fs');


//setting up cloudinary for TEST query to upload the preview image
const upload = require('../../mediaStorage/cloudinary');
const generateOath = require('../../middlewares/file')
const {GraphQLInputObjectType, GraphQLNonNull, GraphQLString} = require("graphql");







const TestResolvers= {
    Query: {
        getTests: async (parent, args, context, info) => {
            const Tests = await TestModel.find().lean();
            return Tests;
        }
    },
    Mutation: {
        addPreview: (root, args) => {

        }
    }
}

module.exports = TestResolvers