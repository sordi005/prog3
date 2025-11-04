import { mongoose } from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/tiendaDeLibros', {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('MongoDB conectado');
  } catch (error) {
    console.error('Error de conexión a MongoDB:', error);
    process.exit(1);
  }
};

const librosSchema = new mongoose.Schema({
  id: { type: mongoose.Schema.Types.ObjectId, auto: true },
  titulo: { type: String, required: true },
  paginas: { type: Number, required: true },
  categorias: { type: [String], required: true }
});


const Libro = mongoose.model('Libro', librosSchema);


const crearProducto = async (precio, nombre, fechaNacimiento) => {
    try {
      const producto = new Producto({ precio, nombre, fechaNacimiento });
      const resultado = await producto.save();
      console.log('Producto creado:', resultado);
    } catch (error) {
      console.error('Error al crear el producto:', error);
    }
}

crearProducto(29.99, 'Cien Años de Soledad', new Date('1967-05-30'));
