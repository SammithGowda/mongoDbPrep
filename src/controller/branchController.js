const mongoose = require("mongoose")

const Branch = require("../schema/branchSchema");

const createBranch = async(req,res)=>{
    const data = req.body;
    try {
        // debugger
        const branch = await Branch.create(data)
        return res.status(201).send({mes:"Successfull",data:branch})
    } catch (error) {
        debugger
        return res.status(505).send("Internal Server Error")
    }
}

const getBranch = async(req,res)=>{
    try {
        const branch = await Branch.find()
        if(branch.length===0){
        res.status(404).send({mes:"No Branch's In DB",data:branch})
        }
        res.status(201).send({mes:"Successfull",data:branch})
    } catch (error) {
        console.log(error)
        res.status(505).send(`Internal Server Error`)
    }
}

const removeBranch = async(req,res)=>{
    const brancId = req.params.branchId
    try {
        const branch = await Branch.findByIdAndDelete({_id:brancId})
        if(branch.length===0){
        res.status(404).send({mes:"No Branch's In DB to delete",data:branch})
        }
        res.status(201).send({mes:"Successfull branch deleted",data:branch})
    } catch (error) {
        console.log(error)
        res.status(505).send(`Internal Server Error`)
    }
}

module.exports = {createBranch,getBranch,removeBranch}

