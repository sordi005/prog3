import mongoose from "mongoose";

const resenaSchema = mongoose.Schema({
    usuarioId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'usuario', 
        required: true 
    },
    productoId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'producto', 
        required: true 
    },
    comentario: { 
        type: String, 
        required: true,
        minlength: 5, 
        maxlength: 500 
    },
    calificacion: { 
        type: Number, 
        required: true, 
        min: 1, 
        max: 5 
    },
    fecha: { 
        type: Date, 
        default: Date.now 
    }
}, {
    timestamps: true
});

export const Resena = mongoose.model('resena', resenaSchema);
