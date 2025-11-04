import express from 'express';

const app = express();
const PORT = process.env.PORT || 3001;

// TODO: Agregar un middleware que registre la fecha, el método, la URL y la IP del cliente.
app.use((req, res, next) => {
    const ip = req.ip;
    console.log(`URL: ${req.originalUrl} | Fecha: ${new Date().toISOString()} | IP: ${ip} | Método: ${req.method}`);
    next();
});

// TODO: Crear una ruta principal '/' que devuelva un mensaje de bienvenida.
app.get('/', (req, res) => {
    res.send('¡Bienvenido a mi servidor Express!');
});

// TODO: Crear una ruta con parámetro en la URL, por ejemplo '/saludo/:nombre'.
// Debe devolver un saludo personalizado.
app.get('/saludo/:nombre', (req, res) => {
    try {
        const { nombre } = req.params;
        res.status(200);
        res.send(`Hola, ${nombre} ¿Como estas?`);

    } catch (error) {
        res.status(500).send('Error en el servidor' + error.message);
    }
});


// TODO: Manejar los casos en los que los parámetros sean inválidos o falten.
const manejarBadRequest = (req, res, next) => {
        const { num1, num2 } = req.query;
        if (!num1 || !num2) {
            res.status(400).send('Parametros invalidos');
            return;
        }
        const n1 = parseFloat(num1);
        const n2 = parseFloat(num2);

        if (isNaN(n1) || isNaN(n2)) {
            res.status(400).send('Parametros invalidos');
            return;
        }
        next();
}


// TODO: Crear una ruta '/suma' que reciba num1 y num2 por query string y devuelva la suma.
// Ejemplo: /suma?num1=10&num2=5
app.get('/suma', manejarBadRequest, (req, res) => {
    try {
        const { num1, num2 } = req.query;
        const suma = parseFloat(num1) + parseFloat(num2);
        res.send(`La suma de ${num1} y ${num2} es ${suma}`);
        
    } catch (error) {
        res.status(500).send('Error en el servidor' + error.message);
    }
});



// TODO: Crear una ruta extra, por ejemplo '/fecha', que devuelva la fecha actual.
app.get('/fecha', (req, res) => {
    const fechaActual = new Date();
    res.send(`La fecha y hora actual es: ${fechaActual.toLocaleString('es-AR')}`);
});

app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});