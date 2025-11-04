import mongoose from "mongoose";
const autorSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },
    fechaNacimiento: {
        type: Date,
        required: true
    }
});

export const Autor = mongoose.model("autores", autorSchema);