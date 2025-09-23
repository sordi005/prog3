//seleccionamos elementos del dom

const formulario = document.getElementById("formulario"),
  input = document.getElementById("elemento"),
  lista = document.getElementById("lista");

formulario.addEventListener("submit", function (e) {
  e.preventDefault();
  const valueInput = input.value;

  if (valueInput.trim() === "") {
    alert("tiene que haber un elemento antes de enviar");
    return;
  }

  const nuevoElemento = document.createElement("li");
  nuevoElemento.textContent = valueInput;

  nuevoElemento.addEventListener("click", () => {
    lista.removeChild(nuevoElemento);
  });

  lista.appendChild(nuevoElemento);

  input.value = "";
});
