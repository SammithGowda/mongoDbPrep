const express =  require("express");
const connectDataBase = require("./connection");
const bodyParser = require("body-parser")
const app = express();
const cors = require("cors")
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
//both are used to parse the incommig data and put it in req.body obj
// app.use(express.json())
// app.use(express.urlencoded({extended:true}))
const createUser = require('./router/userRoute');
const cretaTranscation = require('./router/transcationRoute');
const branch = require("./router/branchRoute")
const accounts = require("./router/accountRoute")
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

const middleWare = (req,res,next) =>{
    console.log(req.headers.authorization.split(" ")[1])
    next()
}
const erroHandler =(err,req,res,next)=>{
    console.log(err)
    res.status(err.status || 500).json({success:false,message:err.message||"Internal Server Error"})
}
app.use("/test",middleWare,(req,res)=>{
    return res.send({message:true,data:"Hey Hi"})
})
app.use('/users',createUser)
app.use('/transcation',cretaTranscation)
app.use('/branch',branch)
app.use('/accounts',accounts)
app.use(erroHandler)
// connectDB()
connectMongoosDb()
const PORT =3001;

app.listen(PORT,()=>{
    console.log(`App runnig on port ${PORT}`);
    
})