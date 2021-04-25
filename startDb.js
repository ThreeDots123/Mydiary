const mongoose = require("mongoose")

async function connect(){
    await mongoose.connect(process.env.MONGO, {
        useCreateIndex : true,
        useUnifiedTopology : true,
        useFindAndModify : false,
        useNewUrlParser : true
    })
}

module.exports = connect