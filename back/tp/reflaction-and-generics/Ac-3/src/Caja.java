
public class Caja<T> {
    private T contenido;
    private Class<T> tipo;

    public Caja(Class<T> tipo) {
        this.tipo = tipo;
    }

    public void guardar(T valor) {
        this.contenido = valor;
    }

    public T obtener() {
        return contenido;
    }

    public Class<T> getTipo() {
        return tipo;
    }
}