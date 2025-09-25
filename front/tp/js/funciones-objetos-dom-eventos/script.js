
console.log(" 1) ===================== Funciones declarativas y expresadas =====================");
console.log("Funciones declarativas");

function cuadrado(num) {
    return num * num;
}

console.log("pasamos 5 nos devuelve " + cuadrado(5)); // 25

console.log("Funciones expresadas");

const cubo = function(num) {
    return num * num * num;
}

console.log("pasamos 3 nos devuelve " + cubo(3)); // 27

console.log("Funciones declarativas : Son elevadas (hoisting) y pueden ser llamadas antes de su declaracion");
console.log("Funciones expresadas : Pueden ser anonimas, no son elevadas y no pueden ser llamadas antes de su declaracion");

console.log(" 2) ===================== Arrow Functions y parámetros por defecto =====================");
console.log("Arrow Functions");

console.log("Imprimir nombre y edad")

const imprimir = (nombre, edad = 18) => {
    console.log("Nombre: " + nombre + ", Edad: " + edad);
}

console.log("Con edad"); // Edad 25
imprimir("Ana", 25)
console.log("Sin edad"); // Edad por defecto 18
imprimir("Luis")

console.log(" 3) ===================== Objetos con propiedades y métodos  =====================");

let persona = {
    nombre: "Carlos",
    edad: 30,
    saludar: function() {
        console.log("Hola, mi nombre es " + this.nombre + " y tengo " + this.edad + " años.");
    }
};

persona.saludar();

console.log(    "Proopiedades: Variables que almacenan el estado del objeto")
console.log(    "Métodos: Funciones que definen las acciones que puede realizar el objeto")

console.log(" 4) ===================== Desestructuración ======================");
let {edad} = persona;
let {nombre} = persona;

console.log("Edad: " + edad); 
console.log("Nombre: " + nombre); 

console.log("La desestructuración permite extraer valores de objetos o arrays y asignarlos a variables de forma más sencilla ya que evita la necesidad de acceder a cada propiedad de forma individual.");

console.log(" 5) ===================== Operador Spread ======================");

let arr1 = [1, 2, 3];
let arr2 = [4, 5, 6];

let arr3 = [...arr1, ...arr2];
console.log("Array combinado: " + arr3);

function sumar(...numeros) {
    return numeros.reduce((a, b) => a + b, 0);
}

console.log("Suma de 1,2,3,4 con rest: " + sumar(1, 2, 3, 4));

console.log("El operador spread Expande elementos de arrays/objetos");
console.log("El operador rest se utiliza para agrupar múltiples elementos en un solo array.");

console.log(" 6) ===================== Manipulación del DOM ======================");

let titulo = document.getElementById("titulo");
titulo.textContent = "Título modificado desde JavaScript";

let lista = document.getElementById("lista");

let nuevoElemento = document.createElement("li");
nuevoElemento.textContent = "Elemento 4 desde JS";

lista.appendChild(nuevoElemento);

console.log("Agrego clase CSS al título");
titulo.classList.add("resaltado");

console.log("Agrégo y elimino clase CSS al título");
titulo.classList.toggle("resaltadoToggle");

console.log("El estado de la clase 'resaltado' es: " + titulo.classList.contains("resaltado"));

let input = document.createElement("input");
input.type = "text";
input.placeholder = "Escribe algo";
input.classList.add("inputClase");
input.id = "miInput";

document.body.appendChild(input);


let button = document.createElement("button");
button.id = "miBoton";
button.textContent = "Agregar a la lista";
button.classList.add("buttonClase");

document.body.appendChild(button);

button.addEventListener("click", () => {
    if(input.value.trim() !== "") {
        let nuevoElementoLista = document.createElement("li");
        nuevoElementoLista.textContent = input.value;
        lista.appendChild(nuevoElementoLista);
        input.value = "";
    }
});

console.log("Utilizo el evento click para agregar elementos a la lista desde el input");

console.log(" 7) =====================  Evento submit y preventDefault  ======================");

let form = document.createElement("form");
form.id = "miFormulario";
form.classList.add("formClase");

let inputForm = document.createElement("input");
inputForm.type = "text";
inputForm.placeholder = "Mensaje Alerta";

let submitButton = document.createElement("button");
submitButton.type = "submit";
submitButton.textContent = "Enviar";

form.appendChild(inputForm);
form.appendChild(submitButton);
document.body.appendChild(form);

// Manejar el evento del formulario 
form.addEventListener("submit", (e) => {
    e.preventDefault();
    if(inputForm.value.trim() !== "") {
        alert(inputForm.value);
        inputForm.value = "";
    } else {
        alert("Formulario Vacio");
    }
});

console.log("Se utiliza preventDefault para evitar el comportamiento por defecto del formulario que es recargar la página al enviarlo.");

console.log(" 8) ===================== Eventos input, change y keydown =====================");

// Detectar Enter en el input existente
input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        //si el input no esta vacio
        if(input.value.trim() !== "") {
            let nuevoElementoLista = document.createElement("li");
            nuevoElementoLista.textContent = input.value + " (agregado con Enter)";
            lista.appendChild(nuevoElementoLista);
            input.value = "";
        }
    }
});

console.log("Agregado evento keydown para detectar Enter en el input");

// Crear select con opciones
let select = document.createElement("select");
select.id = "miSelect";
select.classList.add("selectClase");
document.body.appendChild(select);
let option1 = document.createElement("option");
option1.value = "opcion1";
option1.textContent = "Opción 1";
select.appendChild(option1);
let option2 = document.createElement("option");
option2.value = "opcion2";
option2.textContent = "Opción 2";
select.appendChild(option2);


select.addEventListener("change", () => {
    let parrafo = document.createElement("p");
    parrafo.textContent = "Seleccionaste: " + select.value;
    document.body.appendChild(parrafo);
});

console.log("Diferencia entre input, change y keydown.");
console.log("input: Se activa cada vez que el valor de un input cambia (mientras se escribe).");
console.log("change: Se activa cuando el valor de un input o select cambia y pierde el foco.");
console.log("keydown: Se activa cuando se presiona una tecla, antes de que el carácter aparezca en el input.");