const Jwt = require("jsonwebtoken")
const UserModel = require("../model/user")

module.exports = (req, res, next) => {
    const { token } = req.cookies
    try {
        if(!token){
            throw Error("No User Found")
        }
        Jwt.verify(token, process.env.JWTSECRET, async (err, payload) => {
            if(err) {
                return res.redirect("/my.diary.com/signin")
            }
            else {
                const { _id } = payload
                const user = await UserModel.findById({_id}).lean()
                if(!user){
                    const options = {
                        httpOnly : false,
                        expires : new Date(Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000)
                    }
                    return res.cookie("token", "", options).redirect("/my.diary.com/signin")
                }
                req.user = user
                return next() 
            }
        })
    }
    catch (err){
        return res.redirect("/my.diary.com/signin")
    }
}