const {model,Schema} = require('mongoose');
const questionSchema = new Schema({
    description: {
        type: String,
        required: true,
    },
    test_id: {
        type: Schema.Types.ObjectId,
        ref: "tests"
    },
    type:{
        type:String,
        required:true,
    },
    order:{
        type:Number,
        required:true,
    }
})

module.exports = model('questions',questionSchema);



