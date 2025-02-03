
const {MongoClient} = require('mongodb')
const connectionUrl="mongodb+srv://sammithdgowda:Sammith%40123@mongodbprep.kcas8.mongodb.net/?retryWrites=true&w=majority&appName=MongoDbPrep";
const client = new MongoClient(connectionUrl)
let db
async function connectDB() {
    try {
        console.log("trying to connect...")
        await client.connect()
        console.log("Connected to MongoDB successfully");
        db=client.db("MongoDbPrep")
        return db;
    } catch (error) {
        console.error("MongoDB connection error:", error);
    }
}
function getDB() {
    if (!db) {
        throw new Error("Database not connected. Call connectDB() first.");
    }
    return db;
}
//express
//middleware
//db query
//momgodb all possible query senario based 
//core topic 
//cloud host
module.exports = {connectDB,getDB}