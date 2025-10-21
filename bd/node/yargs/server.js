import dotenv from 'dotenv';
dotenv.config();

const PORT = process.env.PORT;
const MODE = process.env.MODE;

console.log(`Servidor corriendo en puerto ${PORT} en modo ${MODE}`);

