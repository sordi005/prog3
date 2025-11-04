import mongoose from "mongoose";

const carritoSchema = mongoose.Schema({
    userId :{type:mongoose.Schema.Types.ObjectId, ref:'usuario', require:true},
    productos:{type:Array[Object], default:[]}
},
{
    timestamps:true
})

export const Carrito = mongoose.model('carrito', carritoSchema)