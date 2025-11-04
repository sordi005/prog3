import mongoose from "mongoose";

const libroSchema = new mongoose.Schema({
    titulo: {
        type: String,
        required: true
    },
    paginas:{
        type: Number,
        required: true
    },         
    author_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Autor",
        required: true
    },
    categorias:{
        type: [String],
        required: true
    }
});

export const Libro = mongoose.model("libros", libroSchema);