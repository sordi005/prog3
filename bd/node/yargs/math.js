export const sumar = (a, b) => a + b;
export const restar = (a, b) => a - b;
export const multiplicar = (a, b) => a * b;
export const dividir = (a, b) => {
  if (b === 0) {
    throw new Error('No se puede dividir por cero');
  }
  return a / b;
};
