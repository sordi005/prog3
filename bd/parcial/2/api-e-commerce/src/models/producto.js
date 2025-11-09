import mongoose from "mongoose";
import { Schema } from "mongoose"

const productoSchema = mongoose.Schema({
    nombre:{type:String, require:true},
    descripcion:{type:String, require:true},
    categoriaId:{ type: Schema.Types.ObjectId, ref:'categoria', require:true},
    precio:{type:Number, require:true, min:0},
    stock:{type:Number, require:true, min:0}
})

export const Producto = mongoose.model('producto', productoSchema)

