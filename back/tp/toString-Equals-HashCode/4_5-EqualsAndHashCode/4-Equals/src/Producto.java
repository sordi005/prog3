import java.util.Objects;

public class Producto {
    private String codigo;
    private String nombre;
    private double precio;

    public Producto(String codigo, String nombre, double precio) {
        this.codigo = codigo;
        this.nombre = nombre;
        this.precio = precio;
    }

    public String getCodigo() {
        return codigo;
    }

    public String getNombre() {
        return nombre;
    }

    public double getPrecio() {
        return precio;
    }

    public void setCodigo(String codigo) {
        this.codigo = codigo;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public void setPrecio(double precio) {
        this.precio = precio;
    }


    @Override
    public boolean equals(Object obj) {
        // Verificar si es la misma referencia
        if (this == obj) {
            return true;
        }

        // Verificar si el objeto es null o de diferente clase
        if (obj == null || getClass() != obj.getClass()) {
            return false;
        }

        Producto producto = (Producto) obj;
        return Objects.equals(codigo, producto.codigo);
    }


    @Override
    public String toString() {
        return String.format("Producto{codigo='%s', nombre='%s', precio=%.2f}",
                           codigo, nombre, precio);
    }
}
