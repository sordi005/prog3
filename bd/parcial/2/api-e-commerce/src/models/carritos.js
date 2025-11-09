import mongoose from "mongoose";

const carritoSchema = mongoose.Schema({
    userId :{type:mongoose.Schema.Types.ObjectId, ref:'usuario', require:true},
    productos:[{
        productoId:{type:mongoose.Schema.Types.ObjectId, ref:'producto', require:true},
        cantidad:{type:Number, require:true, min:1, default:1},
    }]
})

export const Carrito = mongoose.model('carrito', carritoSchema)