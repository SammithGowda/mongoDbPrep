const express =  require("express");
const connectDataBase = require("./connection");
const app = express();
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

app.use('/',async(req,res)=>{
    const db = await connectDataBase();
    const collection = db.collection("user")

    const User = await collection.find({}).project({name:1,}).toArray();
    // console.log(User);
    
    res.status(201).send({mes:"success",user:User})

})

const PORT =3001;

app.listen(PORT,()=>{
    console.log(`App runnig on port ${PORT}`);
    
})