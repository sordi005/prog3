const pedidoSchema = mongoose.Schema({
    fecha:{type:Date, default:Date.now},
    estado:{type:String, enum:['pendiente', 'enviado', 'entregado', 'cancelado'], default:'pendiente'},
    total:{type:Number, require:true},
    metodoPago:{type:String, enum:['tarjeta credito', 'tarjeta debito', 'efectivo', 'transferencia'], default:'efectivo'},
    itemsCompra:{type:Array[Object], default:[]},
    userId :{type:mongoose.Schema.Types.ObjectId, ref:'User', require:true}},
)

export const Pedido = mongoose.model('pedido', pedidoSchema)