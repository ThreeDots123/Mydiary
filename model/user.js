const mongoose = require("mongoose")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const UserSchema = new mongoose.Schema({
    email : {
        type : String,
        unique : [true, "Email Already Exits In Database"],
        required : [true, "Please Add An Email"],
        match : [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/]
    },
    password : {
        type : String,
        required : [true, "Please Add A Password"],
        select : false
    }
})

UserSchema.pre("save", async function(next){
    if(!this.isModified){
        next()
    }

    try{
        const salt = await bcrypt.genSalt(10)
        this.password = await bcrypt.hash(this.password, salt)
        next()
    }
    catch(err){
        next(err)
    }
})

UserSchema.methods.assignJwt = function(){
    return jwt.sign({ _id : this._id }, process.env.JWTSECRET)
}

UserSchema.methods.comparePasswords = async function(userPassword){
    return await bcrypt.compare(userPassword, this.password) 
}

module.exports = mongoose.model("User", UserSchema)