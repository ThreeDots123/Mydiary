const Stories = require("../model/stories")

// Method  -  Get
// Route   -  /my.diary.com/
// Access  -  Private

exports.showStories = async (req, res) => {
    const stories = await Stories.find({storyID : req.user._id}).sort({date : -1}).lean()
    stories.forEach(item => {
        const date = new Date(item.date)
        const newDate = new Intl.DateTimeFormat("en-US", {
            weekday : "long",
            year : "numeric",
            month : "long",
            day : "numeric"
        }).format(date)
        item.date = newDate
    })

    return res.render("homepage", {
        style : "homepage.css",
        title : "My Story",
        js : "homepage.js",
        stories
    })
}

// Method  -  Get
// Route   -  /my.diary.com/stories/compose
// Access  -  Private

exports.showCompose = (req, res) => {
    return res.render("compose", {
        style : "compose.css",
        title : "Create Story",
        js : "compose.js"
    })
}


// Method  -  Post
// Route   -  /my.diary.com/stories/compose/myStory
// Access  -  Private

exports.createStory = async (req, res) => {
    let {title, body} = req.body
    if(!title.replace(/ /g, "")){
        title = "No Title"
    }
    if(!title || !body) {
        return res.render("compose", {
            style : "compose.css",
            title : "Create Story",
            error : "Input All Fields",
            js : "compose.js",
            body,
            title
        })
    }
    if(body.length < 200) {
        return res.render("compose", {
            style : "compose.css",
            title : "Create Story",
            error : "Post Should Be Greater Than 200 Characters...",
            js : "compose.js",
            body,
            title
        })
    }
    else{
        await Stories.create({date : new Date,
        title,
        body,
        storyID : req.user._id})

        req.flash("success_msg", "Story Added")
        return res.redirect("/my.diary.com/")
    }
}

// Method  -  Get
// Route   -  /my.diary.com/stories/compose/expandedSection:id
// Access  -  Private

exports.readMore = async (req, res) => {
    const {id} = req.params
    const story = await Stories.findById({_id : id}).lean()
    res.render("expanded-section", {
        style : "expanded-section.css",
        title : "My Story",
        js : "expanded-section.js" ,
        story
    })
}

// Method  -  Get
// Route   -  /my.diary.com/stories/compose/editSection:id
// Access  -  Private

exports.edit = async (req, res) => {
    const {id} = req.params
    const story = await Stories.findById({_id : id}).lean()
    res.render("edit-story", {
        style : "compose.css",
        title : "Edit Story",
        js : "compose.js",
        story,
    })
}

// Method  -  Put
// Route   -  /my.diary.com/stories/compose/editSection:id
// Access  -  Private

exports.editStory = async (req, res) => {
    let {title, body} = req.body
    if(!title.replace(/ /g, "")){
        title = "No Title"
    }
    const {id} = req.params
    let story = await Stories.findOne({_id : id})
    story.title = title
    story.body = body
    story = story.save()
    req.flash("success_msg", "Story Edited Successfully")
    res.redirect("/my.diary.com/")
}

// Method  -  Get
// Route   -  /my.diary.com/logout
// Access  -  Private

exports.logout = async (req, res) => {
    console.log("welcome")
    const options = {
        httpOnly : false,
        expires : new Date(Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000)
    }
    return res.cookie("token", "", options).redirect("/my.diary.com/signin")
}

exports.deleteIcon = async (req, res) => {
    const { id } = req.params
    const deletedItem = await Stories.deleteOne({_id : id})
    req.flash("success_msg", "Story Deleted Successfully")
    return res.redirect("/my.diary.com/")
}