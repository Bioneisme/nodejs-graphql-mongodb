const {Schema, model} = require('mongoose');

const codeSchema = new Schema({
    code:{
        type:String,
        required:true
    },
    user:{
        type:String,
        required:true
    },
    createdAt:{
        type:Date,
        expires:'5m',
        index:true,
        default:Date.now
    }
});
codeSchema.index({'email':1});

module.exports = model('confirmation_codes',codeSchema);