public class Producto {
//roducto(nombre, categoria, precio, stock):
    private String nombre;
    private Double precio;
    private String categoria;
    private int stock;
    public Producto(String nombre,String categoria, Double precio, int stock) {
        this.nombre = nombre;
        this.precio = precio;
        this.stock = stock;
        this.categoria = categoria;
    }
    public String getNombre() {
        return nombre;
    }
    public Double getPrecio() {
        return precio;
    }
    public int getStock() {
        return stock;
    }
    public String getCategoria() {
        return categoria;
    }
}
