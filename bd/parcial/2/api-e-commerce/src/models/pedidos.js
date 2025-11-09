import mongoose from "mongoose";

const pedidoSchema = mongoose.Schema({
    fecha: { type: Date, default: Date.now },
    estado: { type: String, enum: ['pendiente', 'pagado', 'enviado', 'entregado', 'cancelado'], default: 'pendiente' },
    total: { type: Number, required: true },
    subtotal: { type: Number, required: true },
    metodoPago: { type: String, enum: ['tarjeta credito', 'tarjeta debito', 'efectivo', 'transferencia'], required: true },
    itemsCompra: [{
        productoId: { type: mongoose.Schema.Types.ObjectId, ref: 'producto', required: true },
        nombre: { type: String, required: true },
        precio: { type: Number, required: true },
        cantidad: { type: Number, required: true },
        subtotal: { type: Number, required: true }
    }],
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'usuario', required: true }
}, {
    timestamps: true
});

export const Pedido = mongoose.model('pedido', pedidoSchema);