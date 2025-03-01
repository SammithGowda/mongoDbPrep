const express =  require("express");
const connectDataBase = require("./connection");
const bodyParser = require("body-parser")
const app = express();
const cors = require("cors")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const {redisClient,requestLimit,cachedData} = require("./redis")
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
const todo = require("./router/todoRouter")
const station = require("./router/stationRoute")
const {connectMongoosDb} = require("./connection");

// app.use("/create",async(req,res)=>{
//     const db = await connectDataBase();
//     const collection = db.collection("user")
//     const userData = {name:"sammith",age:20}
//     const result = await collection.insertOne(userData)

//     res.status(201).send({mes:"created",user:result})
// })

const middleWare = (req,res,next) =>{
    console.log(req.headers.authorization.split(" ")[1])
    next()
}
const erroHandler =(err,req,res,next)=>{
    console.log(err)
    res.status(err.status || 500).json({success:false,message:err.message||"Internal Server Error"})
}

const rbacMiddleware = (allowedRoles) =>{
    return(req,res,next)=>{
        const role = req.user.role
        if(!allowedRoles.includes(role)){
            return res.status(403).json({message:"Access denied. Insufficient permissions."})
        }
        next();
    }
}

app.use("/todo",todo)
app.use('/users',createUser)
app.use('/transcation',cretaTranscation)
app.use('/branch',rbacMiddleware(["admin"]),branch)
app.use('/accounts',accounts)
app.use('/station',station)
app.use(erroHandler)
// connectDB()
connectMongoosDb()
const PORT =3001;
const users =[] //mock DB

app.post('/signup',async(req,res)=>{
    const {userName,email,password,role} = req.body
    if(!userName||!email||!password||!role)  return res.status(400).json({ msg: "All fields required" });
    if(!["user","admin"].includes(role)) return res.status(400).json({ msg: "Invaild role " });
    const hasPass =  await bcrypt.hash(password,10)
    users.push({userName,email,password:hasPass,role})
    return res.status(201).json({message:"signup done",data:users})
})

app.get("/login",async(req,res)=>{
    const {userName,password} = req.body
    if(!userName||!password)  return res.status(400).json({ msg: "All fields required" });
    
    const user = users.find(u=>u.userName===userName)
    if(!user) return res.status(404).json({ msg: "User Not found !" });
    const match  = await bcrypt.compare(password,user.password)
    if(!match) return res.status(404).json({ msg: "Wrong Credentials" });
    const token = jwt.sign({username:user.userName,role:user.role},"sammith",{expiresIn:"1h"})
    return res.status(201).json({token:token})
})

const authenticateToken = async(req,res,next)=>{
    const token = req.headers["authorization"]?.split(" ")[1]
    if(!token) return res.status(404).json({ msg: "Not Authorized Access denied"  });
    
    jwt.verify(token,"sammith",(err,user)=>{
        if(err)  return res.status(403).json({ msg: "Invalid or expired token"  });
        req.user = user
        next()
    })
}

const authorised =(...roleBased) =>{
    return(req,res,next)=>{
        if(!roleBased.includes(req?.user?.role)){
            return res.status(403).json({message:"Access denied: insufficient role"})
        }
        next()
    }
}



app.get('/dashboard',authenticateToken,(req,res)=>{
    return res.status(201).json({message:"helo this the dashboard"})
})
app.get('/admin',authenticateToken,authorised("admin"),(req,res)=>{
    console.log(req.body)
    console.log(req.user)
    return res.status(201).json({message:"helo this the admin"})    
})

app.get('/user',authenticateToken,authorised('admin',"user"),requestLimit(30,4),cachedData,async(req,res)=>{

        let data = {name:"samm",age:20}

        await redisClient.setEx("cachedData",60,JSON.stringify(data))
        
    return res.status(201).json({message:"hello this the user",source:`db you have ${req.attempt} left`})
})



redisClient
  .connect()
  .then(() => console.log("Connected to Redis"))
  .catch((err) => {
    console.error(" Redis connection error:", err);
    process.exit(1); // Exit the app if Redis fails
  });
app.listen(PORT,()=>{
    console.log(`App runnig on port ${PORT}`);
})