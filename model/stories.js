const mongoose = require("mongoose")

const storiesSchema = new mongoose.Schema({
    title : {
        type : String,
        required : [true, "Please, Input A Title"]
    },
    body : {
        type : String,
        minLength : [200, "Characters Should Not Be Less Than 200 Characters"]
    },
    date : {
        type : Date,
        required : true
    },
    storyID : {
        type : mongoose.Schema.ObjectId,
        ref : "User",
        required : true,
        select : false
    }
}, {
    toObject : {virtuals : true},
    toJSON : { virtuals : true }
})

module.exports = mongoose.model("Stories", storiesSchema)