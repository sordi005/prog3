let palabras = [];

for (let i = 0; i<5; i++) {
    palabras[i] = prompt("Ingrese una palabra:");
}
console.log(palabras);

console.log("Agregando palabra al inicio:");
palabras.unshift("Racing Club");

console.log("Agregando palabra al final:");
palabras.push("Campeon");

console.log("Eliminando la segunda palabra:");
palabras.splice(1, 1);

console.log(palabras);

console.log("Analizanodo palabras:");
let palabraMasLarga = "";
let palabrasConA = [];
for (let palabra of palabras) {
    if (palabraMasLarga.length < palabra.length) {
        palabraMasLarga = palabra;
    }
    if (palabra.toLowerCase().includes("a")) {
        palabrasConA.push(palabra);
    }
    console.log(`Palabra: ${palabra}, Longitud: ${palabra.length}`);
}
console.log(`Palabra más larga: ${palabraMasLarga}`);
console.log(`Palabras que contienen la letra 'a': ${palabrasConA}`);

console.log("Juego de Palabras Invertidas:");
let palabrasInvertidas = [];
for (let palabra of palabras) {
    arrayChars = palabra.split("");
    arrayChars.reverse();
    palabrasInvertidas.push(arrayChars.join(""));
}
alert(`Palabras Invertidas: ${palabrasInvertidas}`);


console.log("Palíndromo:");
if (confirm("¿Desea verificar si alguna palabra es un palíndromo?")) {
    for (let palabra of palabras) {
        let palabraInvertida = palabra.split("").reverse().join("");
        if (palabra.toLowerCase() === palabraInvertida.toLowerCase()) {
            alert(`La palabra "${palabra}" es un palíndromo.`);
        }
    }
}

console.log("Palabras con mas de 4 chars:");
for (let palabra of palabras) {
    if (palabra.length > 4) {
        console.log(palabra);
    }
}


console.log(palabras.join("-"));