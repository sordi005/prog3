import mongoose from "mongoose";

const reservaSchema = mongoose.Schema({

    descripcion:{type:String, require:true},
    fecha:{type:Date, require:true},
    userId :{type:mongoose.Schema.Types.ObjectId, ref:'usuario', require:true},
    productoId:{type:mongoose.Schema.Types.ObjectId, ref:'producto', require:true},
},)

export const Reserva = mongoose.model('reserva', reservaSchema)