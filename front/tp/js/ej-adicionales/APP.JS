let arr = [1,2,3,4,5];
console.log("Array Original: ", arr);

console.log("Invertir array sin reversr");
let arrInvertido = [];
for(let i = arr.length - 1; i >= 0; i--){
    arrInvertido.push(arr[i]);
}

console.log("Array Invertido: ",arrInvertido);


console.log("Palidromos");
let palabras = ["Hola", "que", "oso"];
for(let p of palabras){
    if(p === p.split("").reverse().join("")){
        console.log(p, " es palindromo");
    } else {
        console.log(p, " no es palindromo");
    }
}

console.log("Contactar Vocales");
let frase = "Hola que tal estas";
let vocales = "AEIOU";
let count = 0;
for(let v of vocales){
    for(let f of frase){
        if(f.toUpperCase() === v){
            count++;
        }
    }
}
console.log(frase+" tiene "+ count +" vocales.");

console.log("Rotación de Array");
let arr2 = [1,2,3,4,5];
console.log("Array Original: ", arr2);
arr2.unshift(arr2.pop());
console.log("Array Rotado: ", arr2);

console.log("Obtener numeros sin sort");
arr3 = [7,12,4,89,34,1,24,3]
console.log("Array Original: ", arr3);
for(let i = 0; i < arr3.length - 1; i++){
    for(let j = i + 1; j < arr3.length; j++){
        if(arr3[i] > arr3[j]){
            let temp = arr3[i];
            arr3[i] = arr3[j];
            arr3[j] = temp;
        }
    }
}
console.log("Array Ordenado: ", arr3);

console.log("Remplazar palabras");
let texto = "Estoy aprendiendo JAVA";
console.log("Texto Original: ", texto);
texto = texto.replace("JAVA", "JavaScript");
console.log("Texto Modificado: ", texto);

console.log("Eliminar duplicados");
let arr4 = [1,2,3,4,5,1,2,3];


console.log("Intersección de arrays:");
let arrayA = [1, 2, 3, 4];
console.log("Array A:", arrayA);
let arrayB = [3, 4, 5, 6];
console.log("Array B:", arrayB);
let interseccion = [];

for (let i = 0; i < arrayA.length; i++) {
    if (arrayB.indexOf(arrayA[i]) !== -1 && interseccion.indexOf(arrayA[i]) === -1) {
        interseccion.push(arrayA[i]);
    }
}

console.log("Intersección de arrays:", interseccion); 

console.log("contar palabras")
let texto1 = "hola mundo hola javascript";
console.log("Texto: ", texto1);
let palabras1 = texto1.split(" ");
let contador = {};

for (let palabra of palabras1) {
    if (contador[palabra]) {
        contador[palabra]++;
    } else {
        contador[palabra] = 1;
    }
}

for (let palabra in contador) {
    console.log(palabra + ": " + contador[palabra]);
}

console.log("Matriz Transpuesta");
let matriz = [
    [1, 2, 3],
    [4, 5, 6]
];

console.log("Matriz Original:", matriz);

let transpuesta = [];
for (let i = 0; i < matriz[0].length; i++) {
    transpuesta[i] = [];
    for (let j = 0; j < matriz.length; j++) {
        transpuesta[i][j] = matriz[j][i];
    }
}

console.log("Matriz transpuesta:", transpuesta);
