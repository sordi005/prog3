const express = require('express');
const app = express();
const PORT = 3000;

    // Middleware global: contar cantidad de peticiones
    // TODO: Crear un middleware "contarPeticiones" que escuche todas las peticiuones y vaya sumando 1 al contador
let contador = 0;

app.use((req, res, next) => {
  contador++;
  console.log(`Cantidad de peticiones: ${contador}`);
  next();
});
// Middleware local (a completar por el alumno)
// TODO: Crear un middleware "validarEdad" que lea req.query.edad
// y verifique que sea un número mayor o igual a 18.
// Si no cumple, responder con status 400 y mensaje "Acceso denegado".
app.use('/edad', (req, res, next) => {
    const edad = req.query.edad;
    if (!edad || isNaN(edad) || edad < 18) {
        return res.status(400).send('Acceso denegado');
    }
    next();
});

// TODO: Ruta principal '/'
app.get('/', (req, res) => {
  res.send('Bienvenido a la API del TP N°2');
});

// TODO: Crear una ruta '/edad' que use el middleware "validarEdad"
// y devuelva "Acceso permitido" si la edad es válida.
app.get('/edad', (req, res) => {
    res.send('Acceso permitido');
});


// TODO: Crear una ruta '/producto/:id' que reciba un id numérico.
// Si el id no es un número, devolver error 400.
// Si es válido, devolver un mensaje con el id.
app.get('/producto/:id', (req, res) => {
    try {
        const id = parseInt(req.params.id);
        if (isNaN(id)) {
            return res.status(400).send('ID inválido');
        }
        res.send(`ID del producto: ${id}`);
    } catch (error) {
        res.status(500).send('Error del servidor');
    }
});

// TODO: Crear una ruta '/promedio' que reciba tres notas por query (n1, n2, n3)
// y devuelva el promedio.
// Si falta alguna nota o no son números, devolver error 400.

app.get('/promedio', (req, res) => {
    const n1 = parseFloat(req.query.n1);
    const n2 = parseFloat(req.query.n2);
    const n3 = parseFloat(req.query.n3);
    if (isNaN(n1) || isNaN(n2) || isNaN(n3)) {
        return res.status(400).send('Parámetros invalidos');
    }
    const promedio = (n1 + n2 + n3) / 3;
    res.send(`El promedio es: ${promedio}`);
})


// TODO: Crear una ruta '/hora' que devuelva la hora actual del servidor.

app.get('/hora', (req, res) => {
    const horaActual = new Date();
    res.send(`Hora Actual: ${horaActual.toLocaleTimeString('es-AR')}`);
});


// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
