const {model,Schema} = require('mongoose');
const testSchema = new Schema({
    title:{
        required:true,
        type:String,
    },
    image:{
        type:String,
    },
    author_id:{
        type:Schema.Types.ObjectId,
        ref:'users',
    },
    created:{
        type:String,
        required:true,
    }
})

module.exports = model('tests',testSchema);



