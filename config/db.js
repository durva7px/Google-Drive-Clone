const mongoose = require('mongoose')

function connectToDB(){
    mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    ssl: true,
}).then(() => {
    console.log("✅ Connected to MongoDB (Render)");
}).catch((err) => {
    console.error("❌ MongoDB connection error:", err.message);
});

}

module.exports = connectToDB;