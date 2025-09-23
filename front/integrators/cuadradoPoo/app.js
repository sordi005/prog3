class Cuadrado {

    constructor(color,ancho,alto,x,y,contenedor){
        
        this.color = color;
        this.ancho = ancho;
        this.alto = alto;
        this.x = x;
        this.y = y;
        this.contenedor = contenedor;
        this.elemento = document.createElement("div");
        this.elemento.classList.add("cuadrado");
        this.elemento.style.backgroundColor = this.color;
        this.elemento.style.width = this.ancho + "px";
        this.elemento.style.height = this.alto + "px";
        this.dibujar();
        
        this.elemento.addEventListener("click",()=>{
            console.log("cuadrado static",Cuadrado.activo);
            console.log("this",this);
            if(Cuadrado.activo === this){
                Cuadrado.setActivo(null);
            }else{
                Cuadrado.setActivo(this);
            }
        });

        this.contenedor.appendChild(this.elemento);
    }
    dibujar (){
        this.elemento.style.left = this.x + "px";
        this.elemento.style.top = this.y + "px";
    }
    moverArriba(){
        if (this.y > 0) {
            this.y -= 10;
            this.dibujar();
        }
    }
    moverAbajo(){
        //innerHeight : la distancia entre la parte superior e inferior de la ventana gráfica
        const limite = this.contenedor.clientHeight - this.alto;
        if (this.y < limite - 4) {
            this.y += 10;
            this.dibujar();
        }
    }
    moverIzquierda(){
        if (this.x > 0) {
            this.x -= 10;
            this.dibujar();
        }
    }
    moverDerecha(){
        //innerWidth : la distancia entre la parte izquierda y derecha de la ventana gráfica
        const limite = this.contenedor.clientWidth - this.ancho;
        if (this.x < limite) {
            this.x += 10;
            this.dibujar();
        }
    }

    static setActivo(cuadrado){
    if (Cuadrado.activo){
        Cuadrado.activo.elemento.classList.remove("activo");
    }
        Cuadrado.activo = cuadrado;
        Cuadrado.activo.elemento.classList.add("activo");
    }
}
const $contenedor = document.getElementById("contenedor");

const cuadrado1 = new Cuadrado("red",60,60,50,50,$contenedor);
const cuadrado2 = new Cuadrado("green",60,60,100,100,$contenedor);
const cuadrado3 = new Cuadrado("blue",60,60,20,20,$contenedor);

document.addEventListener("keydown",(event)=>{
    switch(event.key){
        case "ArrowUp":
            if(Cuadrado.activo){
                Cuadrado.activo.moverArriba();
            }
            break;
        case "ArrowDown":
            console.log("abajo");
            if(Cuadrado.activo){
                Cuadrado.activo.moverAbajo();
            }
            break;
        case "ArrowLeft":
            console.log("izquierda");
            if(Cuadrado.activo){
                Cuadrado.activo.moverIzquierda();
            }
            break;
        case "ArrowRight":
            console.log("derecha");
            if(Cuadrado.activo){
                Cuadrado.activo.moverDerecha();
            }
            break;
    }   
})