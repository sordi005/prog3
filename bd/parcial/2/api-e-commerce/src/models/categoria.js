import mongoose from "mongoose";

const categoriaSchema = mongoose.Schema({
    nombre:{type:String, require:true},
    descripcion:{type:String, require:true},
},
{
    timestamps:true
})

export const Categoria = mongoose.model('categoria', categoriaSchema)