const Station = require("../schema/stationSchema");

const createStation = async(req,res)=>{
    const data = req.body;
    try {

        // const db= getDB()
        // const user = await db.collection("User").insertOne(data)
        const station = await Station.insertMany(data)
        res.status(201).send({mes:"Successfull",data:station})
    } catch (error) {
        console.log(error)
        res.status(505).send("Internal Server Error")
    }
}

const getEvenStation = async(req,res)=>{
    try {
        const station = await Station.find({id:{$mod:[2,0]}},{city:1,id:1,_id:0})
        res.status(200).send({success:true,data:station})
    } catch (error) {
        res.status(505).send({
            success: false,
            message: error
          })
    }
}





module.exports = {createStation,getEvenStation}