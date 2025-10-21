import express from "express";
const app = express();
const PORT = 4000;

// TODO: Agregar un middleware que registre la fecha, el método, la URL.

const logHTTPMethod = (req, res, next) => {
  const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
  console.log(`${new Date().toISOString()} - ${req.method} - ${req.originalUrl} - ${ip}`);
  next();
};

app.use(logHTTPMethod);

const midPersonalizado = (req, res, next) => {
  const { num1, num2 } = req.query;
  if (!num1 || !num2) {
    res.status(400).send("El parametro num1 o num2 esta faltando");
    return;
  }
  const n1 = parseInt(num1);
  const n2 = parseInt(num2);
  if (isNaN(n1) || isNaN(n2)) {
    res.status(400).send("Por Favor, ingrese numeros validos");
  }
  next();
};

// TODO: Crear una ruta principal '/' que devuelva un mensaje de bienvenida.
app.get("/", (req, res) => {
  res.status(200).send("Bienvenido a nuestra primera API rest");
});

// TODO: Crear una ruta con parámetro en la URL, por ejemplo '/saludo/:nombre'.
// Debe devolver un saludo personalizado.

app.get("/saludar/:nombre", (req, res) => {
  const { nombre } = req.params;
  res.status(200).send(Hola, ${nombre});
});

// TODO: Crear una ruta '/suma' que reciba num1 y num2 por query string y devuelva la suma.
// Ejemplo: /suma?num1=10&num2=5

app.get("/suma", midPersonalizado, (req, res) => {
  res.status(400).send(El resultado de la suma es ${n1 + n2});
});

// TODO: Crear una ruta extra, por ejemplo '/fecha', que devuelva la fecha actual.

app.get("/fecha", (req, res) => {
  res.status(200).send(Hoy es ${new Date().toLocaleDateString()});
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(Servidor corriendo en http://localhost:${PORT});
});