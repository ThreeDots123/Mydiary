const Stories = require("../model/stories")

module.exports = async (req, res, next) => {
    const {id} = req.params
    const validate = await Stories.findOne({_id : id}).select("+storyID")
    if(!validate){
        return res.send("Story Doesn't Exist.. (Probably Deleted)")
    }
    if(String(req.user._id) == String(validate.storyID)){
        return next()
    }
    else{
        return res.send("Unauthorized Access")
    }
}