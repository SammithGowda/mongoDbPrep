
const {MongoClient} = require('mongodb')
const connectionUrl="mongodb+srv://sammithdgowda:Sammith%40123@mongodbprep.kcas8.mongodb.net/?retryWrites=true&w=majority&appName=MongoDbPrep";
const client = new MongoClient(connectionUrl)
async function connectDB() {
    try {
        await client.connect()
        console.log("Connected to MongoDB successfully");
        return client.db();
    } catch (error) {
        console.error("MongoDB connection error:", error);
    }
}
//express
//middleware
//db query
//momgodb all possible query senario based 
//core topic 
//cloud host
module.exports = connectDB