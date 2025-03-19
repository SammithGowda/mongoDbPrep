const mongoose = require("mongoose")


// const city = new mongoose.Schema({
//     name:{type:String},
//     location:{
//         type:{
//             type:String,enum:["Point","Polygon"],required:true
//         },
//         coordinate:{
//             type:Array,
//             required:true,
//         }
//     },
// });

const city = new mongoose.Schema({
    name:{type:String,required:true},
    location:{
        type:{
            type:String,enum:["Point", "MultiPoint", "Polygon", "GeometryCollection"],required:true
        },
        coordinate:{
            type:Array,
            required:function (params) {
                return this.type !== "Geometrycollection"
            },
        }
    },
    geometrie:{
        type:[
            {
                type:{type:String,enum:["Point","Polygon","MultiPoint"],required:true},
                coordinate:{type:Array,required:true}
            }
        ],
        required:function (params) {
            return this.type=="Geometrycollection";
        }
    }
  
});

// let dataone={
//     name:"someplace",
//     location:{type:"Point",coordinate:[41.25,45.55]},
//     }
//     let datatwo={
//         name:"someplace",
//         location:{type:"Polygon",coordinate:[41.25,45.55]},
//         }
// let data={
// name:"someplace",
// location:{type:"Geometrycollection",geometries:[{type:"Point",coordinate:[12.231,525.26]},{}]},
// }

module.exports = mongoose.model("City",city)