const mongoose = require('mongoose')

function connectToDB(){
    mongoose.connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }).then(() => {
        console.log("Connected to Cloud")
    })
}

module.exports = connectToDB;