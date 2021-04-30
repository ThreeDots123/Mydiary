const UserModel = require("../model/user")
const Jwt = require("jsonwebtoken")
const sendCookie = (user, statusCode, res) => {
    const jwt = user.assignJwt()
    const options = {
        httpOnly : false,
        expires : new Date(Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000)
    }
    return res.cookie("token", jwt, options).redirect("/my.diary.com/")
}

// Method  -  Get
// Route   -  /my.diary.com/Signin
// Access  -  Public

exports.getSignedIn = (req, res) => {
    if(!req.cookies.token){
        return res.render("signin", 
        {style : "signin.css", 
        title : "Sign In"})
    }
    else{
        Jwt.verify(req.cookies.token, process.env.JWTSECRET, async (err, payload) => {
            if(err) {
                return res.render("signin", 
                {style : "signin.css", 
                title : "Sign In"})
            }
            else {
                const { _id } = payload
                const user = await UserModel.findById({_id}).lean()
                if(!user){
                    return res.render("signin", 
                    {style : "signin.css", 
                    title : "Sign In"})
                }
                return res.redirect("/my.diary.com")
            }})
    }
}

// Method  -  Get
// Route   -  /my.diary.com/Signup
// Access  -  Public

exports.getSignedUp = (req, res) => {
    if(!req.cookies.token){
        return res.render("signup", 
        {style : "signup.css", 
        title : "Sign Up"})
    }
    else{
        Jwt.verify(req.cookies.token, process.env.JWTSECRET, async (err, payload) => {
            if(err) {
                return res.render("signup", 
                {style : "signup.css", 
                title : "Sign Up"})
            }
            else {
                const { _id } = payload
                const user = await UserModel.findById({_id}).lean()
                if(!user){
                    return res.render("signup", 
                    {style : "signup.css", 
                    title : "Sign Up"})
                }
                return res.redirect("/my.diary.com")
            }})
    }
}

// Method  -  Post
// Route   -  /my.diary.com/Signup
// Access  -  Public

exports.PostCredentials = async (req, res) => {
    const errors = []
    const {email, password} = req.body
        if(!email.replace(/ /g, "") || !password.replace(/ /g, "")){
            errors.push("Please, Input All Credentials")
        }
    
        if(errors.length > 0){
            return res.render("signup", {errors : errors[0],
                email,
                password,
                style : "signup.css",
                title : "Sign Up"})
        }
        else{
            try{
                const user = await UserModel.create({email, password})
                sendCookie(user, 200, res)
            }
            catch(err){
                return res.render("signup", {errors : err,
                    email,
                    password,
                    style : "signup.css",
                    title : "Sign Up"})
            }
        }
}

// Method  -  Post
// Route   -  /my.diary.com/Signin
// Access  -  Public
exports.validateCredentials = async (req, res) => {
    const errors = []
    const { email, password } = req.body
    if(!email.replace(/ /g, "")){
        errors.push("Invalid Credentials")
    }
    if(!password.replace(/ /g, "")){
        errors.push("Invalid Credentials")
    }

    if(errors.length > 0){
        return res.render("signin", {errors : errors[0],
            email,
            password,
            style : "signin.css",
            title : "Sign In"})
    }
    else{
        try{
            const user = await UserModel.findOne({ email }).select("+password")
            const validate = await user.comparePasswords(password)
            if(!validate){
                errors.push("Invalid Credentials")
                return res.render("signin", {errors : errors[0],
                    email,
                    password,
                    style : "signin.css",
                    title : "Sign In"})
            }
            else{
                sendCookie(user, 200, res)
            }
        }
        catch(err){
            return res.render("signin", {errors : "Invalid Credentials",
                email,
                password,
                style : "signin.css",
                title : "Sign In"})
        }
    }
}