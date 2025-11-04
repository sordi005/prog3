const productoSchema = new mongoose.Schema({
  id: { type: mongoose.Schema.Types.ObjectId, auto: true, autoIncrement: true },
  precio: { type: Number, required: true },
  nombre: { type: String, required: true },
  fechaNacimiento: { type: Date, required: true }
});

const Producto = mongoose.model('Producto', productoSchema);




export { Producto };