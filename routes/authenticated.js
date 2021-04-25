const express = require("express")
const router = express.Router()
const {decryptToken, encryptToken} = require("../handlingJWT")
const { showCompose, showStories, createStory, readMore, edit, editStory, logout, deleteIcon } = require("../controllers/authenticated")
const authorization = require("../authorization/authorization")
const authStory = require("../authorization/authstory")

router.use(authorization)

router.get("/", showStories )

router.get("/stories/compose", showCompose)

router.get("/stories/compose/expandedSection:id", authStory,readMore)

router.route("/stories/compose/editSection:id").get(authStory, edit).put(authStory, editStory)

router.post("/stories/compose/myStory", createStory)

router.delete("/stories/delete:id", authStory, deleteIcon )

router.get("/logout", logout)

module.exports = router