import mongoose from "mongoose";



const userSchema = mongoose.Schema({
    nombre:{type:String, require:true},
    edad:{type:Number, min:0},
    email:String,
    contrasena: {type:String, require:true},
    rol: {type:String, enum:['admin', 'user'], default:'user'}
},
)


export const User = mongoose.model("usuario", userSchema)