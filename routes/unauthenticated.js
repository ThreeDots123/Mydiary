const express = require("express")
const router = express.Router()
const { PostCredentials, validateCredentials, getSignedIn, getSignedUp } = require("../controllers/unauthenticated")

router.get("/signup", getSignedUp )

router.get("/signin", getSignedIn )

router.post("/signup", PostCredentials )

router.post("/signin", validateCredentials )

module.exports = router