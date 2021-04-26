const express = require("express")
const app = express()
const path = require("path")
const unauthenticated = require("../routes/unauthenticated")
const authenticated = require("../routes/authenticated")
const exphbs = require("express-handlebars")
const connect = require("../startDb")
const cookie_parser = require("cookie-parser")
const flash_msg = require("connect-flash")
const express_session = require("express-session")
const methodOverride = require("method-override")

// make public folder static
app.use(express.static(path.join(__dirname, "public")))

// Load env files..
require("dotenv").config( {path : "./config/config.env"} )

// Add Parser for json and urlencoded files
app.use(express.json())
app.use(express.urlencoded({extended : true}))

// Setup express session
app.use(express_session({
    resave : true,
    secret : "Secret",
    saveUninitialized : true
}))

// use method override
app.use(methodOverride("_request"))

// use Connect_flash
app.use(flash_msg())

// Setup Flash_Msg Variables
app.use((req, res, next) => {
    res.locals.success_msg = req.flash("success_msg")
    res.locals.error_msg = req.flash("error_msg")
    next()
})

// Initialize Cookie Parser
app.use(cookie_parser())

// connect Mongoose
connect().then(() => console.log("connected")).catch((err) => console.log(err))

// setup express handlebars
app.engine("handlebars", exphbs())
app.set("view engine", "handlebars")


// router for unauthenticated routes
app.use("/my.diary.com", unauthenticated)

// for authenticated routes
app.use("/my.diary.com", authenticated)

const port = process.env.PORT
app.listen(port, () => console.log(`Connected at ${port}`))