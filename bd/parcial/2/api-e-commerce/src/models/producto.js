import mongoose from "mongoose";

import { Schema } from "mongoose"

const resenaSchema = new Schema({
    usuarioId: {type: Schema.Types.ObjectId, ref: 'User', required: true},
    comentario: {type: String,  required: true,minlength: 5, maxlength: 500},
    puntuacion: {type: Number, required: true, min: 1, max: 5},
    fecha: {
        type: Date,
        default: Date.now
    }
}, { _id: false })

const productoSchema = mongoose.Schema({
    nombre:{type:String, require:true},
    descripcion:{type:String, require:true},
    categoriaId:{ type: Schema.Types.ObjectId, ref:'categoria', require:true},
    precio:{type:Number, require:true, min:0},
    stock:{type:Number, require:true, min:0},
    resenas:[resenaSchema]
})

export const Producto = mongoose.model('producto', productoSchema)

