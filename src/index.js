const express =  require("express");
const connectDataBase = require("./connection");
const bodyParser = require("body-parser")
const app = express();

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
//both are used to parse the incommig data and put it in req.body obj
// app.use(express.json())
// app.use(express.urlencoded({extended:true}))
const createUser = require('./router/userRoute');
const cretaTranscation = require('./router/transcationRoute');
const branch = require("./router/branchRoute")
const {connectDB,connectMongoosDb} = require("./connection");
const metaData =[
    {name:"sammith",age:20,cast:"Hindu"},
    {name:"Ram",age:50,cast:"Hindu"},
    {name:"Jhon",age:20,cast:"Christian"},
    {name:"Abdul",age:20,cast:"Muslim"},
    {name:"Jeeva",age:20,cast:"Hindu"},
    {name:"Roopa",age:20,cast:"Hindu"},
    {name:"Madan",age:20,cast:"Hindu"},
]
app.use("/create",async(req,res)=>{
    const db = await connectDataBase();
    const collection = db.collection("user")
    const userData = {name:"sammith",age:20}
    const result = await collection.insertOne(userData)

    res.status(201).send({mes:"created",user:result})
})

app.use('/users',createUser)
app.use('/transcation',cretaTranscation)
app.use('/branch',branch)

// connectDB()
connectMongoosDb()
const PORT =3001;

app.listen(PORT,()=>{
    console.log(`App runnig on port ${PORT}`);
    
})