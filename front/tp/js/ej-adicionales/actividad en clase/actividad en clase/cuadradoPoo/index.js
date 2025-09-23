class Cuadrado {
  constructor(color, ancho, alto, x, y, contenedor) {
    this.color = color;
    this.ancho = ancho;
    this.alto = alto;
    this.x = x;
    this.y = y;
    this.contenedor = contenedor;

    this.elemento = document.createElement("div"); // es un div
    this.elemento.classList.add("cuadrado");
    this.elemento.style.backgroundColor = this.color;
    this.elemento.style.width = this.ancho + "px";
    this.elemento.style.height = this.alto + "px";

    this.dibujar();

    this.elemento.addEventListener("click", () => {
      //   console.log("Cuadrado static", Cuadrado.activo);
      //   console.log("Cuadrado objeto", this);
      if (Cuadrado.activo === this) {
        Cuadrado.setActivo(null);
      } else {
        Cuadrado.setActivo(this);
      }
    });

    this.contenedor.appendChild(this.elemento); //asigna nuevo cuadrado al padre
  }

  dibujar() {
    this.elemento.style.left = this.x + "px";
    this.elemento.style.top = this.y + "px";
  }

  moverArriba() {
    if (this.y > 0) {
      this.y -= 10;
      this.dibujar();
    }
  }

  moverAbajo() {
    //innerHeight => la distancia entre el elemento y el borde superior
    const limite = this.contenedor.clientHeight - this.alto;
    if (this.y < limite - 4) {
      this.y += 10;
      this.dibujar();
    }
  }

  moverIzquierda() {
    if (this.x > 0) {
      this.x -= 10;
      this.dibujar();
    }
  }

  moverDerecha() {
    //innerWith => la distancia entre el elemento y el borde izquierdo
    const limite = this.contenedor.clientWidth - this.ancho;
    if (this.x < limite-4) {
      this.x += 10;
      this.dibujar();
    }
  }

  static setActivo(cuadrado) {
    if (Cuadrado.activo) {
      Cuadrado.activo.elemento.classList.remove("activo");
    }
    Cuadrado.activo = cuadrado;
    Cuadrado.activo.elemento.classList.add("activo");
  }
}

const $contenedor = document.getElementById("contenedor");

const cuadrado1 = new Cuadrado("red", 60, 60, 120, 50, $contenedor);

const cuadrado2 = new Cuadrado("green", 60, 60, 20, 20, $contenedor);

const cuadrado3 = new Cuadrado("blue", 60, 100, 120, 120, $contenedor);
const cuadrado4 = new Cuadrado("grey", 60, 20, 0, 0, $contenedor);

document.addEventListener("keydown", (e) => {
  switch (e.key) {
    case "ArrowUp":
      Cuadrado.activo.moverArriba();
      break;
    case "ArrowDown":
      Cuadrado.activo.moverAbajo();
      break;
    case "ArrowLeft":
     Cuadrado.activo.moverIzquierda();
      break;
    case "ArrowRight":
     Cuadrado.activo.moverDerecha();
      break;

    default:
      console.log("apretaste otra tecla");
      break;
  }
});
