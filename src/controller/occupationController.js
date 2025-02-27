const Occupation = require("../schema/occuoationSchema");

const createOccupation = async(req,res)=>{
    const data =[
        { name: "Samantha", occupation: "Doctor" },
        { name: "Meera", occupation: "Singer" },
        { name: "Julia", occupation: "Actor" },
        { name: "Ketty", occupation: "Professor" },
        { name: "Jane", occupation: "Actor" },
        { name: "Jenny", occupation: "Doctor" },
        { name: "Christeen", occupation: "Professor" },
        { name: "Priya", occupation: "Singer" },
        { name: "Ashely", occupation: "Professor" },
        { name: "Maria", occupation: "Actor" },
      ];
    try {

        // const db= getDB()
        // const user = await db.collection("User").insertOne(data)
        const occ = await Occupation.insertMany(data)
        res.status(201).send({mes:"Successfull",data:occ})
    } catch (error) {
        console.log(error)
        res.status(505).send("Internal Server Error")
    }
}

const getOccupation = async(req,res)=>{
    try {
        // const user = await Occupation.find({},{name:1,occupation:1,_id:0}).sort({name:1})
        const user = await Occupation.aggregate([
            {$project:{name:1,occupation:1,_id:0}},
            {$sort:{name:1}}
        ])
        res.status(200).send({success:"Success",data:user})
    } catch (error) {
        res.status(505).send({
            success: false,
            message: error
          })
    }
}





module.exports = {createOccupation,getOccupation}