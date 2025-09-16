let arr = [1,2,3,4,5];
console.log("Array Original: ", arr);

console.log("Invertir array sin reversr");
let arrInvertido = [];
for(let i = arr.length - 1; i >= 0; i--){
    arrInvertido.push(arr[i]);
}

console.log("Array Invertido: ",arrInvertido);