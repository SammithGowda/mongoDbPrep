const Todo = require("../schema/testSchema")
const createTodo = async(req,res)=>{
    const dataTodo = req.body;
    try {
        const data = await Todo.create(dataTodo)
        return res.status(201).send({success:true,message:data})
        
    } catch (error) {
        console.log(error)
        return res.status(501).send({success:false,message:"Internal Server error",error})
    }
}
const deleteTodo = async(req,res)=>{
    const id = req.params.id;
    console.log(id);
    
    try {
        const data = await Todo.findOneAndDelete(id)
        return res.status(201).send({success:true,message:data})
        
    } catch (error) {
        console.log(error)
        return res.status(501).send({success:false,message:"Internal Server error",error})
    }
}
const getTodo = async(req,res)=>{
    const id = req.params;
    console.log(id);
    
    try {
        const data = await Todo.find()
        return res.status(201).send({success:true,message:data})
        
    } catch (error) {
        console.log(error)
        return res.status(501).send({success:false,message:"Internal Server error",error})
    }
}

const updateTodo = async(req,res)=>{
    const id = req.params.id;
    const updateData = req.body
    console.log(id);
    
    try {
        const data = await Todo.findOneAndUpdate({_id:id},updateData,{new:true})
        return res.status(201).send({success:true,message:data})
        
    } catch (error) {
        console.log(error)
        return res.status(501).send({success:false,message:"Internal Server error",error})
    }
}
module.exports={createTodo,deleteTodo,getTodo,updateTodo}